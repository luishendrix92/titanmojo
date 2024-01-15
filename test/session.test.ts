import { describe, expect, it } from "vitest";
import "dotenv/config";

import { Platform } from "../src/types";
import { create } from "../src/session";

describe("session:create", () => {
  it("should return session details on any endpoint", async () => {
    const sessionRes = await create(Platform.SmitePC);

    console.log(JSON.stringify(sessionRes));
    console.log(`${Platform.SmitePC}=${process.env[Platform.SmitePC]}`);
  });
});
