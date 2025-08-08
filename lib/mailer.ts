
import nodemailer from 'nodemailer'

export interface EmailOptions {
  to: string
  from?: string
  replyTo?: string
  subject: string
  html?: string
  text?: string
}

class Mailer {
  private transporter: nodemailer.Transporter

  constructor() {
    this.transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  }

  async sendEmail(options: EmailOptions): Promise<void> {
    const fromEmail = process.env.FROM_EMAIL || process.env.SMTP_USER
    
    if (!fromEmail) {
      throw new Error('FROM_EMAIL or SMTP_USER environment variable is required')
    }

    const mailOptions = {
      from: options.from || `"Divorce Compass" <${fromEmail}>`,
      to: options.to,
      replyTo: options.replyTo,
      subject: options.subject,
      html: options.html,
      text: options.text,
    }

    await this.transporter.sendMail(mailOptions)
  }

  async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify()
      return true
    } catch (error) {
      console.error('SMTP connection verification failed:', error)
      return false
    }
  }
}

export const mailer = new Mailer()
