extends Node

func change_scene_to(scene_route: String):
	var root = get_tree().root
	var last_scene = root.get_child(root.get_child_count()-1)
	
	var scene_instance = load(scene_route).instantiate()
	get_tree().root.add_child(scene_instance)
	
	last_scene.queue_free()
