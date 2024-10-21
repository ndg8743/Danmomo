extends Area2D

var restart_queued := false

func _input(event):
	if event is InputEventScreenTouch:
		if event.index == 4:
			SignalBus.end_game.emit()

func _process(_delta):
	if restart_queued:
		SignalBus.end_game.emit()
		return

	if Input.is_key_pressed(KEY_R):
		SignalBus.end_game.emit()
		return

	for body in get_overlapping_bodies():
		if body is Fruit:
			SignalBus.end_game.emit()

func _on_body_entered(body):
	if body is Fruit:
		restart_queued = true
