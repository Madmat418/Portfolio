Portfolio.Models.ChatServer = Backbone.Model.extend({
  initialize: function() {
    this.socket = socket;
    this.guestNumber = 1;
	this.nicknames = {};
	this.namesUsed = [];
	this.currentRooms = {};
  },
  
  assignGuestName: function(socket, io) {
    var guestName = 'Guest' + this.guestNumber;
	this.guestNumber += 1;
	this.nicknames[socket.id] = guestName
  },
  
  joinRoom: function(socket, io, room) {
    console.log('JOINING ROOM ', room);
	socket.join(room);
	this.currentRooms[socket.id] = room;
	io.sockets.in(room).emit('message', {
	  text: (this.nicknames[socket.id] + ' has joined ' + room + '.'),
	  room: room
	});
  },
  
  handleMessages: function(socket, io) {
    socket.on('message', function (data) {
	  io.sockets.in(data.room).emit('message', {
	    text: (nicknames[socket.id] + ':' + data.text),
		room: data.room
	  })
	})
  },
  
  handleDisconnection: function(socket, io) {
    socket.on('disconnect', function() {
      var nameIndex = namesUsed.indexOf(this.nicknames[socket.id]);
	  delete namesUsed[nameIndex];
	  var leavingRoom = this.currentRooms[socket.id];
	  io.sockets.in(leavingRoom).emit('message', {
	    text: (this.nicknames[socket.id] + ' is leaving' + leavingRoom + '.'),
	    room: leavingRoom
	  })
	  delete this.nicknames[socket.id];
	  delete this.currentRooms[socket.id];
    })
  },
  
  handleNameChangeRequests: function(socket, io) {
    socket.on('nicknameChangeRequest', function(name) {
    if (name.indexOf('Guest') === 0 ) {
	  socket.emit('nicknameChangeResult', {
	    success: false,
		message: 'Names cannot begin with "Guest".'
	  });
	} else if (this.namesUsed.indexOf(name) > -1) {
	  socket.emit('nicknameChangeResult', {
	    success: false,
		message: 'That name is taken.'
      });
    } else {
      var room = this.currentRooms[socket.id];
      var previousName = this.nicknames[socket.id];
      var previousNameIndex = this.namesUsed.indexOf(previousName);
      namesUsed.push(name);
      this.nicknames[socket.io] = name;
      delete this.namesUsed[previousNameIndex];
      io.sockets.in(room).emit('nicknameChangeResult', {
        success: true,
        text: (previousName + ' is now known as ' + name + '.'),
        name: name
      });
      io.sockets.emit('roomList', this.getRoomData(io));
    }	  
  })
  },
  
  handelRoomChangeRequests: function(socket, io) {
    socket.on('roomChangeRequest', function(room) {
	  var oldRoom = this.currentRooms[socket.id];
	  socket.leave(oldRoom);
	  joinRoom(socket, io, room);
	  io.sockets.emit('roomList', this.getRoomData(io));
	})
  },
  
  getRoomData: function(io) {
    var roomHash = io.sockets.manager.rooms;
	var roomData = {};
	_.each(_.keys(roomHash), function(key){
	  var socketIDs = roomHash[key];
	  var usernames = _.map(socketIDs, function(id){
	    return this.nicknames[id];
	  });
	  roomData[key] = usernames;
	});
	return roomData;
  },
  
  socketIOListen: function(server){
    var io = socketio.listen(server);
	
	io.sockets.on('connection', function(socket){
	  console.log('received connection from: ', socket.id);
	  this.assignGuestName(socket, io);
	  this.joinRoom(socket, io, 'lobby');
	  this.handleMessages(socket, io);
	  this.handleNameChangeRequests(socket, io);
	  this.handleRoomChangeRequests(socket, io);
	  this.handleDisconnection(socket, io);
	  io.sockets.emit('roomList', this.getRoomData(io));
	})
  }
})