import { getDefaultOptions, request } from 'api/helpers';

const resource = 'automobiles';

export const apiAutomobileGet = async (serviceUrl, id) => {
  const url = `${serviceUrl}/${resource}/${id}`;
  const options = {
    ...getDefaultOptions(),
    method: 'GET',
  };
  return request(url, options);
};

export const apiAutomobilePost = async (serviceUrl, automobile) => {
  const url = `${serviceUrl}/${resource}`;
  const options = {
    ...getDefaultOptions(),
    method: 'POST',
    body: automobile ? JSON.stringify(automobile) : null,
  };
  return request(url, options);
};

export const apiAutomobilePut = async (serviceUrl, automobile) => {
  const url = `${serviceUrl}/${resource}`;
  const options = {
    ...getDefaultOptions(),
    method: 'PUT',
    body: automobile ? JSON.stringify(automobile) : null,
  };
  return request(url, options);
};

export const apiAutomobileDelete = async (serviceUrl, id) => {
  const url = `${serviceUrl}/${resource}/${id}`;
  const options = {
    ...getDefaultOptions(),
    method: 'DELETE',
  };
  return request(url, options);
};
