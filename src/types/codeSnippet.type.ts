export interface CodeSnippet {
  _id: string;
  title: string;
  description: string;
  code: string;
  language: string;
  owner: string;
  date: Date;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
