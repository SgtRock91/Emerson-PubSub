const net = require('net');

//current subscribers to send a published message to
let subscribers = [];



//create subscribe port
const subscribeSocket = net.createServer((socket) => {
    socket.on('data', (data) => {
        //get port
        const subscriptPort = data.toString();
        console.log('subscriber port received: ' + subscriptPort);

        //add subscriber
        subscribers = subscribers.concat(subscriptPort)

        //let sender know we got the their message
        //socket.write('port received ' + subscriptPort);
        socket.pipe(socket);
    })
});
//subscribers send to this port to sign up for messages
subscribeSocket.listen(4000, '127.0.0.1');
console.log('subscribe listener on 4000');



//create publish port
const publishSocket = net.createServer((socket) => {
    socket.on('data', (data) => {
        //get message
        const message = data.toString();
        console.log('publishing message: ' + message);

        subscribers.forEach((subscriber) => {
            const client = new net.Socket();
            client.connect(subscriber, '127.0.0.1', () => {
                client.write(message);
                client.destroy();
            });
        })

        //let sender know we got the their message
        socket.write('messae received and sent to subscribers');
        socket.pipe(socket);
    })
});
//subscribers send to this port to sign up for messages
publishSocket.listen(4001, '127.0.0.1');
console.log('publish listener on 4001');
