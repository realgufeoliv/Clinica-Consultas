import { api } from "./http/api";
import urls from "./http/urls";

export const getConsultas = () => {
  return api({
    method: "GET",
    url: `${urls.baseUrl}/consulta`,
  });
}

export const createConsulta = (data) => {
  return api({
    method: "POST",
    url: `${urls.baseUrl}/consulta`,
    data,
  });
}
