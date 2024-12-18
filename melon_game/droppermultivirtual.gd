extends Node2D
class_name DropperMultiVirtual

const prefab: PackedScene = preload("res://fruit.tscn")
const bomb_prefab: PackedScene = preload("res://bomb.tscn")
const original_size := Vector2(10, 10)
const border_const := 199.9

# Container boundaries from scene
const P1_LEFT_WALL := -563.0
const P1_RIGHT_WALL := -123.0
const P2_LEFT_WALL := 133.0
const P2_RIGHT_WALL := 573.0

# Container widths
const P1_WIDTH := P1_RIGHT_WALL - P1_LEFT_WALL
const P2_WIDTH := P2_RIGHT_WALL - P2_LEFT_WALL

@onready var cursor: Node2D = $fruit_cursor
var future_fruit: MeshInstance2D
var level := 1
var future_level := 1
var is_game_over := false
var bomb_count := 3
var fruit_rng := RandomNumberGenerator.new()

var current_drop_position := Vector2.ZERO
var should_drop := false
var drop_type := ""

const INITIAL_Y_POS := -271.0
const DROP_Y_POS := -100.0
var dropper_offset = 0

func _ready():
	fruit_rng.set_seed(7)
	
	future_fruit = cursor.duplicate()
	add_child(future_fruit)
	move_child(future_fruit, 0)
	future_fruit.name = "FUTURE"
	future_fruit.global_position = Vector2(-600, 1000)
	
	cursor.global_position = Vector2(0, INITIAL_Y_POS)

	var player1_dropper = get_node("/root/MultiplayerWorld/Player 1/dropper")
	var player2_dropper = get_node("/root/MultiplayerWorld/Player 2/dropper")
	
	dropper_offset = player2_dropper.global_position - player1_dropper.global_position
	
	Connection.message_received.connect(_on_message_received)

func convert_to_p1_space(pos_x: float) -> float:
	# Linear mapping from P2 container space to P1 container space
	var p2_normalized = (pos_x - P2_LEFT_WALL) / P2_WIDTH  # 0 to 1 in P2 space
	return P1_LEFT_WALL + (p2_normalized * P1_WIDTH)  # Mapped to P1 space

func convert_to_p2_space(pos_x: float) -> float:
	# Linear mapping from P1 container space to P2 container space
	var p1_normalized = (pos_x - P1_LEFT_WALL) / P1_WIDTH  # 0 to 1 in P1 space
	return P2_LEFT_WALL + (p1_normalized * P2_WIDTH)  # Mapped to P2 space

func _physics_process(_delta: float):
	if is_game_over:
		return

	cursor.global_position = current_drop_position
	cursor.modulate = Fruit.get_color(level)
	cursor.scale = original_size * Fruit.get_target_scale(level)
	
	future_fruit.scale = original_size * Fruit.get_target_scale(future_level)
	future_fruit.modulate = Fruit.get_color(future_level)
	
	if should_drop:
		should_drop = false
		match drop_type:
			"fruit":
				drop_fruit()
			"bomb":
				if bomb_count > 0:
					drop_bomb()

func _on_message_received(message: String):
	var json = JSON.new()
	var parse_error = json.parse(message)
	
	if parse_error != OK:
		print("Failed to parse JSON: %s" % json.get_error_message())
		return
	
	var data = json.get_data()
	if data == null:
		return
		
	if data.get("action", "") == "recieveGameData":
		var args = data.get("args", {})
		if args == null:
			return
		
		var received_x = float(args.get("x", 0.0))
		var received_y = float(args.get("y", DROP_Y_POS))

		var player2_drop_position = Vector2(received_x, received_y) + dropper_offset

		current_drop_position = player2_drop_position
		drop_type = args.get("type", "")
		should_drop = true

func drop_fruit():
	if is_game_over:
		return
	
	var fruit = prefab.instantiate()
	fruit.level = level
	get_parent().add_child(fruit)
	fruit.global_position = current_drop_position
	print("Network drop at: ", current_drop_position)
	
	level = future_level
	future_level = int(clamp(abs(fruit_rng.randfn(0.5, 2.3)) + 1, 1, 5))
	
	cursor.scale = original_size * Fruit.get_target_scale(level)
	cursor.modulate = Fruit.get_color(level)

func drop_bomb():
	if is_game_over or bomb_count <= 0:
		return
	
	bomb_count -= 1
	var bomb = bomb_prefab.instantiate()
	get_parent().add_child(bomb)
	
	var border_dist := border_const - Bomb.get_target_scale() * original_size.x
	var drop_x = clamp(current_drop_position.x, -border_dist, border_dist)
	bomb.global_position = Vector2(drop_x, DROP_Y_POS)
	
	bomb.linear_velocity = Vector2(0, 400.0)
	bomb.angular_velocity = fruit_rng.randf() * 0.2 - 0.1
	print("Network bomb drop at: ", drop_x)
