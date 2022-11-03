import * as dotenv from 'dotenv'
import * as path from "path";
export const APPLICATION_CONFIGURATION = dotenv.config()?.parsed ?? {};
export const BASE_DIRECTORY = path.resolve(__dirname, '..', '..');
