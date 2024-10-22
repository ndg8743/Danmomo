extends Node

const MULTIPLAYER_SCENE := preload("res://multiplayer_world.tscn")

var peer := ENetMultiplayerPeer.new()

func _ready():
	multiplayer.peer_connected.connect(_on_peer_connected)
	multiplayer.peer_disconnected.connect(_on_peer_disconnected)
	multiplayer.connected_to_server.connect(_on_connected_to_server)
	multiplayer.connection_failed.connect(_on_connection_failed)
	multiplayer.server_disconnected.connect(_on_server_disconnected)


func join_server(ip_address: String, port: int):
	var error = peer.create_client(ip_address, port)
	if not error == OK: return error

	multiplayer.set_multiplayer_peer(peer)


func start_server(server_port: int, max_clients: int):
	var error = peer.create_server(server_port, max_clients)
	if not error == OK: return error

	multiplayer.set_multiplayer_peer(peer)
	instance_world()


func _on_peer_connected(id: int) -> void: pass


func _on_peer_disconnected(id: int) -> void: pass


func _on_connected_to_server() -> void:
	instance_world()

func _on_connection_failed():
	multiplayer.set_multiplayer_peer(null)


func _on_server_disconnected():
	multiplayer.set_multiplayer_peer(null)

func instance_world() -> void:
	if not MULTIPLAYER_SCENE.can_instantiate(): return
	
	get_tree().root.add_child(MULTIPLAYER_SCENE.instantiate())
