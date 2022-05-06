import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "6571a603874c1f",
      pass: "deb15cbe71c4c5"
    }
});

export class NodeMailerAdapter implements MailAdapter{
    async sendMail({ subject, body }: SendMailData) {
        
        await transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'Mateus Santos <batata@gmail.com>',
            subject,
            html: body,
        })
    };
}