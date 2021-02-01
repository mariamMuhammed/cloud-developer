import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { CreateTodoRequest } from '../../requests/CreateTodoRequest'

import { createTodoItem } from '../../../bussinessLogic/todo'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const newTodo: CreateTodoRequest = JSON.parse(event.body)

  // TODO: Implement creating a new TODO item
 console.log('processing event',event)
 const authorization = event.headers.Authorization
 const split = authorization.split(' ')
 const jwtToken = split[1]

 
 const newItem = await createTodoItem(jwtToken, newTodo)
 return {
   statusCode:201,
   headers: {
     'Access-Control-Allow-Origin':'*',
     'Access-Control-Allow-Credentials': true
   },
   body: JSON.stringify({
    item : newItem
   })
 }
}
