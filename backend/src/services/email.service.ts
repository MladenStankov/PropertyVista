import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { User } from '../database/models/user.model'

dotenv.config()

export default class EmailService {
    async sendEmailVerification(email: string, token: string) {
        const EMAIL_SERVICE_USER = process.env.EMAIL_SERVICE_USER
        const EMAIL_SERVICE_PASSWORD = process.env.EMAIL_SERVICE_PASSWORD

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: EMAIL_SERVICE_USER,
                pass: EMAIL_SERVICE_PASSWORD
            }
        })

        transporter.sendMail({
            from: EMAIL_SERVICE_USER,
            to: email,
            subject: 'Verify your email',
            html: `<h1>Click the link: http://localhost:5173/verify-email/${token}<h1>`
        })
    }
}