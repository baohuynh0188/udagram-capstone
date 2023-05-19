import 'source-map-support/register';
import { SNSEvent, SNSHandler } from 'aws-lambda';
import { processImage } from '../../dataLayer/resizeImageAccess';
import { createLogger } from '../../utils/logger';

const logger = createLogger('createImageHandler');

export const handler: SNSHandler = async (event: SNSEvent) => {
    logger.info('Processing SNS event ', event);
    for (const snsRecord of event.Records) {
        const s3EventStr = snsRecord.Sns.Message;

        logger.info('Processing S3 event', s3EventStr);

        const s3Event = JSON.parse(s3EventStr);

        for (const record of s3Event.Records) {
            await processImage(record);
        }
    }
};
