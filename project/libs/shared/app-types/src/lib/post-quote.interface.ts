import { PostInterface } from './post.interface';

export interface PostQuoteInterface extends PostInterface {
  quote: string;
  author: string;
}
