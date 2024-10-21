extends RigidBody2D
class_name Wall

@onready var Sprite: Sprite2D = $Sprite2D
@export var direction: Vector2 = Vector2.LEFT

var bomb_counter = 0

func _ready():
	SignalBus.bomb_exploded.connect(_handle_explosion)
	
func _handle_explosion():
	bomb_counter += 1
	Sprite.region_rect.position = Vector2(32*bomb_counter,0)
	if bomb_counter > 2:
		freeze = false
		#Push walls
		apply_impulse(Vector2(direction.x * 400,-100),Vector2(50,50))
		SignalBus.walls_dropped.emit()
		return
