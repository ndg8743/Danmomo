extends Node2D
class_name DropperMultiReal

var leaderboard_scene: PackedScene = preload("res://Leaderboard/leaderboard.tscn")
var game_scene_path: String = "res://multiplayer_world.tscn"

@onready var cursor : Node2D = $fruit_cursor
@onready var score : Score = $"/root/ui/score"

var cursor_y : float
var future_fruit : MeshInstance2D
var target_x := 0.0
var drop_queued := false

var level := 1
var future_level := 1
const prefab : PackedScene = preload("res://fruit.tscn")
const bomb_prefab : PackedScene = preload("res://bomb.tscn")
const original_size := Vector2(10,10)
var cooldown := 0.0
const border_const := 199.9

var is_game_over : bool = false
var ending_over : bool = false
var ending_cooldown : float = 0.0

var fruit_rng := RandomNumberGenerator.new()
@onready var screenshot : Sprite2D = $"/root/transition/screenshot"
@onready var screenshot_anim :AnimationPlayer= $"/root/transition"
var screenshot_taken := false
var eat_release := true

var bomb_count := 3
var dropper_offset = 0 

func _ready():
	fruit_rng.set_seed(7) # Chosen with a fair dice roll (also the sequence starts with two small fruits)
	score.level_start()
	future_fruit = cursor.duplicate()
	add_child(future_fruit)
	move_child(future_fruit, 0)
	future_fruit.name = "FUTURE"
	future_fruit.global_position = Vector2(-600, -300)
	#print_debug(future_fruit)
	cursor_y = cursor.position.y
	#cursor.global_position = future_fruit.global_position

	SignalBus.fruit_destroyed.connect(_on_fruit_destroyed)
	SignalBus.end_game.connect(game_over)

func maybe_restart():
	if is_game_over and ending_over:
		set_process_input(false)
		var leaderboard: Leaderboard = leaderboard_scene.instantiate()
		get_parent().add_child(leaderboard)
		leaderboard.add_score("Player",score.score)
		#get_tree().reload_current_scene()

func make_fruit():
	if is_game_over:
		print("would skip but debugg")
	
	score.end_combo()
	var fruit = prefab.instantiate()
	fruit.level = level
	$"..".add_child(fruit)

	fruit.global_position = Vector2(cursor.global_position.x, cursor.global_position.y)
	var border_dist := border_const - Fruit.get_target_scale(level) * original_size.x
	#fruit.global_position.x = clamp(fruit.global_position.x, -border_dist, border_dist)
	fruit.linear_velocity.y = 400.0
	fruit.linear_velocity.x = 0
	fruit.angular_velocity = fruit_rng.randf() * 0.2 - 0.1
	level = future_level
	future_level = int(clamp(abs(fruit_rng.randfn(0.5, 2.3)) + 1, 1, 5))
	cooldown = min(0.1, level * 0.1)

	# Send data to connection
	var message = {
		"action": "sendGameData",
		"args": {
			"type": "fruit",
			"x": cursor.global_position.x,
			"y": cursor.global_position.y,
			"curlevel": fruit.level,
			"scale": cursor.scale,
			"modulate": cursor.modulate
		}
	}

	Connection.send_text(JSON.stringify(message))

	cursor.global_position = future_fruit.global_position
	cursor.scale = original_size * Fruit.get_target_scale(level)
	cursor.modulate = Fruit.get_color(level)

func make_bomb():
	if is_game_over or bomb_count <= 0:
		return
	
	bomb_count -= 1
	
	var bomb = bomb_prefab.instantiate()
	$"..".add_child(bomb)
	bomb.global_position.y = cursor.global_position.y
	var border_dist := border_const - Bomb.get_target_scale() * original_size.x
	#bomb.global_position.x = clamp(target_x, -border_dist, border_dist)
	bomb.linear_velocity.y = 400.0
	bomb.linear_velocity.x = 0
	bomb.angular_velocity = fruit_rng.randf() * 0.2 - 0.1

	var message = {
		"action": "sendGameData",
		"args": {
			"type": "bomb",
			"x": cursor.global_position.x,
			"y": cursor.global_position.y,
			"scale": cursor.scale,
			"modulate": cursor.modulate
		}
	}

	Connection.send_text(JSON.stringify(message))

