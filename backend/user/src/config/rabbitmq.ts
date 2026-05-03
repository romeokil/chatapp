import ampq from 'amqplib'

let channel: ampq.Channel;

export const connectRabbitMQ = async ()=>{
    try{
        const connection = await ampq.connect({
            protocol:"amqp",
            hostname:process.env.Rabbitmq_Hostname,
            port: 5672,
            username:process.env.Rabbitmq_Username,
            password: process.env.Rabbitmq_Password
        })

        channel= await connection.createChannel();
        console.log('Connected to Rabbitmq Successfully!!');
    }
    catch(error){
        console.error('Error while connected to Rabbitmq');
    }
}

export const publishToQueue = async (queueName:String, message:any) =>{
    if(!channel){
        console.log('Channel is not initialized yet');
        return ;
    }

    await channel.assertQueue(queueName,{durable:true});

    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)),{
        persistent:true
    });
}