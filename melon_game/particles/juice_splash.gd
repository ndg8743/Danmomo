extends CPUParticles2D

var fruit_level: int = 1

func _ready():
	scale_amount_min = fruit_level * 3
	scale_amount_max = fruit_level * 4
	emission_sphere_radius = fruit_level * 5
	emitting = true

func _on_finished():
	queue_free()