func _physics_process(delta: float):
	if is_game_over:
		do_ending(delta)
		
		if ending_over:
			maybe_restart()
			set_physics_process(false)

	cooldown -= delta
	var t : float = 1.0 - pow(0.0001, delta)
	cursor.modulate = lerp(cursor.modulate, Fruit.get_color(level), t)
	var target_scale := original_size * Fruit.get_target_scale(level)
	cursor.scale = lerp(cursor.scale, target_scale, t)
	var border_dist := border_const - cursor.scale.x

	if not drop_queued:
		target_x = clamp(get_local_mouse_position().x, -border_dist, border_dist)

	if not is_game_over:
		var pos_t : float = 1.0 - pow(0.0000001, delta)
		var target_pos := Vector2(target_x, cursor_y)
		cursor.position = lerp(cursor.position, target_pos, pos_t)

	future_fruit.scale = lerp(future_fruit.scale, original_size * Fruit.get_target_scale(future_level), t)
	future_fruit.modulate = lerp(future_fruit.modulate, Fruit.get_color(future_level), t)
	#print_debug(str(level) + "<-" + str(future_level) )

	if Input.is_key_pressed(KEY_I) and cooldown < 0.13:
		drop_queued = true
		maybe_restart()
		
	if drop_queued and abs(target_x - cursor.position.x) < 10:
		make_fruit()
		drop_queued = false

func _input(event):
	if event is InputEventMouseButton:
		if event.button_index == MOUSE_BUTTON_LEFT:  # Left-click for fruit
			if not event.is_pressed() and not eat_release:
				if cooldown <= 0:
					drop_queued = true
			else:
				eat_release = false
			maybe_restart()
		elif event.button_index == MOUSE_BUTTON_RIGHT and bomb_count > 0:  # Right-click for bomb
			if event.is_pressed():  # Trigger bomb drop on right-click press
				make_bomb()

	elif event is InputEventKey:
		if event.physical_keycode == KEY_ESCAPE and OS.has_feature("editor"):
			get_tree().quit()
		elif event.physical_keycode == KEY_B and bomb_count > 0:  # Handle bombs using the B key too
			make_bomb()

func game_over():
	if is_game_over:
		return
	is_game_over = true
	ending_over = false
	ending_cooldown = 0.5
	score.game_over()

	var parent : Node2D = $".."
	for c in parent.get_children():
		if c is Fruit:
			c.game_over = true

func take_screenshot():
	screenshot_taken = true
	var data :Image = get_viewport().get_texture().get_image()
	if data.get_size().x > data.get_size().y:
		var w := data.get_size().y
		var h := data.get_size().y
		var offset_x = (data.get_size().x - w) / 2.0
		var data_cropped :Image= Image.new()
		data_cropped.copy_from(data)
		data_cropped.blit_rect(data, Rect2(offset_x, 0, w, h), Vector2.ZERO)
		data_cropped.crop(int(w), int(h))
		data = data_cropped
	elif data.get_size().y > data.get_size().x * 1.3:
		var w := data.get_size().x
		var h := w * 1.3
		var offset_y = (data.get_size().y - h)/2
		var data_cropped :Image= Image.new()
		data_cropped.copy_from(data)
		data_cropped.blit_rect(data, Rect2(0, offset_y, w, h), Vector2.ZERO)
		data_cropped.crop(int(w),int(h))
		data = data_cropped
		
	data.flip_y()
	# data.lock() # TODOConverter3To4, Image no longer requires locking, `false` helps to not break one line if/else, so it can freely be removed
	var border_color := Color(1,1,1,1)
	border_color.r8 = 26 # match the fade color to blend the borders
	border_color.g8 = 26
	border_color.b8 = 26
	for x in range(data.get_size().x):
		data.set_pixel(x, 0, border_color)
		data.set_pixel(x, data.get_size().y - 1, border_color)
	for y in range(data.get_size().y):
		data.set_pixel(0, y, border_color)
		data.set_pixel(data.get_size().x - 1, y, border_color)
	# data.unlock() # TODOConverter3To4, Image no longer requires locking, `false` helps to not break one line if/else, so it can freely be removed
	var img :ImageTexture= ImageTexture.create_from_image(data)
	var aspect := data.get_size().x/(float)(data.get_size().y)
	img.set_size_override(Vector2(aspect, 1) * ProjectSettings.get_setting("display/window/size/viewport_height"))
	screenshot.texture = img

var cooldown_progress := 1.0

func do_ending(delta: float):
	ending_cooldown -= delta
	if ending_cooldown > 0.0 or ending_over:
		return
	ending_cooldown += fruit_rng.randf() * 0.25 * max(0.1, cooldown_progress) + 0.01 * max(0.1, cooldown_progress)
	ending_cooldown = max(ending_cooldown, delta * 0.75)
	cooldown_progress *= 0.97
	var parent : Node2D = $".."
	for c in parent.get_children():
		if c is Fruit and not c.popped:
			c.pop()
			return
	ending_over = true

func level_start():
	$"/root/ui/score".level_start()
	bomb_count = 3

func _on_bomb_count_input(_viewport, event, _shape_idx):
	if event is InputEventMouseButton and event.pressed:
		make_bomb()

func _on_fruit_destroyed(fruit: Fruit):
	$"/root/ui/score".add(fruit.level)
	fruit.explode()
