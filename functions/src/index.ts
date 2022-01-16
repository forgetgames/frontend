import {refreshToken, getAuthUrl, processCode} from "./services/auth";
import {getServer, getServers} from "./services/servers";

export const api = {
  "server": getServer,
  "servers": getServers,
  "auth": getAuthUrl,
  "refresh": refreshToken,
  "code": processCode,
};
