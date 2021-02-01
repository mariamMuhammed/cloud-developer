import 'source-map-support/register'
import * as AWS  from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'


const XAWS = AWSXRay.captureAWS(AWS)
const s3 = new XAWS.S3({
  signatureVersion: 'v4'
})

const bucketName = process.env.ATTACH_S3_BUCKET
const urlExpiration = process.env.SIGNED_URL_EXPIRATION


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId

  // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
 console.log('processing event', event)

 if(!todoId)
 {
   return{
     statusCode: 404,
     headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
     },
     body: 'todoId parameter is missing'
   }
 }
 const uploadUrl = getUploadUrl(todoId)

 return{
   statusCode: 201,
   headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
  },
  body: JSON.stringify({
    uploadUrl: uploadUrl
  })
 }
}

function getUploadUrl(todoId: string){
  return s3.getSignedUrl('putObject',{
    Bucket: bucketName,
    Key: todoId,
    Expires: parseInt(urlExpiration)
  })
}