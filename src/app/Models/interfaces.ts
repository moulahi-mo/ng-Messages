export interface Message {
  id?: string;
  name: string;
  amount: number;
  date?: Date;
}
export interface Login {
  email: string;
  password: string;
}
export type News = {
  description?: string;
  source?: object;
  author: string;
  title: string;
  content: string;
  publishedAt: Date;
  url: string;
  urlToImage: string;
};

export interface Authors {
  id: number | string;
  name: string;
  username: string;
  email: string;
  status?: string;
  isActive?: boolean;
  joind?: Date;
  created?: Date;
  address: {
    street: string;
    suite?: string;
    city: string;
    zipcode?: string;
    geo?: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company?: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}
