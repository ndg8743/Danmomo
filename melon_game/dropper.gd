extends Node2D
class_name Dropper

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
const original_size := Vector2(10, 10)
var cooldown := 0.0
const border_const := 199.9

var is_game_over : bool = false
var ending_over : bool = false
var ending_cooldown : float = 0.0

var fruit_rng := RandomNumberGenerator.new()
@onready var screenshot : Sprite2D = $"/root/transition/screenshot"
@onready var screenshot_anim : AnimationPlayer = $"/root/transition"
var screenshot_taken := false
var eat_release := true

var bomb_count := 3
@onready var bomb_count_sprites = [
	$"/root/ui/BombCount",
	$"/root/ui/BombCount2",
	$"/root/ui/BombCount3"
]

func _ready():
	fruit_rng.set_seed(7)
	score.level_start()
	future_fruit = cursor.duplicate()
	add_child(future_fruit)
	move_child(future_fruit, 0)
	future_fruit.name = "FUTURE"
	future_fruit.global_position = Vector2(-208, -280)
	cursor_y = cursor.position.y
	cursor.global_position = future_fruit.global_position

	for sprite in bomb_count_sprites:
		sprite.visible = true  # Ensure they are initially visible

func make_bomb():
	if is_game_over or bomb_count <= 0:
		return
	
	bomb_count -= 1
	
	var bomb = bomb_prefab.instantiate() as Bomb
	if bomb == null:
		print_debug("Error: bomb_prefab failed to instantiate.")
		return
	
	bomb.bomb_count_ui = self
	
	$"..".add_child(bomb)
	bomb.global_position.y = cursor.global_position.y
	var border_dist := border_const - Bomb.get_target_scale(2) * original_size.x
	bomb.global_position.x = clamp(target_x, -border_dist, border_dist)
	bomb.linear_velocity.y = 400.0
	bomb.linear_velocity.x = 0
	bomb.angular_velocity = fruit_rng.randf() * 0.2 - 0.1

	update_bomb_count_display()

func update_bomb_count_display():
	for i in range(3):
		bomb_count_sprites[i].visible = i < bomb_count
