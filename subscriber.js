// client
const net = require('net');

const port = process.argv[2];

//set up subscriber
const subscriberSocket = net.createServer((socket) => {
    socket.on('data', (data) => {
        const publishedMessage = data.toString();
        console.log('subscriber received message: ' + publishedMessage);
        socket.pipe(socket);
    })
});
//subscribers send to this port to sign up for messages
subscriberSocket.listen(port, '127.0.0.1');
console.log('subscriber listening on ' + port);


//subscribe the port we're listening on
const client = new net.Socket();
client.connect(4000, '127.0.0.1', function() {
	client.write(port);
});
client.on('data', function(data) {
	//console.log('Received: ' + data);
    //console.log('Subscri');
	//client.destroy(); // kill client after server's response
});

/*client.on('close', function() {
	console.log('Connection closed');
});*/