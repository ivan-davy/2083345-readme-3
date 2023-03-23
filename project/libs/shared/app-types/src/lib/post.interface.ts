export interface PostInterface {
  _id?: string;
  _authorId?: string;
  _origAuthorId?: string;
  creationDate?: string;
  postDate?: string;
  status?: string; // posted/markup
  isReposted?: boolean;
  tags?: string[];
}
