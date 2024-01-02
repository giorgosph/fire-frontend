const IP = "localhost"; 
const PORT = 4000;

export const BASE_URL = `http://${IP}:${PORT}/`;

export const LOGIN_EP = `${BASE_URL}login`;
export const TOKEN_EP = `${BASE_URL}token`;
export const CALCULATION_EP = `${BASE_URL}calculate`;