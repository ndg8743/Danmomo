extends Sprite2D
class_name Juice

var dropping = false
var increment: float = 0.0

#Affects how much juice is added depending on the level of the fruit
@export var juice_per_bomb: float = 27

func _ready():
	SignalBus.walls_dropped.connect(_on_wall_drop)
	SignalBus.fruit_destroyed.connect(_on_fruit_destroyed)
	
func _physics_process(delta):
	if scale.y < increment and !dropping:
		scale.y += delta * 20
		position.y = 568 - scale.y * 2
	
	if !dropping: return
	position.y += 500 * delta

func _on_wall_drop():
	dropping = true

func _on_fruit_destroyed(_fruit: Fruit):
	if increment < scale.y:
		increment += juice_per_bomb
	
