type Order = {
  id: number;

  userId: number;

  items: {
    productId: number;
    quantity: number;
  };

  parcelLocation: [string, string];

  status: number; // 0: preparing, 1: shipping 2: fulfilled
};
