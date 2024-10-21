extends Camera2D

var randomStrength: float = 30.0
var shakeFade: float = 5.0

var rng = RandomNumberGenerator.new()

var shakeStrength: float = 0.0

func _ready() -> void:
	SignalBus.bomb_exploded.connect(apply_shake)

func apply_shake():
	shakeStrength = randomStrength
	
func _process(delta: float) -> void:
	if shakeStrength > 0:
		shakeStrength = lerpf(shakeStrength, 0, shakeFade * delta)
		
		offset = randomOffset()

func randomOffset():
	return Vector2(rng.randf_range(-shakeStrength,shakeStrength), rng.randf_range(-shakeStrength,shakeStrength))
