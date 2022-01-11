const net = require('net');
const { processInput, validateNumber, validateString } = require('./shared/input');

const USAGE = 'node publisher <pub port> <\'message\'>';
const LOCALHOST = '127.0.0.1';

const publishMessage = (pubPort, msg) => {
    //connect and send message to server
    const client = new net.Socket();
    client.connect(pubPort, LOCALHOST, () => client.write(msg));
    //close out after send
    client.on('data', () => process.exit());
};

const run = () => {
    //get pubPort and msg from command line args
    const pubPort = processInput(process.argv[2], validateNumber, USAGE);
    const msg = processInput(process.argv[3], validateString, USAGE);

    publishMessage(pubPort, msg);
};

run();
