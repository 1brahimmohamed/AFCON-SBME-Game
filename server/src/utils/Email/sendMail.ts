import mailTemplate from './emialTemplate';
import transporter from './nodemailerTransporter';


const sendEmailHandler = async (user: any) =>{

  const {email} = user;

  const mailOptionsForUser = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Thank your for Registering in SBME AFCON 2024 Game`,
    text: `Hi ${user.name},\n\nThank you for joining the fun by SBME 2024`,
    html: mailTemplate(user.email, user.name , user.team, user.class)
  };


  try {
    const infoForUserMail = await transporter.sendMail(mailOptionsForUser);
    console.log('Message sent: %s', infoForUserMail.messageId);
  }catch (e) {
    console.log(e);
  }
}

export default sendEmailHandler;
