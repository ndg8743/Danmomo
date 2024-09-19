extends RigidBody2D
class_name Bomb

@export var level := 1
var current_scale := Vector2(1,1)
var cooldown := 0.1
@onready var mesh := $MeshInstance2D
@onready var collider := $CollisionShape2D
var popped := false
var game_over := false
var free_after_pop := 2.0
var bomb_count := 3
@export var explosion_radius := 100.0

const baked_colors := [
	Color(0, 0, 0, 1)
]

static func get_target_scale(level_: int) -> float:
	return 2.0

static func get_color(level_: int) -> Color:
	return baked_colors[0]

static func get_target_mass(level_: int) -> float:
	return pow(get_target_scale(level_), 2.0)

func _ready():
	contact_monitor = true
	set_max_contacts_reported(50)
	
	mesh.modulate = get_color(level)
	mass = get_target_mass(level)
	var target_scale := Vector2(1,1) * get_target_scale(level)
	var prev_scale = current_scale
	current_scale = target_scale
	_scale_2d(target_scale)
	update_bomb_count_display()

func _process(delta: float):
	var t := 1.0 - pow(0.0001, delta)
	mesh.modulate = lerp(mesh.modulate, get_color(level), t)

func _physics_process(delta: float):
	if is_queued_for_deletion():
		return
		
	if popped:
		if free_after_pop <= delta:
			queue_free()
			return
		else:
			free_after_pop -= delta

	var t := 1.0 - pow(0.0001, delta)
	mass = lerp(mass, get_target_mass(level), t)
	var target_scale := Vector2(1,1) * (get_target_scale(level) if not popped else 0.0)
	var prev_scale = current_scale
	current_scale = lerp(current_scale, target_scale, t)
	_scale_2d(current_scale / prev_scale)

func _scale_2d(target_scale: Vector2):
	if target_scale.x == 1:
		return
	for child in get_children():
		if child is Node2D:
			child.scale *= target_scale
			child.transform.origin *= target_scale

func pop():
	if bomb_count <= 0:
		return

	popped = true
	bomb_count -= 1
	update_bomb_count_display()

	var audio : Audio = $"../audio"
	var sample := audio.pop_v3
	var pitch := 1.0
	var volume := 0.0
	pitch = 1.0 + (5 - level) * 0.1
	volume = (level - 8) * 1.0
	audio.play_audio(sample, pitch - randf() * 0.01, volume - randf() * 2 - 5)

	# Destroy other balls within the explosion radius
	var shape_params = PhysicsShapeQueryParameters2D.new()
	shape_params.shape = collider.shape
	shape_params.transform = global_transform
	shape_params.collision_mask = 1  # Optional, depending on what you're filtering for
	shape_params.exclude = []  # You can put any bodies you want to exclude from the check here

	for body in get_world_2d().direct_space_state.intersect_shape(shape_params, 2048):
		if body.collider.has_method("queue_free"):
			body.collider.queue_free()

func update_bomb_count_display():
	var bomb_count_label : Label = $"/root/ui/bomb_count"
	bomb_count_label.text = str(bomb_count)
	
	var bomb_count_sprites = [
		$"/root/ui/BombCount",
		$"/root/ui/BombCount2",
		$"/root/ui/BombCount3"
	]
	
	for i in range(3):
		bomb_count_sprites[i].visible = i < bomb_count
