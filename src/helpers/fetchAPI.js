const baseURL = process.env.REACT_APP_API_URL;

// Realiza el POST, GET que NO requieran el token, si el metodo es GET retorna 
// la peticion a la url, en cambio si es otro metodo retona la peticion con la data
export const fetchNotToken = (endpoint, data, method = 'GET') => {
  const url = `${baseURL}/${endpoint}`; 
  if (method === 'GET') return fetch(url);
  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
};

// Realiza el POST, GET que requieran el token, si el metodo es GET retorna 
// la peticion a la url con los headers correspondiente,
// en cambio si es otro metodo retona la peticion con la data
export const fetchWithToken = (endpoint, data, method = 'GET') => {
  const url = `${baseURL}/${endpoint}`;
  const token = localStorage.getItem('token') || '';

  if (method === 'GET')
    return fetch(url, {
      method,
      headers: {
        'x-token': token
      }
    })
  
  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'x-token': token
    },
    body: JSON.stringify(data)
  })
};