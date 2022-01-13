const net = require('net');
const { processInput, validateNumber } = require('./shared/input');

const LOCALHOST = '127.0.0.1';
const USAGE = 'node subscriber <server sub signup port> <this sub port>';

const initSubscriber = (subPort) => {
	const subscriberSocket = net.createServer((socket) => {
		socket.on('data', (data) => {
			console.log('Message received: ' + data.toString());
			socket.pipe(socket);
		});
	});
	//subscribers send to this port to sign up for messages
	subscriberSocket.listen(subPort, LOCALHOST);
	console.log('subscriber listening on ' + subPort);
};

const subscribeToServer = (serverPort, subPort) => {
	//subscribe the port we're listening on
	const client = new net.Socket();
	client.connect(serverPort, LOCALHOST, () => client.write(subPort));
	client.on('data', (data)=> {
		console.log('Last message was: ' + data.toString());
		client.destroy();
	});
};

const run = () => {
	const serverPort = processInput(process.argv[2], validateNumber, USAGE);
	const subPort = processInput(process.argv[3], validateNumber, USAGE);

	initSubscriber(subPort);
	subscribeToServer(serverPort, subPort);
};

run();

//super weird bug:
//if process is started with npm command then cmd+c, the server wont fail to send to port
//if process is started with node node subscriber <server sub signup port> <this sub port> then cmd+c, the server will fail to sent to port