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
        // create a que before sending a message into the que
        // will create a que if there is no que in the server 
        channel.assertQueue(queueName, {
            durable: false
            // if false, no scrubscriber, it will not delete the que 
            // if true, if there is no subscriber, the que will be delete
        });
        // tell the channel what que name to consume the message
        /// call back you'll get the message
        channel.consume(queueName, (message) => {
            // getting message through buffer
            // content holds the buffer message
            // convert it to string for legibility 
            console.log(`Recieved Message : ${message.content.toString()}`);
        })
    })
})