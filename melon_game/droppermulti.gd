extends Node2D
class_name DropperMulti

const prefab : PackedScene = preload("res://fruit.tscn")
const bomb_prefab : PackedScene = preload("res://bomb.tscn")

@onready var cursor : Node2D = $fruit_cursor
var future_fruit : MeshInstance2D
var target_x := 0.0
var cursor_y : float
var drop_queued := false
var level := 1
var future_level := 1
const original_size := Vector2(10,10)
var is_game_over : bool = false
var bomb_count := 3
const border_const := 199.9
var fruit_rng := RandomNumberGenerator.new()

var player_box_position = get_parent().global_position

func _ready():
	fruit_rng.set_seed(7)
	future_fruit = cursor.duplicate()
	add_child(future_fruit)
	move_child(future_fruit, 0)
	future_fruit.name = "FUTURE"
	future_fruit.global_position = Vector2(-208, -280)
	cursor_y = cursor.position.y
	cursor.global_position = future_fruit.global_position
	
	# Connect to the server signal that broadcasts player 2's position
	var receiveCall = Callable(self, "_on_message_received")
	Connection.connect("message_received", receiveCall)
	
	# Start listening to server updates
	set_process(true)

# This function gets triggered when a server event is received for player 2's movement or actions
func _on_message_received(message: String):
	var json = JSON.new()
	var data = {}
	var parse_error = json.parse(message)

	if parse_error != OK:
		print("Failed to parse JSON: %s" % json.get_error_message())
		return

	data = json.get_data()

	match data.get("action", ""):
		"recieveGameData":
			var args = data.get("args", {})

			var received_x = args.get("x", 0.0)
			var received_y = args.get("y", 0.0)

			# Get Player 2's node and dropper
			var player_2 = get_parent()  # Ensure correct path
			var dropper_2 = player_2.get_node("dropper")

			# Convert the global position to Player 2's local space
			var global_pos = Vector2(received_x, received_y)
			var local_pos_for_player_2 = player_2.to_local(global_pos)

			# Set dropper position
			dropper_2.position = local_pos_for_player_2
			future_fruit.global_position = local_pos_for_player_2
			cursor.global_position = local_pos_for_player_2

			# Handle other properties (e.g., scale, modulate)
			dropper_2.scale = Vector2(14.2, 14.2)
			dropper_2.modulate = Color(0.9725, 0, 0.2471, 1)

			# Handle fruit/bomb dropping logic
			if args.get("type", "") == "fruit":
				drop_fruit()
			elif args.get("type", "") == "bomb" and bomb_count > 0:
				drop_bomb()


# This method handles fruit drop logic
func drop_fruit():
	if is_game_over:
		return
	
	var fruit = prefab.instantiate()
	fruit.level = level
	
	var player2_node = get_parent()
	player2_node.add_child(fruit)
	
	fruit.global_position = Vector2(cursor.global_position.x, cursor.global_position.y)
	
	var border_dist := border_const - Fruit.get_target_scale(level) * original_size.x
	
	fruit.global_position.x = clamp(fruit.global_position.x, -border_dist, border_dist)
	fruit.linear_velocity.y = 400.0
	fruit.linear_velocity.x = 0
	fruit.angular_velocity = fruit_rng.randf() * 0.2 - 0.1
	
	level = future_level
	future_level = int(clamp(abs(fruit_rng.randfn(0.5, 2.3)) + 1, 1, 5))

	cursor.global_position = future_fruit.global_position
	cursor.scale = original_size * Fruit.get_target_scale(level)
	cursor.modulate = Fruit.get_color(level)

# This method handles bomb drop logic
func drop_bomb():
	if bomb_count <= 0:
		return

	bomb_count -= 1
	var bomb = bomb_prefab.instantiate()
	$"..".add_child(bomb)
	bomb.global_position.y = cursor.global_position.y
	var border_dist := border_const - Bomb.get_target_scale() * original_size.x
	bomb.global_position.x = clamp(target_x, -border_dist, border_dist)
	bomb.linear_velocity.y = 400.0
	bomb.linear_velocity.x = 0
	bomb.angular_velocity = fruit_rng.randf() * 0.2 - 0.1
