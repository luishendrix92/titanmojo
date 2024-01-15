import md5 from "md5";

import { Method, Platform, SessionResponse } from "./types";

export function fmtDateUTC(timestamp: Date) {
  const year = timestamp.getUTCFullYear().toString();
  const month = (timestamp.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = timestamp.getUTCDate().toString().padStart(2, "0");
  const hours = timestamp.getUTCHours().toString().padStart(2, "0");
  const minutes = timestamp.getUTCMinutes().toString().padStart(2, "0");
  const seconds = timestamp.getUTCSeconds().toString().padStart(2, "0");

  return year + month + day + hours + minutes + seconds;
}

export function signature(devId: string, authKey: string, method: Method, timestamp: string) {
  return md5(devId + method + authKey + timestamp);
}

export async function create(platform: Platform): Promise<string> {
  if (!(process.env.DEV_ID) || !(process.env.AUTH_KEY)) {
    throw new Error("Missing DEV_ID or AUTH_KEY env variables.");
  }

  if (!(process.env[platform])) {
    const timestamp = fmtDateUTC(new Date());

    const data: SessionResponse = await fetch(
      "https://api.smitegame.com/smiteapi.svc/" +
      Method.CreateSession + "Json" + "/" +
      process.env.DEV_ID + "/" +
      signature(
        process.env.DEV_ID || "",
        process.env.AUTH_KEY || "",
        Method.CreateSession,
        timestamp
      ) + "/" +
      timestamp
    )
      .then(res => res.json());

    if (!data.session_id) {
      throw new Error(`Session Error: ${data.ret_msg}`);
    }

    process.env[platform] = data.session_id;
  }

  return process.env[platform] || "";
}