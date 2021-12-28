import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: "k4zy",
  apiKey: process.env.API_KEY,
});
