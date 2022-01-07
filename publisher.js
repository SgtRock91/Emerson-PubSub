const net = require('net');

const client = new net.Socket();
client.connect(4001, '127.0.0.1', function() {
	client.write('All your base are belong to us');
});