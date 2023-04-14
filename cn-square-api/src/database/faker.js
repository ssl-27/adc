const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt")
const config = require("../config/index");

/**
 * Create a User object with fake data
 * @returns User
 */
exports.createUser = (id) => {
  return {
    id: id,

    userName: faker.internet.userName(),
    password: bcrypt.hashSync(faker.internet.password(), 10),

    firstName: faker.name.firstName(),
    lastName: faker.name.firstName(),

    avatar: faker.image.avatar(),

    email: faker.internet.email(),
    address: faker.address.streetAddress(true),
    phoneNumber: faker.phone.number("+852 #### ####"),

    creditCardIssuer: faker.finance.creditCardIssuer(),
    creditCardNumber: faker.finance.creditCardNumber(),
    creditCardCVV: faker.finance.creditCardCVV(),

    tier: faker.datatype.number({ min: 0, max: 3 }), // 0: standard, 1: student, 2: vip
    points: faker.datatype.number({ min: 100, max: 10000 }),
    birthDate: faker.date.birthdate(),

    registeredAt: faker.date.past(),
  };
};

/**
 * Create a Order Object with fake data
 * @returns Order
 */
exports.createOrder = (id) => {
  let items = [];
  for (let i = 0; i < faker.datatype.number({ min: 1, max: 10 }); i++) {
    items.push({
      productId: faker.datatype.number({
        min: 1,
        max: config.NUMBER_OF_PRODUCTS,
      }),
      quantity: faker.datatype.number({ min: 1, max: 10 }),
    });
  }

  return {
    id: id,

    userId: faker.datatype.number({ min: 1, max: config.NUMBER_OF_USERS }),

    items: items,

    parcelLocation: faker.address.nearbyGPSCoordinate([22.3193, 114.1694]),

    status: faker.datatype.number({ min: 0, max: 2 }), // 0: preparing, 1: shipping 2: fulfilled
  };
};

/**
 * Create a Product Object with fake data
 * @returns Product
 */
exports.createProduct = (id) => {
  let prices = [];
  for (let i = 0; i < 3; i++) {
    prices.push({
      tier: i,
      price: faker.commerce.price(),
    });
  }

  return {
    id: id,

    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    imageUrl: faker.image.image(),

    type: faker.commerce.department(),
    brand: faker.company.name(),
    popularity: faker.datatype.number({ min: 3, max: 5 }),

    prices: prices,
  };
};

/**
 * Create a Review Object with fake data
 * @returns Review
 */
exports.createReview = (id) => {
  return {
    id: id,

    userId: faker.datatype.number({ min: 1, max: config.NUMBER_OF_USERS }),
    productId: faker.datatype.number({
      min: 1,
      max: config.NUMBER_OF_PRODUCTS,
    }),

    message: faker.lorem.paragraph(),
    rating: faker.datatype.number({ min: 3, max: 5 }),
  };
};
