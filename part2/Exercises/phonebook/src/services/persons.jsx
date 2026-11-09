import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

//Función para obtener el objeto
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => {
    return response.data;
  });
};

//Función para crear un nuevo objeto
const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => {
    return response.data;
  });
};

//Función para eliminar elementos del objeto
const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => {
    return response.data;
  });
};

//Función para actualizar elementos completos del objeto
const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => {
    return response.data;
  });
};

export default {
  getAll,
  create,
  remove,
  update,
};
