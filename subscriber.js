// invoke example
// node subscriber <server sub signup port> <this sub port>
const net = require('net');

const serverPort = process.argv[2];
const subPort = process.argv[3];

//set up subscriber
const subscriberSocket = net.createServer((socket) => {
    socket.on('data', (data) => {
        const publishedMessage = data.toString();
        console.log('Message received: ' + publishedMessage);
        socket.pipe(socket);
    })
});
//subscribers send to this port to sign up for messages
subscriberSocket.listen(subPort, '127.0.0.1');
console.log('subscriber listening on ' + subPort);


//subscribe the port we're listening on
const client = new net.Socket();
client.connect(serverPort, '127.0.0.1', function() {
	client.write(subPort);
});
client.on('data', ()=> {
	client.destroy(); 
});
