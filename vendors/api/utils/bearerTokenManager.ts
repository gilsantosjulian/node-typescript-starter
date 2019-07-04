import http from './http';

const setBearerToken = (token: string) => {
  deleteBearerToken();
  http.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const deleteBearerToken = () => {
  delete http.defaults.headers.common.Authorization;
};

export = {
  setBearerToken,
  deleteBearerToken,
};
