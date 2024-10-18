extends Node
class_name BombCount

var bomb_count := 3

@onready var bomb_count_sprites = [
	$"../BombCounter/BombCount",
	$"../BombCounter/BombCount2",
	$"../BombCounter/BombCount3" 
]

func _ready():
	update_bomb_count_display()

func update_bomb_count_display():
	for i in range(3):
		bomb_count_sprites[i].visible = i < bomb_count

func set_bomb_count(new_bomb_count: int):
	bomb_count = new_bomb_count
	update_bomb_count_display()
