"use server";
import { Resend } from "resend";
import { auth } from "@clerk/nextjs";

const resend = new Resend(process.env.RESEND_API_KEY);

// Define the type for the template rendering function


export async function sendEmail(
    email: string, 
    fromEmail: string,
    subject: string,
    template: React.FC<any>,
    templateData: any, 
    ): Promise<any> { // Define the return type of the function if known
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("User not authenticated");
    }

    console.log("Sending email to:", email);
    const emailContent = template(templateData);
    const data = resend.emails.send({
      from: fromEmail,
      to: email,
      subject: subject,
      react: emailContent
    });
    console.log("Email sent successfully:", data);
    return data;
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
}
