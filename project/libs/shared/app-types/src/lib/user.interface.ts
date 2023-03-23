export interface UserInterface {
  _id?: string;
  email: string;
  name: string;
  avatar: string;
  passwordHash: string;
  registeredOn: string;
  postsQty: number;
  subscribersQty: number;
}
