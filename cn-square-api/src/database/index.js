const config = require("../config");
const faker = require("./faker");

exports.createData = () => {
  const data = { users: [], orders: [], products: [], comments: [] };

  for (let i = 1; i <= config.NUMBER_OF_USERS; i++) {
    data.users.push(faker.createUser(i));
  }

  for (let i = 1; i <= config.NUMBER_OF_ORDERS; i++) {
    data.orders.push(faker.createOrder(i));
  }

  for (let i = 1; i <= config.NUMBER_OF_PRODUCTS; i++) {
    data.products.push(faker.createProduct(i));
  }

  for (let i = 1; i <= config.NUMBER_OF_COMMENTS; i++) {
    data.comments.push(faker.createComment(i));
  }

  return data;
};
