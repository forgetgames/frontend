import {
  refreshToken, getAuthUrl, processCode, revokeToken,
} from "./services/auth";
import {getServer, getServers, postServerAction} from "./services/servers";

export const api = {
  "server": getServer,
  "action": postServerAction,
  "servers": getServers,
  "auth": getAuthUrl,
  "refresh": refreshToken,
  "revoke": revokeToken,
  "code": processCode,
};
