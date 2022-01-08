const net = require('net');
const processInput = require('./shared/input').processInput;

const USAGE = `node publisher <pub port> <'message'>`;
const LOCALHOST = '127.0.0.1';

//basically determining if its a number. Doesnt work perfect, edge cases include 400j1g. Use regex or something. Put in validate file?
const validatePubPort = (input) => (!isNaN(parseInt(input, 10)));
const validateMsg = (input) => (typeof input === 'string');

const publishMessage = () => {
    //get pubPort and msg from command line args
    const pubPort = processInput(process.argv[2], validatePubPort, USAGE);
    const msg = processInput(process.argv[3], validateMsg, USAGE);

    //connect and send message to server
    const client = new net.Socket();
    client.connect(pubPort, LOCALHOST, () => client.write(msg));
    //close out after send
    client.on('data', () => process.exit());
}


publishMessage();