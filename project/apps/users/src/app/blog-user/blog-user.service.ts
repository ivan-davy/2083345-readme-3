import {Injectable} from '@nestjs/common';
import {BlogUserRepository} from './blog-user.repository';
import {SubscribeToUserQuery} from './query/subscribe-to-user.query';

@Injectable()
export class BlogUserService {
  constructor(
    private readonly blogUserRepository: BlogUserRepository,
  ) {}

  public async getUser(id: string) {
    return this.blogUserRepository.findById(id);
  }

  public async subscribe(
    userId: string,
    currentUserId: string,
    query: SubscribeToUserQuery
  ) {
    return this.blogUserRepository.subscribe(
      userId,
      currentUserId,
      query.action
    )
  }
}
