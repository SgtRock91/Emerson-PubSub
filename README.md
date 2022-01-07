# PubSub

Not to be confused with Publix Subs

### Server
Start the server with
```
node server <sub port> <pub port>
```

### Subscriber
Start and subscribe the subscriber with
```
node subscriber <server sub signup port> <this subscriber port>
```

### Publish Message
You can publish a message like so
```
node publisher <pub port> <'message'>
```

### Architecture Diagram

![image info](./diagrams/ArchitectureDiagram.jpg)