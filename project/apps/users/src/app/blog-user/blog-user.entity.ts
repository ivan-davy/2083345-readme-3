import { UserInterface } from '@project/shared/app-types';

export class BlogUserEntity implements UserInterface {
  public _id?: string;
  public email: string;
  public name: string;
  public avatar: string;
  public passwordHash: string;
  public registrationDate: string;
  public postsQty: number;
  public subscribersQty: number;

  constructor(blogUser: UserInterface) {
    this.fillEntity(blogUser);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(blogUser: UserInterface) {
    this._id = blogUser._id;
    this.email = blogUser.email;
    this.avatar = blogUser.avatar;
    this.name = blogUser.name;
    this.passwordHash = blogUser.passwordHash;
    this.registrationDate = blogUser.registrationDate;
    this.postsQty = blogUser.postsQty;
    this.subscribersQty = blogUser.subscribersQty;
  }
}
