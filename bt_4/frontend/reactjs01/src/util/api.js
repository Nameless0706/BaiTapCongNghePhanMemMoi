import axios from "./axios.customize";

const createUserApi = (name, email, password) => {
  const URL_API = "http://localhost:8080/v1/api/register";
  const data = {
    name: name,
    email: email,
    password: password,
  };

  return axios.post(URL_API, data);
};

const loginApi = (email, password) => {
  const URL_API = "http://localhost:8080/v1/api/login";
  const data = {
    email: email,
    password: password,
  };
  return axios.post(URL_API, data);
};

const getUserApi = () => {
  const URL_API = "http://localhost:8080/v1/api/user";
  return axios.get(URL_API);
};

const getAllCategories = () => {
  const URL_API = "http://localhost:8080/v1/api/category/all";
  return axios.get(URL_API);
};

const getAllProductsByCategoryName = (categoryName, page, limit) => {
  const URL_API = `http://localhost:8080/v1/api/product/category/${categoryName}?page=${page}&limit=${limit}`;
  return axios.get(URL_API);
};


const getAllProducts = (page, limit) => {
  const URL_API = `http://localhost:8080/v1/api/product/all?page=${page}&limit=${limit}`;
  return axios.get(URL_API);
};


export {
  createUserApi,
  loginApi,
  getUserApi,
  getAllCategories,
  getAllProducts,
  getAllProductsByCategoryName,
};
