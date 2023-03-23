import { PostInterface } from '@project/shared/app-types';

export abstract class BlogPostEntity implements PostInterface {
  public _id?: string;
  public _authorId?: string;
  public _origAuthorId?: string;
  public creationDate?: string;
  public postDate?: string;
  public status?: string;
  public isReposted?: boolean;
  public tags?: string[];

  constructor(blogPost: PostInterface) {
    this._id = blogPost._id;
    this._authorId = blogPost._authorId;
    this._origAuthorId = blogPost._origAuthorId
    this.creationDate = blogPost.creationDate;
    this.postDate = blogPost.postDate;
    this.status = blogPost.status;
    this.isReposted = blogPost.isReposted;
    this.tags = blogPost.tags;
  }

  public toObject() {
    return {...this};
  }
}
