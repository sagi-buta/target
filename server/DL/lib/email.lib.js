require('dotenv').config();

const email_welcome = (data) => {
    const email = ``
    return email
}

const forgot_password = (data) => {
    const email = `${data.name},<br>
    You got this email because you requested to reset your password.<br>
    Please click the button below to reset your password.<br>
    <a href="http://localHost:7777/admins/resetpassword.html?token=${data.resetLinkToken}"><button style = "background-color:blue; color:white; cursor:pointer">Reset password</button></a>`
    return email;
}
const init_admin = (data) => {
    return `Hi ${data.name}<br>
  In order to activate your account you'll need to create a new password.<br>
  please click the button in order to do so.<br>
  <a href="http://localHost:7777/admins/password.html?token=${data.resetLinkToken}"><button style = "background-color:blue; color:white; cursor:pointer">Create initial password</button></a>`

}
const reset_password = (data) => {
    const email = ``
    return email;
}

exports.sendEmail = async(emailOptions) => {
    const transporter = require('../config/mail.config.js');
    try {
        let emailTransporter = await transporter.createTransporter();

        const result = await emailTransporter.sendMail(emailOptions);

    } catch (err) {
       return err;
    }

};

exports.getEmailTemplate = function(templateName, data) {
    switch (templateName) {
        case 'email_welcome':
            return email_welcome(data);
            break;
        case 'forgot_password':
            return forgot_password(data);
            break;
        case 'reset_password':
            return reset_password(data);
            break;
        case 'init_admin':
            return init_admin(data);
            break;
        default:
            return null;
    }
}