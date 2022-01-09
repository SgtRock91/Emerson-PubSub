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

            //add subscriber if not on list
            if (!subscribers.some((sub) => sub === subscriberPort)) {
                subscribers = subscribers.concat(subscriberPort);
            }
            
            //let sender know we got the their message so they can close out
            socket.write('subscribed');
            socket.pipe(socket);
        });
    });

    //subscribers send to this port to sign up for published messages
    subscribeSocket.listen(subPort, LOCALHOST);
    console.log('subscribe listener on ' + subPort);
};

const pubMsgToSubs = (msg) => {
    subscribers.forEach((subscriber) => {
        const client = new net.Socket();
        client.connect(subscriber, LOCALHOST, () => {
            client.write(msg);
            client.destroy();
        });
        client.on('error', () => {
            //not ideal editing list while iterating, can tune this further.
            console.log('error sending to ' + subscriber);
            subscribers = subscribers.filter((sub) => sub !== subscriber); // remove failed sub from list
            client.destroy();
        });
    });
}

const initPublish = (pubPort) => {
    //create publish port for messages to come in
    const publishSocket = net.createServer((socket) => {
        socket.on('data', (data) => {
            //get message from data
            const msg = data.toString();
            console.log('publishing message: ' + msg);

            pubMsgToSubs(msg);

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
