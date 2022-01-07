// invoke example
// node publisher <pub port> <message>
const net = require('net');

const localhost = '127.0.0.1';

const publishMessage = () => {
    const port = process.argv[2];
    const msg = process.argv[3];

    const client = new net.Socket();

    client.connect(port, localhost, () => {
        client.write(msg);
    });

    //close out after send
    client.on('data', () => {
        process.exit();
    });
}


publishMessage();