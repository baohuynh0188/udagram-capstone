// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'ai36st6cxl'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map. For example:
  // domain: 'dev-nd9990-p4.us.auth0.com',
  domain: 'dev-3zxigekn0pd6bj6m.us.auth0.com', // Auth0 domain
  // clientId: 'RjlbUpEuBgvkwOftp8gtl5aEzIcL259y', // Auth0 client id
  clientId: 'f0KxmLyDgopiTgEQhopUNA7yk6fP5UlA',
  callbackUrl: 'http://localhost:3000/callback'
}
