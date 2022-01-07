// invoke example
// node server <subscribe port> <publish port>
const net = require('net');

const subPort = process.argv[2];
const pubPort = process.argv[3];

//current subscribers to send a published message to
let subscribers = [];

//create subscribe port for subs to hook into
const subscribeSocket = net.createServer((socket) => {
    socket.on('data', (data) => {
        //get port from data
        const subscriberPort = data.toString();
        console.log('subscriber port received: ' + subscriberPort);

        //add subscriber
        subscribers = subscribers.concat(subscriberPort)

        //let sender know we got the their message so they can close out
        socket.write('subscribed');
        socket.pipe(socket);
    })
});
//subscribers send to this port to sign up for published messages
subscribeSocket.listen(subPort, '127.0.0.1');
console.log('subscribe listener on ' + subPort);


//create publish port
const publishSocket = net.createServer((socket) => {
    socket.on('data', (data) => {
        //get message from data
        const message = data.toString();
        console.log('publishing message: ' + message);

        subscribers.forEach((subscriber) => {
            const client = new net.Socket();
            client.connect(subscriber, '127.0.0.1', () => {
                client.write(message);
                client.destroy();
            });
        })

        //let sender know we got the their message so they can close out
        socket.write('message sent');
        socket.pipe(socket);
    })
});
//subscribers send to this port to sign up for messages
publishSocket.listen(pubPort, '127.0.0.1');
console.log('publish listener on ' + pubPort);
