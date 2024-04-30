type Order = {
  id: number;

  userId: number;

  items: {
    productId: number;
    quantity: number;
  };

  cost: number;
  revenue: number;
  date: string;
  orderCompleted: boolean;
  table: number;
  orderId: string;
  ticketId: string;

  parcelLocation: [string, string];

  status: number; // 0: preparing, 1: shipping 2: fulfilled
};
