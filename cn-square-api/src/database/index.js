const faker = require("./faker");

exports.createData = () => {
  const data = { users: [], orders: [], products: [], comments: [] };

  for (let i = 1; i <= 100; i++) {
    data.users.push(faker.createUser(i));
    data.orders.push(faker.createOrder(i));

    data.products.push(faker.createProduct(i));
    data.comments.push(faker.createComment(i));
  }

  return data;
};
