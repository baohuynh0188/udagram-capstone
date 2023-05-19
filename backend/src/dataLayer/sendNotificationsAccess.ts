import 'source-map-support/register';
import * as AWS from 'aws-sdk';
import { S3Event } from 'aws-lambda';
import { createLogger } from '../utils/logger';

const logger = createLogger('createImageHandler');

const docClient = new AWS.DynamoDB.DocumentClient();

const connectionsTable = process.env.CONNECTIONS_TABLE;
const stage = process.env.STAGE;
const apiId = process.env.API_ID;

const connectionParams = {
    apiVersion: '2018-11-29',
    endpoint: `${apiId}.execute-api.us-east-1.amazonaws.com/${stage}`,
};

const apiGateway = new AWS.ApiGatewayManagementApi(connectionParams);

export const processS3Event = async (s3Event: S3Event) => {
    for (const record of s3Event.Records) {
        const key = record.s3.object.key;

        logger.info(`Processing S3 item with key: ${key}`);

        const params = {
            TableName: connectionsTable,
        };

        const connections = await docClient.scan(params).promise();

        const payload = {
            imageId: key,
        };

        for (const connection of connections.Items) {
            const connectionId = connection.id;
            await sendMessageToClient(connectionId, payload);
        }
    }
};

const sendMessageToClient = async (
    connectionId,
    payload: { imageId: string }
) => {
    try {
        logger.info(`Sending message to a connection ${connectionId}`);

        const params = {
            ConnectionId: connectionId,
            Data: JSON.stringify(payload),
        };

        await apiGateway.postToConnection(params).promise();
    } catch (error) {
        logger.info(`Failed to send message: ${error.message}`);

        if (error.statusCode === 410) {
            logger.info('Stale connection');

            const params = {
                TableName: connectionsTable,
                Key: {
                    id: connectionId,
                },
            };

            await docClient.delete(params).promise();
        }
    }
};
