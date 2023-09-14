import { fetchAsAdmin } from "./common";

export const create = async <T>(args: T) => fetchAsAdmin("sponsors", "POST", args);
