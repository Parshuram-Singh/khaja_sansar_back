import nodemailer from "nodemailer";

class NodeMailSender {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || "gmail",
      auth: {
        user: process.env.EMAIL_USER || "singhrathourpratik@gmail.com",
        pass: process.env.EMAIL_PASS || "kcqo ypus uygj yvrr", // Use environment variables in production
      },
    });
  }

  async send(from, to, subject, text = "", html = "") {
    if (!html && !text) {
      throw new Error("Email must have either text or HTML content");
    }

    const options = {
      from,
      to,
      subject,
      text, // Plain text fallback
      html, // HTML content for rich formatting
    };

    try {
      const info = await this.transporter.sendMail(options);
      console.log("Mail sent successfully:", info.response);
      return {
        type: true,
        message: "Email sent successfully",
        info,
      };
    } catch (error) {
      console.error("Failed to send mail:", error.message);
      return {
        type: false,
        message: "Failed to send the email",
        error: error.message,
      };
    }
  }
}

const nodeMailer = new NodeMailSender();

export default nodeMailer;