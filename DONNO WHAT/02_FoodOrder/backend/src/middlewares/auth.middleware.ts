import { Request, Response, NextFunction } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

declare global {
  namespace Express {
    interface Request { 
      auth0Id: string;
      userId: string;
    } 
  }
}

export const jwtCheck = auth({
    audience: 'MERNEats-food-ordering-app-api',
    issuerBaseURL: 'https://dev-qqhy1y3lmnl0irg8.us.auth0.com/',
    tokenSigningAlg: 'RS256'
  });

export const jwtParse = async(req: Request, res: Response, next: NextFunction) => {
    const {authorization} = req.headers;
    
    if(!authorization || !authorization.startsWith('Bearer ')){
      return res.sendStatus(401);
    }

    const token = authorization.split(" ")[1];

    try {
      const decodedToken = jwt.decode(token) as jwt.JwtPayload;
      const auth0Id = decodedToken.sub;
      const user = await User.findOne({auth0Id});

      if(!user){
        return res.sendStatus(401);
      }

      req.auth0Id = auth0Id as string;
      req.userId = user._id.toString();

      next();
    }
    catch(error){ 
      res.sendStatus(401);
    }
} 


