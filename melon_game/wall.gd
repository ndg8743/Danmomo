extends RigidBody2D
class_name Wall

@onready var Sprite: Sprite2D = $Sprite2D
@export var direction: Vector2 = Vector2.LEFT

var bomb_counter = 0

func _ready():
	SignalBus.bomb_exploded.connect(_handle_explosion)
	
func _handle_explosion():
	bomb_counter += 1
	Sprite.region_rect.position = Vector2(32 * bomb_counter, 0)  # Update texture based on bomb count
	
	if bomb_counter > 2:
		# Instead of pushing walls, hide or remove the object
		_hide_or_remove_wall()
		SignalBus.walls_dropped.emit()  # Notify that walls have dropped
		SignalBus.end_game.emit()  # Emit the signal to end the game

func _hide_or_remove_wall():
	# Option 1: Hide the wall (if you want to keep it in the scene but invisible)
	self.hide()

	# Option 2: Remove the wall from the scene entirely
	# self.queue_free()  # Uncomment this line to fully remove the wall
