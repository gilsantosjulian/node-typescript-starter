import http from './http';

const setHeader = (token: string) => {
  deleteHeader();
  http.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const deleteHeader = () => {
  delete http.defaults.headers.common.Authorization;
};

export = {
  setHeader,
  deleteHeader,
};
