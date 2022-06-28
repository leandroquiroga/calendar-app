import { fetchNotToken, fetchWithToken } from "../../helpers/fetchAPI";
 
describe('Test on fetchAPI.js', () => {
  let token = '';
  
  test('this test should run the function fetchNotToken.js', async() => {
    const response = await fetchNotToken('auth/login', { email: 'lea@correo.com', password: '123456' }, 'POST');
    
    expect(response instanceof Response).toBe(true);
    expect(response.headers instanceof Headers).toBe(true);
    expect(response.status).toBe(201);
    expect(response.ok).toBe(true);

    const body = await response.json();
    expect(body.ok).toBe(true);
    expect(typeof body.uid).toBe('string');
    
    token = body.token;
  });

  test('this test should run the function fetchWithToken.js', async() => {
      
    const id = '628ab2279d10007cd2788789';
    const msg = 'El evento que desea eliminar no existe';

    localStorage.setItem('token', token); 
    const response = await fetchWithToken(`events/${id}`, {}, 'DELETE');
    const body = await response.json()

    expect(typeof body).toBe('object');
    expect(body.ok).toBe(false);
    expect(body.msg).toBe(msg)
  });
});