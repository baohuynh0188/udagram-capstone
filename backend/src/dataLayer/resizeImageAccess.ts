import { S3EventRecord } from 'aws-lambda';
import 'source-map-support/register';
import * as AWS from 'aws-sdk';
import Jimp from 'jimp/es';
import { createLogger } from '../utils/logger';

const logger = createLogger('createImageHandler');

const s3 = new AWS.S3();

const imagesBucketName = process.env.ATTACHMENT_S3_BUCKET;
const thumbnailBucketName = process.env.THUMBNAILS_S3_BUCKET;

export const processImage = async (record: S3EventRecord) => {
    const key = record.s3.object.key;

    logger.info('Processing S3 item with key: ', key);

    const paramsGet = {
        Bucket: imagesBucketName,
        Key: key,
    };

    const response = await s3.getObject(paramsGet).promise();

    const body = response.Body;
    const image = await Jimp.read(body);

    logger.info('Resizing image');

    image.resize(150, Jimp.AUTO);
    const convertedBuffer = await image.getBufferAsync(Jimp.AUTO);

    logger.info(`Writing image back to S3 bucket: ${thumbnailBucketName}`);

    const paramsPut = {
        Bucket: thumbnailBucketName,
        Key: `${key}.jpeg`,
        Body: convertedBuffer,
    };

    await s3.putObject(paramsPut).promise();
};
