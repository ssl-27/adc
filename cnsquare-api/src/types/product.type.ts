type Product = {
  id: number;

  name: string;
  description: string;
  imageUrl: string;

  brand: string;
  popularity: number; // 0 - 5

  prices: [
    {
      tier: number;
      price: number;
    }
  ];

  type: string;
  feature: string;

  color: string;
  size: string;

  outOfStock: boolean;
  freeShipping: boolean;
};
