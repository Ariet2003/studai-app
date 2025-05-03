export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

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
  userId: string;
  user: User;
  price: Price;
  filePath: string;
  createdAt: string;
  updatedAt: string;
} 