import * as AWS from 'aws-sdk';
import * as AWSXRay from 'aws-xray-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { createLogger } from '../utils/logger';

const XAWS = AWSXRay.captureAWS(AWS);
const logger = createLogger('TodosAccess');

const docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient();

const connectionsTable = process.env.CONNECTIONS_TABLE;

export const saveItem = async (connectionId: string) => {
    const item = {
        id: connectionId,
        timestamp: new Date().toISOString(),
    };

    logger.info('Saving item', item);

    const params = {
        TableName: connectionsTable,
        Item: item,
    };

    await docClient.put(params).promise();
};

export const removeItem = async (connectionId: string) => {
    const key = {
        id: connectionId,
    };

    logger.info('Removing item with key', key);

    const params = {
        TableName: connectionsTable,
        Key: key,
    };

    await docClient.delete(params).promise();
};

const connectionsAcess = {
    saveItem,
    removeItem,
};

export default connectionsAcess;
