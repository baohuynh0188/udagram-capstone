import 'source-map-support/register';
import {
    APIGatewayProxyHandler,
    APIGatewayProxyEvent,
    APIGatewayProxyResult,
} from 'aws-lambda';
import { createLogger } from '../../utils/logger';
import { removeItem } from '../../dataLayer/connectionsAccess';

const logger = createLogger('createTodoHandler');

export const handler: APIGatewayProxyHandler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    logger.info('WebSocket disconnect', event);

    const connectionId = event.requestContext.connectionId;

    await removeItem(connectionId);

    return {
        statusCode: 200,
        body: '',
    };
};
