export interface Price {
  id: string;
  workType: string;
  pageRange: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ReadyWork {
  id: string;
  title: string;
  type: string;
  pageCount: number;
  author: string;
  price: Price;
  filePath: string;
  createdAt: string;
  updatedAt: string;
} 