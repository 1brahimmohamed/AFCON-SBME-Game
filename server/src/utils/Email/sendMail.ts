import mailTemplate from './emialTemplate';
import transporter from './nodemailerTransporter';


const sendEmailHandler = async (user: any) =>{

  const {email} = user;

  const mailOptionsForUser = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Thank your for Register | SBME AFCON 2024`,
    text: `Hi ${user.name},\n\nThank you for joining the fun by SBME 2024`,
    html: mailTemplate(user.name, user.email, user.team)
  };


  try {
    const infoForUserMail = await transporter.sendMail(mailOptionsForUser);
    console.log('Message sent: %s', infoForUserMail.messageId);
  }catch (e) {
    console.log(e);
  }
}

export default sendEmailHandler;
