import axios from "axios";

type payloadUser = { 
  email: string;
  password: string;
  name?: string;
}

type payloadEvent = {
  title: string;
  notes: string;
  end: Date;
  start: Date;
};

const baseURL = process.env.REACT_APP_API_URL;

// Realiza el POST, GET que NO requieran el token, si el metodo es GET retorna 
// la peticion a la url, en cambio si es otro metodo retona la peticion con la data
export const fetchNotToken = async (
  endpoint: string,
  data: payloadEvent | payloadUser,
  method = 'GET'
) => {
  const url = `${baseURL}/${endpoint}`;
  if (method === "GET") {
    const response = await axios.get(url);
    return response;
  }

  const response = await axios.post(url, data ,{
    headers: { "Content-Type": "application/json" },
  });
  return response
};

// Realiza el POST, GET que requieran el token, si el metodo es GET retorna 
// la peticion a la url con los headers correspondiente,
// en cambio si es otro metodo retona la peticion con la data
export const fetchWithToken = async (
  endpoint: string,
  method: string,
  data?: payloadEvent | payloadUser
) => {
  try {
    const url = `${baseURL}/${endpoint}`;
    const token = localStorage.getItem("token") || "";
    if (method === "GET") {
      const response = await axios.get(url, { headers: { "Authorization": token} });
      return response;
    };

    if (method === "DELETE") {
      const response = await axios.delete(url, { headers: { "Authorization": token } });
      return response;
    };

    if (method === "PUT") {
      const response = await axios.put(url, data, { headers: { Authorization: token }});
      return response;
    }

    const response = await axios.post(url, data, { headers: { "Authorization": token } });
    return response

  } catch (error:any) {
    console.log(error)
    throw new Error(error)
  }
};