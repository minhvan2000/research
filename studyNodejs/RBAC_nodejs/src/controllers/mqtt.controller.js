import messageQueue from '../configs/init.bullMQ.js';
import loggerLog from '../utils/logger.log.js';

class MQTTController {
    onMessage = (topic, message, packet) => {
        loggerLog.log(`connectionMQTT - Connection status: message`, [
            'controllers/mqtt.controller',
            { requestId: packet.messageId },
            message.toString('utf8'),
        ]);

        try {
            const messageData = JSON.parse(message);
            // Add message to the BullMQ queue
            messageQueue.add(
                'processMessage',
                {
                    topic,
                    requestId: packet.messageId,
                    message: JSON.stringify(messageData),
                },
                { removeOnComplete: true, removeOnFail: true }
            );
        } catch (error) {
            loggerLog.error(
                `The message[${message.toString('utf8')}] has an error`,
                [
                    'controller/mqtt.controller',
                    { requestId: packet.cmd },
                    {
                        message: error.message,
                    },
                ]
            );
        }
    };
}
export default new MQTTController();
