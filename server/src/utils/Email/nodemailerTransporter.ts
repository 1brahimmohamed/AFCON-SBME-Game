import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "embs@ieeecusb.org",
    pass: "udaz tvzj hhrq gyhq"
  }
});

export default transporter;
