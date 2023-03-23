export interface PostInterface {
  _id?: string;
  _authorId?: string;
  creationDate: string;
  postDate: string;
  status: string; // posted/markup
  isReposted: boolean;
  origAuthorId?: string;
}
