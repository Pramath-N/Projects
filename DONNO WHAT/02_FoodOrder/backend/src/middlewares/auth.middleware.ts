import { auth } from "express-oauth2-jwt-bearer"

export const jwtCheck = auth({
    audience: 'MERNEats-food-ordering-app-api',
    issuerBaseURL: 'https://dev-qqhy1y3lmnl0irg8.us.auth0.com/',
    tokenSigningAlg: 'RS256'
  });