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
  isFav: boolean;
  uuid?: string;
  key?: string;
  id?: number | string;
  description?: string;
  source?: object;
  author: string;
  title: string;
  content: string;
  publishedAt: Date;
  url: string;
  urlToImage: string;
  addedDate?: Date;
  articles?: any;
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

export interface Settings {
  registration: string | boolean;
  authors: string[];
  posts: string[];
  title: string;
  admin?: string;
}
export interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  personal: {
    age: number;
    city: string;
    disponibility: Date;
  };

  hobbies: string[];
}

export interface Post {
  id?: string;
  title: string;
  author: string;
  body: string;
  thumbs?: number;
  date?: Date;
  image?: string;
  indexImg?: string;
  userId?: string;
}
