type Order = {
  id: number;

  userId: number;

  items: {
    productId: number;
    quantity: number;
  };

  parcelLocation: [string, string];
  price: number;
  date: string;
  orderCompleted: boolean;
  table: number;
  orderId: string;
  ticketId: string;
  createdAt: string;

  status: number; // 0: preparing, 1: shipping 2: fulfilled
};
