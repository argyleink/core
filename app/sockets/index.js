module.exports = function (app) {

  const io = require('socket.io')(app.config.socket.port);

  io.on('connection', function(socket){
    console.log('YAY! SOCKETS ARE WORKING!!!');
  });

};
