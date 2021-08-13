import { EmailAddress } from './emailAddress';

export interface EmailMessage {
  toAddresses: EmailAddress[];
  fromAddresses: EmailAddress[];
  subject: string;
  content: string;
}
