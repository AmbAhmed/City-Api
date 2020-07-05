const axios = require("axios");
const URL = "https://bpdts-test-app.herokuapp.com";

const getAllUsers = async (params) => {
  const { data } = await axios.get(`${URL}/${params}`);

  return data;
};

module.exports = {
  getAllUsers,
};
