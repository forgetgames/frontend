import {https, config} from "firebase-functions";
import {Response} from "express";
import crypto = require("crypto");

import {modifyResponse, OAuth} from "../../auth/authentication";
import {DISCORD_SCOPES} from "../../constants";


export const getAuthUrl = https
    .onRequest(async (request: https.Request, response: Response) => {
      if (request.method === "OPTIONS") {
        response = modifyResponse(request, response);
        response.send();
        return;
      }
      const oauth = new OAuth({
        clientId: config().discord.client.id,
        clientSecret: config().discord.client.secret,
        redirectUri: config().discord.redirect.uri,
      });
      const authUrl = oauth.generateAuthUrl({
        scope: DISCORD_SCOPES,
        state: crypto.randomBytes(16).toString("hex"),
      });
      response = modifyResponse(request, response, 200);
      response.json({authUrl});
      return;
    });

export const processCode = https
    .onRequest(async (request: https.Request, response: Response) => {
      if (request.method === "OPTIONS") {
        response = modifyResponse(request, response);
        response.send();
        return;
      }
      console.log(typeof request.body);
      if (!request.body.code) {
        response = modifyResponse(request, response, 400);
        response.json({"message": "invalid authorization request body"});
        return;
      }
      const oauth = new OAuth({
        clientId: config().discord.client.id,
        clientSecret: config().discord.client.secret,
      });
      const authResult: OAuth.TokenRequestResult = await oauth.tokenRequest({
        code: request.body.code,
        scope: DISCORD_SCOPES.join(" "),
        grantType: "authorization_code",
        redirectUri: config().discord.redirect.uri,
      });
      const userResult: OAuth.User =
        await oauth.getUser(authResult.access_token);
      response = modifyResponse(request, response, 200);
      response.json({...authResult, ...userResult});
      return;
    });

export const refreshToken = https
    .onRequest(async (request: https.Request, response: Response) => {
      if (request.method === "OPTIONS") {
        response = modifyResponse(request, response);
        response.send();
        return;
      }
      const oauth = new OAuth({
        clientId: config().discord.client.id,
        clientSecret: config().discord.client.secret,
        redirectUri: config().discord.redirect.uri,
      });
      const accessTokenResponse = oauth.tokenRequest({
        scope: DISCORD_SCOPES,
        grantType: "refresh_token",
        refreshToken: request.body.refreshToken,
      });
      response = modifyResponse(request, response, 200);
      response.json({...accessTokenResponse});
      return;
    });

export const revokeToken = https
    .onRequest(async (request: https.Request, response: Response) => {
      if (request.method === "OPTIONS") {
        response = modifyResponse(request, response);
        response.send();
        return;
      }
      const oauth = new OAuth({
        clientId: config().discord.client.id,
        clientSecret: config().discord.client.secret,
        redirectUri: config().discord.redirect.uri,
      });
      const credentials = Buffer.from(
          `${config().discord.client.id}:${config().discord.client.secret}`
      ).toString("base64");
      const accessTokenResponse =
        oauth.revokeToken(request.body.access_token, credentials);
      response = modifyResponse(request, response, 200);
      response.json({...accessTokenResponse});
      return;
    });
