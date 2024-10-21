extends RigidBody2D
class_name Bomb

@onready var mesh := $MeshInstance2D
@onready var collider := $CollisionShape2D
@onready var explosion_radius_area := $ExplosionRadius
@onready var explosion_radius_collision := $ExplosionRadius/CollisionShape2D

@onready var explosion_effect := $Explosion

var bomb_count := 3
@export var explosion_radius := 40.0

var popped := false

const baked_colors := [
	Color(0, 0, 0, 1)
]

func get_color():
	return baked_colors[0]

static func get_target_scale() -> float:
	return 2.0

func _ready():
	contact_monitor = true
	set_max_contacts_reported(50)
	
	mesh.modulate = baked_colors[0]
	var target_scale := get_target_scale()
	mass = target_scale
	_scale_2d(target_scale * Vector2(1,1))
	update_bomb_count_display()
	
	explosion_radius_collision.shape.radius = explosion_radius

#func _process(delta: float):
	#var t := 1.0 - pow(0.0001, delta)
	#mesh.modulate = lerp(mesh.modulate, get_color(), t)

func _physics_process(delta: float):
	if is_queued_for_deletion():
		return
		
	if popped:
		return
	elif len(get_colliding_bodies()) > 0:
		pop()

	var t := 1.0 - pow(0.0001, delta)
	mass = lerp(mass, get_target_scale(), t)

func _scale_2d(target_scale: Vector2):
	if target_scale.x == 1:
		return
	for child in get_children():
		if child is Node2D:
			child.scale *= target_scale
			child.transform.origin *= target_scale

func pop():
	#Stop bomb from moving
	freeze = true
	
	explosion_effect.emitting = true
	SignalBus.bomb_exploded.emit()
	
	$MeshInstance2D.queue_free()
	
	if bomb_count <= 0:
		return

	popped = true
	bomb_count -= 1

	var audio : Audio = $"../audio"
	var sample := audio.pop_v3
	var pitch := 1.0
	var volume := 0.0
	#pitch = 1.0 + (5 - level) * 0.1
	#volume = (level - 8) * 1.0
	audio.play_audio(sample, pitch - randf() * 0.01, volume - randf() * 2 - 5)

	# Destroy other balls within the explosion radius
	explosion_radius_area.monitoring = true

func update_bomb_count_display():
	SignalBus.bomb_dropped.emit()
	pass


func _on_explosion_radius_body_entered(body):
	if body is Fruit:
		SignalBus.fruit_destroyed.emit(body)
	pass # Replace with function body.


func _on_explosion_finished():
	queue_free()
	pass
