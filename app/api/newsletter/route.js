import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json(
                { success: false, message: "Email is required." },
                { status: 400 }
            );
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: `"Newsletter" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: "New Newsletter Subscriber",
            html: `
                <div style="font-family:Arial;padding:20px">
                    <h2>New Newsletter Subscription</h2>

                    <p><strong>Email:</strong> ${email}</p>

                    <p>A new user subscribed to your newsletter.</p>
                </div>
            `,
        });

        return NextResponse.json({
            success: true,
            message: "Subscribed successfully!",
        });

    } catch (error) {
        console.log(error);

        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong.",
            },
            {
                status: 500,
            }
        );
    }
}