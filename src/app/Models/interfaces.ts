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
