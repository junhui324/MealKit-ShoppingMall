import * as Token from '/src/modules/api_methodModules/Token.js';

async function request({ endpoint, method, params = '', data = {} }) {
  const apiUrl = params ? `${endpoint}/${params}` : endpoint;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: Token.getToken() ? `Bearer ${Token.getToken()}` : null,
  };

  try {
    let response;
    if (method === 'GET') {
      response = await axios.get(apiUrl, { headers });
    } else if (method === 'POST') {
      response = await axios.post(apiUrl, data, { headers });
    } else if (method === 'PATCH') {
      response = await axios.patch(apiUrl, data, { headers });
    } else if (method === 'PUT') {
      response = await axios.put(apiUrl, data, { headers });
    } else if (method === 'DELETE') {
      response = await axios.delete(apiUrl, { headers, data });
    } else {
      throw new Error('잘못된 메소드 접근입니다.');
    }

    return response.data;
  } catch (error) {
    if (error.response) {
      const { status } = error.response;
      throw new Error(status);
    } else {
      throw new Error('Failed to make request');
    }
  }
}

async function get(endpoint, params = '') {
  return await request({ endpoint, method: 'GET', params });
}

async function post(endpoint, params = '', data) {
  return await request({ endpoint, method: 'POST', params, data });
}

async function put(endpoint, params = '', data) {
  return await request({ endpoint, method: 'PUT', params, data });
}

async function patch(endpoint, params = '', data) {
  return await request({ endpoint, method: 'PATCH', params, data });
}

async function del(endpoint, params = '', data = {}) {
  return await request({ endpoint, method: 'DELETE', params, data });
}

export { get, post, put, patch, del as delete };
