import 'source-map-support/register';
import { SNSHandler, SNSEvent } from 'aws-lambda';
import { createLogger } from '../../utils/logger';
import { processS3Event } from '../../dataLayer/sendNotificationsAccess';

const logger = createLogger('createImageHandler');

export const handler: SNSHandler = async (event: SNSEvent) => {
    logger.info('Processing SNS event ', event);

    for (const snsRecord of event.Records) {
        const s3EventStr = snsRecord.Sns.Message;
        logger.info(`Processing S3 event ${JSON.stringify(s3EventStr)}`);
        const s3Event = JSON.parse(s3EventStr);

        await processS3Event(s3Event);
    }
};
