const config = require("../config");
const faker = require("./faker");
const db = require("./db.json");

exports.createData = () => {
  const data = { users: [], orders: [], products: db.products, reviews: [] };

  for (let i = 1; i <= config.NUMBER_OF_USERS; i++) {
    data.users.push(faker.createUser(i));
  }

  for (let i = 1; i <= config.NUMBER_OF_ORDERS; i++) {
    data.orders.push(faker.createOrder(i));
  }

  // for (let i = 1; i <= config.NUMBER_OF_PRODUCTS; i++) {
  //   data.products.push(faker.createProduct(i));
  // }

  for (let i = 1; i <= config.NUMBER_OF_REVIEWS; i++) {
    data.reviews.push(faker.createReview(i));
  }

  return data;
};
