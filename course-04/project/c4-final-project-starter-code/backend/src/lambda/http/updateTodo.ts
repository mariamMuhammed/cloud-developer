import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { getTodoItem, updateTodoItem } from '../../../bussinessLogic/todo'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)

  // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
   console.log('caller event', event)

   const authorization = event.headers.Authorization
   const split = authorization.split(' ')
   const jwtToken = split[1]

   if(!await getTodoItem(jwtToken,todoId)){
     return{
       statusCode:404,
       headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: 'todoItem Not Found'
     }
   }
   await updateTodoItem(jwtToken, todoId, updatedTodo)
   return{
     statusCode:201,
     headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
     },
     body: ''
   }
}
