import {PostInterface, PostStatusEnum, PostTypeEnum} from '@project/shared/app-types';

export abstract class BlogPostEntity implements PostInterface {
  public _id?: number;
  public _authorId?: string;
  public _origAuthorId?: string;
  public creationDate: string;
  public postedDate: string;
  public commentsQty: number;
  public type: PostTypeEnum;
  public status: PostStatusEnum;
  public isReposted: boolean;
  public tags: string[];

  constructor(blogPost: PostInterface) {
    this._id = blogPost._id;
    this._authorId = blogPost._authorId;
    this._origAuthorId = blogPost._origAuthorId
    this.creationDate = blogPost.creationDate;
    this.postedDate = blogPost.postedDate;
    this.commentsQty = blogPost.commentsQty;
    this.type = blogPost.type;
    this.status = blogPost.status;
    this.isReposted = blogPost.isReposted;
    this.tags = blogPost.tags;
  }

  public toObject() {
    return {...this};
  }
}
