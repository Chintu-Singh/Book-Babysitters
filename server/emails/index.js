const sgMail = require('@sendgrid/mail');
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
// const { cancellationEmail } = require('./cancellationEmail');
const { passwordEmail } = require('./forgotPassword.js');
// const { welcomeEmail } = require('./welcomeEmail');
sgMail.setApiKey(SENDGRID_API_KEY);

const WelcomeEmail = (email, welcomeEmail) => {
  sgMail
    .send({
      to: email,
      from: `${process.env.FROM_EMAIL}`,
      subject: 'Welcome to the WoW family ✨.',
      html: welcomeEmail,
      template_id: 'd-a1f050803e924917ae14271b11d39b84'
    })
    .catch((error) => console.log(error.response.body.errors));
};

const CancellationEmail = (email, cancellationEmail) => {
  sgMail
    .send({
      to: email,
      from: `${process.env.FROM_EMAIL}`,
      subject: 'Sorry to see you go. 🥺',
      html: cancellationEmail,
      template_id: 'd-228080a75e204bb0b14ae417ff9284ab'
    })
    .catch((error) => console.log(error.response.body.errors));
};

const ForgotPassword = (email, token) => {
  sgMail
    .send({
      to: email,
      from: `${process.env.FROM_EMAIL}`,
      subject: 'Reset Password.',
      html: passwordEmail(token)
      // html: `<a target="_blank" rel="noopener noreferrer" href="${process.env.APP_URL}/password/${token}">Reset Password</a>`,
      // template_id: 'd-aeb95daafbec49e1baee25e813252b89'
    })
    .catch((error) => console.log(error.response.body.errors));
};

const UserEmail = (userID, name, subject, message, toEmail) => {
  sgMail
    .send({
      to: toEmail,
      from: `${process.env.FROM_EMAIL}`,
      subject: `From WoW: ${subject}`,
      html: `
        <div style="font-family: sans-serif">
          <h3 style="border-bottom: 1px solid black; padding-bottom: 10px; margin-bottom: 20px;">
            <a target="_blank" rel="noopener noreferrer" href="${process.env.URL}/userprofile/${userID}">${name}</a>
            from <a href="${process.env.URL}" target="_blank" rel="noopener noreferrer">WoW</a> has sent you a message!
          </h3>
          <h4>${subject}</h4>
          <div style="white-space: pre-wrap">${message}</div>
        </div>
      `
    })
    .catch((error) => console.log(error));
};

const PetEmail = (subject, message, toEmail, name, pet, fromID) => {
  sgMail
    .send({
      to: toEmail,
      from: `${process.env.FROM_EMAIL}`,
      subject: `From WoW: ${pet.name}'s Information`,
      html: `
      <div style="font-family: sans-serif">
      <h2 style="border-bottom: 3px solid rgb(53, 87, 167); padding-bottom: 10px; margin-bottom: 20px;">
          Hello!
      </h2>
      <p>
          <a href="${process.env.URL}/userprofile/${fromID}" target="_blank" rel="noopener noreferrer">
              ${name}
          </a>
          has sent you a message! They want you to have
          <a target="_blank" rel="noopener noreferrer" href="${process.env.URL}/petprofile/${pet._id}">
              ${pet.name}</a>'s
          information from
          <a href="${process.env.URL}" target="_blank" rel="noopener noreferrer">WoW</a>!
      </p> 
      <h4>${subject}</h4>
      <p style="white-space: pre-wrap; border-bottom: 3px solid rgb(53, 87, 167); padding-bottom: 10px; margin: 0 0 20px;">
          ${message}
      </p>
      <h4>Description:</h4>
      <p style="white-space: pre-wrap; padding-bottom: 10px; margin: 0 0 20px;">${pet.description}</p>
      <hr/>
      <h4>Emergency Info:</h4>
      <p style=" white-space: pre-wrap; padding-bottom: 10px; margin: 0 0 20px;">${pet.emergency}</p>
      <hr/>
      <h4>Medical Info:</h4>
      <p style="white-space: pre-wrap; padding-bottom: 10px; margin: 0 0 20px;">${pet.medical}</p>
      <hr/>
      <h4>Feeding Instructions:</h4>
      <p style=" white-space: pre-wrap; padding-bottom: 10px; margin: 0 0 20px;">${pet.feeding}</p>
      <hr/>
      <h4>Exercise:</h4>
      <p style="white-space: pre-wrap; padding-bottom: 10px; margin: 0 0 20px;">${pet.exercise}</p>
      <hr/>
      <h4>Cleaning Instructions:</h4>
      <p style=" white-space: pre-wrap; padding-bottom: 10px; margin: 0 0 20px;">${pet.cleaning}</p>
      <hr/>
      <h4>Exercise:</h4>
      <p style="white-space: pre-wrap; padding-bottom: 10px; margin: 0 0 20px;">${pet.exercise}</p>
      <hr/>
      <h4 >Additional Info:</h4>
      <p style=" white-space: pre-wrap; padding-bottom: 10px; margin: 0 0 20px;">${pet.additional}</p>
      <hr/>
      <h3>For more information, check out <a target="_blank" rel="noopener noreferrer"
      href="${process.env.URL}/petprofile/${pet._id}">${pet.name}</a>'s profile on <a href="${process.env.URL}" target="_blank"
      rel="noopener noreferrer">WoW</a>!
      </h3>
  </div>`
    })
    .catch((error) => console.log(error));
};

module.exports = {
  WelcomeEmail,
  CancellationEmail,
  ForgotPassword,
  UserEmail,
  PetEmail
};
