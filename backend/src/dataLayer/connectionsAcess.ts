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

    logger.info('Saving item: ', item.id);

    const params = {
        TableName: connectionsTable,
        Item: item,
    };

    try {
        await docClient.put(params).promise();

        logger.info('Item is saved');
    } catch (error) {
        logger.error('Error while saved item: ', JSON.stringify(error));
    }
};

export const removeItem = async (connectionId: string) => {
    const key = {
        id: connectionId,
    };

    logger.info('Removing item with key: ', key.id);

    const params = {
        TableName: connectionsTable,
        Key: key,
    };

    try {
        await docClient.delete(params).promise();

        logger.info('Item is removed');
    } catch (error) {
        logger.error('Error while remove item: ', JSON.stringify(error));
    }
};

const connectionsAcess = {
    saveItem,
    removeItem,
};

export default connectionsAcess;
