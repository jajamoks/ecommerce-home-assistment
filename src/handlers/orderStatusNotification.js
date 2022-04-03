import { logger } from "../utils/logger";

async function orderStatusNotification(event) {
    for (const record of event.Records) {
        const messageAttributes = record.messageAttributes;
        logger.info(
            "Message Attribute: ",
            messageAttributes.AttributeName.stringValue
        );
        logger.info("Message Body: ", record.body);
    }
}

export const handler = orderStatusNotification;