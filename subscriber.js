// invoke example
// node subscriber <server sub signup port> <this sub port>
const net = require('net');

const localhost = '127.0.0.1';

//set up subscriber
const initSubscriber = (subPort) => {
	const subscriberSocket = net.createServer((socket) => {
		socket.on('data', (data) => {
			const publishedMessage = data.toString();
			console.log('Message received: ' + publishedMessage);
			socket.pipe(socket);
		})
	});
	//subscribers send to this port to sign up for messages
	subscriberSocket.listen(subPort, localhost);
	console.log('subscriber listening on ' + subPort);
};

const subscribeToServer = (serverPort, subPort) => {
	//subscribe the port we're listening on
	const client = new net.Socket();
	client.connect(serverPort, localhost, function() {
		client.write(subPort);
	});
	client.on('data', ()=> {
		client.destroy(); 
	});
}

const run = () => {
	const serverPort = process.argv[2];
	const subPort = process.argv[3];

	initSubscriber(subPort);
	subscribeToServer(serverPort, subPort);
};

run();