const net = require('net');
const { processInput, validateNumber } = require('./shared/input');

const LOCALHOST = '127.0.0.1';
const USAGE = 'node server <subscribe port> <publish port>';

//current subscribers to send a published message to
let subscribers = [];

const initSubscribe = (subPort) => {
    //create subscribe port for subs to hook into
    const subscribeSocket = net.createServer((socket) => {
        socket.on('data', (data) => {
            //get port from data
            const subscriberPort = data.toString();
            console.log('subscriber port received: ' + subscriberPort);

            //add subscriber
            subscribers = subscribers.concat(subscriberPort);

            //let sender know we got the their message so they can close out
            socket.write('subscribed');
            socket.pipe(socket);
        });
    });

    //subscribers send to this port to sign up for published messages
    subscribeSocket.listen(subPort, LOCALHOST);
    console.log('subscribe listener on ' + subPort);
};

const initPublish = (pubPort) => {
    //create publish port for messages to come in
    const publishSocket = net.createServer((socket) => {
        socket.on('data', (data) => {
            //get message from data
            const message = data.toString();
            console.log('publishing message: ' + message);

            subscribers.forEach((subscriber) => {
                const client = new net.Socket();
                client.connect(subscriber, LOCALHOST, () => {
                    client.write(message);
                    client.destroy();
                });
            })

            //let sender know we got the their message so they can close out
            socket.write('message sent');
            socket.pipe(socket);
        });
    });

    //subscribers send to this port to sign up for messages
    publishSocket.listen(pubPort, LOCALHOST);
    console.log('publish listener on ' + pubPort);
};

const run = () => {
    const subPort = processInput(process.argv[2], validateNumber, USAGE);
    const pubPort = processInput(process.argv[3], validateNumber, USAGE);

    initSubscribe(subPort);
    initPublish(pubPort);
}

run();

//TODO:
//1) consider dupes
//2) try/catch error handling
//3) unit tests
//4) consider pulling out handling sub and pub handlers