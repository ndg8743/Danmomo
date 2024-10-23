extends Node

# The URL we will connect to.
@export var websocket_url = "ws://127.0.0.1:9000/socket"

# Our WebSocketClient instance.
var socket = WebSocketPeer.new()

# Signals for events
signal connected()
signal disconnected()
signal message_received(message)

func _ready():
	# Initiate connection to the given URL.
	var err = socket.connect_to_url(websocket_url)
	if err != OK:
		print("Unable to connect")
		set_process(false)
	else:
		# Wait for the socket to connect.
		await get_tree().create_timer(2).timeout
		emit_signal("connected")

func _process(_delta):
	# Poll the socket for data and state updates.
	socket.poll()

	# Get the current state of the socket.
	var state = socket.get_ready_state()

	# Check the state of the WebSocket connection.
	if state == WebSocketPeer.STATE_OPEN:
		while socket.get_available_packet_count():
			var packet = socket.get_packet()
			print("Got packet: %s" % packet.get_string_from_utf8())
			emit_signal("message_received", packet.get_string_from_utf8())
	
	elif state == WebSocketPeer.STATE_CLOSING:
		pass
	
	elif state == WebSocketPeer.STATE_CLOSED:
		var code = socket.get_close_code()
		print("WebSocket closed with code: %d. Clean: %s" % [code, code != -1])
		emit_signal("disconnected")
		set_process(false)  # Stop processing.

func send_text(data: String):
	if socket.get_ready_state() == WebSocketPeer.STATE_OPEN:
		socket.send_text(data)

func _on_message_received(message: String):
	print("Received in another script: %s" % message)
	# Implement your message handling logic here.
