import {config} from "firebase-functions";
import {OAuth} from "./authentication";

export const discordGuilds: string[] = config().guilds.authorized.split(",");

export const isAuthorized = (userGuilds: OAuth.PartialGuild[]) => {
  // TODO: Determine/Implement a guild specific game master rule.
  const applicableGuilds = userGuilds.filter((guild) => {
    return discordGuilds.includes(guild.id) &&
    guild.permissions && parseInt(guild.permissions) & (1 << 3); // For now only admins
  });
  return applicableGuilds.length > 0;
};
