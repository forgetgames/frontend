import {https, config} from "firebase-functions";
import {Response} from "express";
import {modifyResponse, isAuthenticated} from "../../auth/authentication";
import axios from "axios";
import {Agent} from "https";
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

      const base64BasicAuth = Buffer.from(
          `${config().nodeone.user+":"+config().nodeone.password}`
      ).toString("base64");
      const nodeOneUri = `https://${config().nodeone.ip}:${config().nodeone.port}`;
      const fetched = await axios.request({
        url: `${nodeOneUri}/servers`,
        method: "GET",
        headers: {
          authorization: `Basic ${base64BasicAuth}`,
        },
        httpsAgent: new Agent({rejectUnauthorized: false}),
      });
      response.json(fetched.data);
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

      const base64BasicAuth = Buffer.from(
          `${config().nodeone.user+":"+config().nodeone.password}`
      ).toString("base64");
      const nodeOneUri = `https://${config().nodeone.ip}:${config().nodeone.port}`;
      const fetched = await axios.request({
        url: `${nodeOneUri}/server/${request.params.id}`,
        method: "POST",
        headers: {
          authorization: `Basic ${base64BasicAuth}`,
        },
        httpsAgent: new Agent({rejectUnauthorized: false}),
      });
      response.json(fetched.data);
      return;
    });
