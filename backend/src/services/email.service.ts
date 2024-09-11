import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

export default class EmailService {
    static async sendVerifyEmail(email: string, token: string) {
        const EMAIL_SERVICE_USER = process.env.EMAIL_SERVICE_USER
        const EMAIL_SERVICE_PASSWORD = process.env.EMAIL_SERVICE_PASSWORD

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: EMAIL_SERVICE_USER,
                pass: EMAIL_SERVICE_PASSWORD
            }
        })

        //transporter.sendMail({})

        // TDO: Need to send an email to the frontend/email-verify, where I would send it to the backend
    }
}