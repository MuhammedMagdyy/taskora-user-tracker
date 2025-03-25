import nodemailer, { Transporter } from 'nodemailer';
import { logger } from '../utils';

type EmailData = { newUsers: number; totalUsers: number };

export class EmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: process.env.MAIL_SERVICE,
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: false,
      auth: {
        user: process.env.MAIL_AUTH_USER,
        pass: process.env.MAIL_AUTH_PASSWORD,
      },
      requireTLS: true,
    });
  }

  private async sendEmail(args: {
    subject: string;
    text: string;
    html: string;
  }) {
    try {
      await this.transporter.sendMail({
        from: `Taskora support <${process.env.FROM_EMAIL_USER}>`,
        to: process.env.TO_EMAIL_USER,
        subject: args.subject,
        text: args.text,
        html: args.html,
      });
    } catch (error) {
      logger.error(`Error sending email - ${error} ❌`);
      throw new Error('Error sending email. Please try again later...');
    }
  }

  async sendFancyEmail({ newUsers, totalUsers }: EmailData) {
    const mailOptions = {
      subject: 'New Users Alert! 🎉',
      text: `We’ve got ${newUsers} new users! Total users count: ${totalUsers}`,
      html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background: #f4f4f4; border-radius: 10px;">
        <h2 style="color: #4CAF50;">New Users Registered! 🚀</h2>
        <p>We’ve got <strong style="color: #1E90FF;">${newUsers} new users</strong> 🎉</p>
        <p>Total users count: <strong>${totalUsers}</strong></p>
      </div>`,
    };

    await this.sendEmail(mailOptions);
    logger.info(`Email sent successfully to ${process.env.TO_EMAIL_USER} ✅`);
  }
}

export const emailService = new EmailService();
