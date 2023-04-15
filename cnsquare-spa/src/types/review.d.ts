type Review = {
  id: number;

  userId: number;
  productId: number;

  message: string;
  rating: number; // 0 - 5

  createdAt: string;
};
