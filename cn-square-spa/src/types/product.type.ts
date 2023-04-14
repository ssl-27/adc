type Product = {
  id: number;

  name: string;
  description: string;
  imageUrl: string;

  type: string;
  brand: string;
  popularity: number; // 0 - 5

  prices: [
    {
      tier: number;
      price: number;
    }
  ];
};
