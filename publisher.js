// this file will help us to send a message into a que 

// importing amqplib protocol
// by default this package message gives response in promise
// use async/await to handle promie 
// import callback_api to to get response in the callback 
const amqp = require('amqplib/callback_api');

// make connection with rabbitmq server 
amqp.connect('amqp://localhost', (err, connection) => {
    if(err) {
        throw err;
    }
    connection.createChannel((err, channel) => {
        if (err) {
            throw err;
        }
        let queueName = 'technical';
        let message = 'this is Juno Vue'
        // create a que before sending a message into the que
        // will create a que if there is no que in the server 
        channel.assertQueue(queueName, {
            durable: false
            // if false, no scrubscriber, it will not delete the que 
            // if true, if there is no subscriber, the que will be delete
        })
        // send message into the que
        // pass message as the buffer 
        channel.sendToQueue(queueName, Buffer.from(message));
        // close out the connect after 1 second 
        // after message is in the que for 1 second there is no need to keep the connection open
        // in cmd prompt insert: node .\publisher.js
        // you can see that it closes after 1 second
        setTimeout(() => {
            // connection is linked to the 2nd arg passed in amp.connect
            connection.close();
        }, 1000)
    })
})