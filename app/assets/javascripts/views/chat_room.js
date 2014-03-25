Portfolio.Views.ChatApp = Backbone.View.extend({
  template: JST['chat_room'],
  initialize: function() {
    var socketio = require('socket.io');
    this.socket = io.connect();
	var http = require('http');
	this.room = 'lobby';
	this.server = http.createServer(function (request, response) {
	  router(request, response);
	});
	console.log('here');
	this.port = 8080
	this.server.listen(port);
	this.listener = new Portfolio.Models.ChatServer();
	this.listener.socketIOListen(this.server);
	this.socket.on('message', function(message) {
	  $('#chat-messages').append(this.escapeDivText(message.text));
	})
	socket.on('nicknameChangeResult', function(result) {
	  if (result.success){
	    $('#chat-messages').append(this.escapeDivText(result.text))
	  }
	});
	socket.on('roomList', function(roomData){
	  console.log(roomData);
	  this.updateRoomList(roomData);
	});
	$('.send-form').submit(function(e) {
	  e.preventDefault();
	  processInput(chatApp);
	  return false;
	});
  },
  
  escapeDivText: function(text) {
    return $('<div></div>').text(text);
  },
  
  processInput: function(chatApp) {
    var text = $('#send-message').val();
	if (text[0] === '/') {
	  this.listener.processCommand(text.slice(1));
	} else {
	  this.listener.sendMessage(text);
	}
	$('#send-message').val('');
  },
  
  updateRoomList: function(roomData) {
    $('.room-listings').empty();
	$.each(roomData, function(room, userList) {
	  if (room.length > 0) {
	    var roomListing = $('<div></div>').addClass('room-listing');
		roomListing.append($('<h3></h3>').text(room));
		var usersUL = $('<ul></ul>');
		$.each(userList, function(i, username){
		  usersUL.append($('<li></li>').text(username));
		});
		roomListing.append(usersUL);
		$('.room-listings').append(roomListing);
	  }
	});
  },
  
  render: function() {
    var content = this.template;
	this.$el.html(content);
	return this;
  },
  
  sendMessage: function(text) {
    this.socket.emit('message', { text: text, room: this.room});
  },
  
  joinRoom: function(room) {
    this.room = room;
	this.socket.emit('roomChangeRequest', room);
	this.sendMessage('Switched to ' + room);
  },
  
  processCommand: function(command) {
    commandArgs = command.split(' ');
	switch(commandArgs[0]) {
	  case 'nick':
	    var newName = commandArgs[1];
		this.socket.emit('nicknameChangeRequest', newName);
		break;
	  case 'join':
	    var newRoom = commandArgs[1];
		this.joinRoom(newRoom);
		break;
	  default:
	    this.socket.emit('message', { text: 'unrecognized command'});
		break;
	}
  }
})