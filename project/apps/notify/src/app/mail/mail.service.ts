import {PostInterface, SubscriberInterface} from '@project/shared/app-types';
import { Injectable } from '@nestjs/common';
import {EMAIL_ADD_SUBSCRIBER_SUBJECT, NEW_POSTS_NEWSLETTER} from './mail.const';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendNotifyNewSubscriber(subscriber: SubscriberInterface) {
    await this.mailerService.sendMail({
      to: subscriber.email,
      subject: EMAIL_ADD_SUBSCRIBER_SUBJECT,
      template: './add-subscriber',
      context: {
        user: `${subscriber.name}`,
        email: `${subscriber.email}`,
      }
    })
  }

  public async sendNewPostsNewsletter(
    recipients: SubscriberInterface[],
    posts: PostInterface[]
  ) {
    console.log(recipients);
    console.log(posts);
    await this.mailerService.sendMail({
      to: recipients.map((recipient) => recipient.email),
      subject: NEW_POSTS_NEWSLETTER,
      template: './post-newsletter',
      context: {
        posts: posts
      }
    })
  }
}
