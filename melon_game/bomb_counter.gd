extends Node2D

var bomb_count = 3

func _ready():
	SignalBus.bomb_dropped.connect(update_bomb_count_display)

func update_bomb_count_display():
	bomb_count -= 1
	var bomb_count_sprites = get_children()
	
	for i in range(3):
		bomb_count_sprites[i].visible = i < bomb_count
