import {https, config} from "firebase-functions";
import {Response} from "express";
import {modifyResponse, isAuthenticated} from "../../auth/authentication";
// import fetch = require("node-fetch");

export const getServers = https
    .onRequest(async (request: https.Request, response: Response) => {
      if (request.method === "OPTIONS") {
        response = modifyResponse(request, response);
        response.send();
        return;
      }
      if (!await isAuthenticated(request, response)) {
        return;
      }
      response = modifyResponse(request, response, 200);

      const base64BasicAuth = new Buffer(
          `${config().nodeone.user+":"+config().nodeone.password}`
      ).toString("base64");
      const nodeOneUri = `${config().nodeone.ip}:${config().nodeone.port}`;
      const fetched = await fetch(`${nodeOneUri}/servers`, {
        method: "GET",
        headers: {
          authorization: `Basic ${base64BasicAuth}`,
        },
      });
      response.json(fetched.json());
      return;
    });

export const getServer = https
    .onRequest(async (request: https.Request, response: Response) => {
      if (request.method === "OPTIONS") {
        response = modifyResponse(request, response);
        response.send();
        return;
      }
      if (!await isAuthenticated(request, response)) {
        return;
      }
      response = modifyResponse(request, response, 200);

      const base64BasicAuth = new Buffer(
          `${config().nodeone.user+":"+config().nodeone.password}`
      ).toString("base64");
      const nodeOneUri = `${config().nodeone.ip}:${config().nodeone.port}`;
      const fetched = await fetch(`${nodeOneUri}/server/${request.params.id}`, {
        method: "GET",
        headers: {
          authorization: `Basic ${base64BasicAuth}`,
        },
      });
      response.json(fetched.json());
      return;
    });
