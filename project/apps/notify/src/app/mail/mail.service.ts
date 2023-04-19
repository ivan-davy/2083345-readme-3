import { SubscriberInterface } from '@project/shared/app-types';
import { Injectable } from '@nestjs/common';
import { EMAIL_ADD_SUBSCRIBER_SUBJECT } from './mail.const';
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
}
