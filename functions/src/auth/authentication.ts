import {Request, Response, config} from "firebase-functions";
import OAuth = require( "discord-oauth2" );

/**
 * Modifies headers for different environments
 * @param {Request<any>} request
 * @param {Response<any>} response
 * @param {number} statusCode HTTP status
 * @return {Response<any>}
 */
function modifyResponse(
    request: Request<any>,
    response: Response<any>,
    statusCode = 200): Response<any> {
  // Only modify header in development
  response.set("Access-Control-Allow-Credentials", "true");
  if (request.method === "OPTIONS") {
    response.set("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    response.set(
        "Access-Control-Allow-Headers",
        [
          "Access-Control-Allow-Headers",
          "Authorization",
          "Origin",
          "Accept",
          "X-Requested-With",
          "Content-Type",
          "Access-Control-Request-Method",
          "Access-Control-Request-Headers",
        ].join(", ")
    );
    response.set("Access-Control-Max-Age", "3600");
    response.status(204);
  } else {
    response.status(statusCode);
  }
  if (process.env.NODE_ENV === "development") {
    response
        .set("Access-Control-Allow-Origin", "http://localhost:8080");
  } else {
    response
        .set("Access-Control-Allow-Origin", "https://forgetgames.com");
  }
  return response;
}

/**
 * Checks application-level permissions
 * @param {Request} request
 * @param {Response} response
 * @return {Promise<boolean>}
 */
async function isAuthenticated(
    request: Request,
    response: Response): Promise<boolean> {
  const {authorization} = request.headers;

  if (!authorization) {
    response
        .status(401)
        .json({error: "Unauthorized to perform actions"});
    return false;
  }

  if (!authorization.startsWith("Bearer")) {
    response
        .status(401)
        .json({error: "Unauthorized to perform actions"});
    return false;
  }

  const split = authorization.split("Bearer ");
  if (split.length !== 2) {
    response
        .status(401)
        .json({error: "Unauthorized to perform actions"});
    return false;
  }

  const token = split[1];

  try {
    const oauth = new OAuth({
      clientId: config().discord.client.id,
      clientSecret: config().discord.client.secret,
      redirectUri: config().discord.redirect.uri,
    });
    const decodedToken: OAuth.User =
        await oauth.getUser(token);
    response.locals = {
      ...decodedToken,
    };
  } catch (error) {
    response
        .status(401)
        .json({message: "Unauthorized to perform actions"});
    return false;
  }
  return true;
}

export {modifyResponse, isAuthenticated, OAuth};
