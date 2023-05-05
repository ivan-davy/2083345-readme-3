import {CrudRepositoryInterface} from '@project/util/util-types';
import {Injectable} from '@nestjs/common';
import {BlogUserEntity} from './blog-user.entity';
import {UserInterface} from '@project/shared/app-types';
import {BlogUserModel} from './blog-user.model';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {SubscribeToUserQueryActionEnum} from './query/subscribe-to-user.query';

@Injectable()
export class BlogUserRepository implements CrudRepositoryInterface<BlogUserEntity, string, UserInterface> {
  constructor(
    @InjectModel(BlogUserModel.name) private readonly blogUserModel: Model<BlogUserModel>) {
  }

  public async create(item: BlogUserEntity): Promise<UserInterface> {
    const newBlogUser = new this.blogUserModel({...item});
    return newBlogUser.save();
  }

  public async modifySubscriptions(id: string): Promise<UserInterface> {
    return this.blogUserModel.findByIdAndUpdate(id, {subscribedTo: [id.toString()]}, {new: true})
  }

  public async destroy(id: string): Promise<void> {
    this.blogUserModel.deleteOne({id});
  }

  public async findById(id: string): Promise<UserInterface | null> {
    return this.blogUserModel
      .findOne({'_id': id})
      .exec();
  }

  public async findByEmail(email: string): Promise<UserInterface | null> {
    return this.blogUserModel
      .findOne({email})
      .exec();
  }

  public async update(id: string, item: BlogUserEntity): Promise<UserInterface> {
    return this.blogUserModel
      .findByIdAndUpdate(id, item.toObject(), {new: true})
      .exec();
  }

  public async getSubscribersByUserId(userId: string) {
    return await this.blogUserModel
      .aggregate([
        {
          $match: {subscribedTo: {$elemMatch: {$gte: userId}}}
        }
      ]).exec();
  }

  public async subscribe(
    userId: string,
    currentUserId: string,
    action: number
  ): Promise<string[]> {
    let currentUser: UserInterface = await this.findById(currentUserId);
    if (action == SubscribeToUserQueryActionEnum.Sub) {
      currentUser.subscribedTo.push(userId);
    } else {
      currentUser.subscribedTo = currentUser.subscribedTo.filter((item) => item !== userId || item === currentUserId);
    }
    currentUser.subscribedTo = [...(new Set(currentUser.subscribedTo))]
    return (await this.update(currentUserId, new BlogUserEntity(currentUser))).subscribedTo;
  }
}
