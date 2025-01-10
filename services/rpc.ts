import { AppType } from "@/app/api/[[...route]]/route";
import { hc } from "hono/client";

export const rpc = hc<AppType>(process.env.NEXTAUTH_URL ?? "").api;
