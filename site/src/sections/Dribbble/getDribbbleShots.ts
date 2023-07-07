import axios from "axios";
import { DribbbleShot } from "./Shot";

export default async function getDribbbleShots() {
  const res = await axios(
    `https://api.dribbble.com/v2/user/shots?access_token=${process.env.DRIBBBLE_ACCESS_TOKEN}`
  );

  if (res.status != 200) {
    throw new Error(`Failed to fetch Dribbble data: ${res.status}`);
  }

  return res.data as DribbbleShot[];
}
