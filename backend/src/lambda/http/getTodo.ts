import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as middy from 'middy';
import { cors } from 'middy/middlewares';
import { getTodo } from '../../businessLogic/todos';
import { getUserId } from '../utils';

export const handler = middy(
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
        const userId = getUserId(event);
        const todoId: string = event.pathParameters.todoId;
        const todo = await getTodo(userId, todoId);

        return {
            statusCode: 200,
            body: JSON.stringify({ item: todo }),
        };
    }
);

handler.use(cors({ credentials: true }));
