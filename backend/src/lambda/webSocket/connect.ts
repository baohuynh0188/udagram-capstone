import 'source-map-support/register';
import {
    APIGatewayProxyHandler,
    APIGatewayProxyEvent,
    APIGatewayProxyResult,
} from 'aws-lambda';
import { createLogger } from '../../utils/logger';
import { saveItem } from '../../dataLayer/connectionsAcess';

const logger = createLogger('createTodoHandler');


export const handler: APIGatewayProxyHandler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    logger.info('WebSocket connect', event);

    const connectionId = event.requestContext.connectionId;

    await saveItem(connectionId);

    return {
        statusCode: 200,
        body: '',
    };
};
