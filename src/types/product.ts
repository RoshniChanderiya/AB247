export interface Product {
  productRateId: string;
  tpaName: string;
  planName: string;
  planType: string;
  termMonth: number;
  termMile: number;
  classCode: string;
  retailPrice: number;
  deductAmt: number;
  planOptions?: null[] | null;
  planSurcharges?: null[] | null;
  display: Display;
}

export interface Display {
  productRateId: string;
  title: string;
  image: string;
  dlpProfit: number;
  price: string;
  bg: string;
  content: string;
  validFor?: string[] | null;
}
