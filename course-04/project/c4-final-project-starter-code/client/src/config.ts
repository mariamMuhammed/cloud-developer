// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'sb2fxin68b'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map
  domain: 'dev-xhcvdwef.us.auth0.com',            // Auth0 domain
  clientId: 'ZevQGjsW0hLsg0AgoA9CCGqSs56kBD5q',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
