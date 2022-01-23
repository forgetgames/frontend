import {
  refreshToken, getAuthUrl, processCode, revokeToken,
} from "./services/auth";
import {getServer, getServers} from "./services/servers";

export const api = {
  "server": getServer,
  "servers": getServers,
  "auth": getAuthUrl,
  "refresh": refreshToken,
  "revoke": revokeToken,
  "code": processCode,
};
