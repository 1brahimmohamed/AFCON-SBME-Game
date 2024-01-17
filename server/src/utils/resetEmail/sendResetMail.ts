import mailTemplate from './resetEmailTemplate';
import transporter from '../Email/nodemailerTransporter';


const sendResetMail = async (user: any, resetURL: string) =>{

  const {email} = user;

  const mailOptionsForUser = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Reset Your Password `,
    text: `Hi ${user.name},\n\n you have requested to reset your password. \n\n Please click on the link below to reset your password`,
    html: mailTemplate(user.email, user.name , resetURL)
  };


  try {
    const infoForUserMail = await transporter.sendMail(mailOptionsForUser);
    console.log('Message sent: %s', infoForUserMail.messageId);
  }catch (e) {
    console.log(e);
  }
}

export default sendResetMail;
