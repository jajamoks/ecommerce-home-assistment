const { logger } = require('../utils/logger');

module.exports.main = (event) => {
    for (const record of event.Records) {
        const messageAttributes = record.messageAttributes;
        logger.info(
            "Message Attribute: ",
            messageAttributes.AttributeName.stringValue
        );
        logger.info("Message Body: ", record.body);
    }
};
