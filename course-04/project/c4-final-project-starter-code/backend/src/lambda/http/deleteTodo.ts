import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { deleteTodoItem } from '../../../bussinessLogic/todo'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId

  // TODO: Remove a TODO item by id
  if(!todoId)
  {
    return {
      statusCode: 404,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: 'todoId parameter is missing'
    }
  }
  const authorization = event.headers.Authorization
  const split = authorization.split(' ')
  const jwtToken = split[1]


  await deleteTodoItem(jwtToken, todoId)
  return {
    statusCode:200,
    headers: {
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Credentials': true
    },
    body: ''
  }
 
}
