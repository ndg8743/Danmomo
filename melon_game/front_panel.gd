extends TextureRect

var dropping := false
@export var drop_speed : float = 1000.0

func _ready():
	SignalBus.walls_dropped.connect(_on_wall_drop)
	
func _physics_process(delta):
	if !dropping: return
	position.y += drop_speed * delta

func _on_wall_drop():
	dropping = true
