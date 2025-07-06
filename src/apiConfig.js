import isProduction from "@/env.js";
const devBaseURL = "http://localhost:5220";
const proBaseURL = "http://152.136.42.252:5220";

export const BASE_URL = isProduction ? proBaseURL : devBaseURL;
export const TIMEOUT = 5000;
export const serverURL = isProduction ? proBaseURL : devBaseURL;
