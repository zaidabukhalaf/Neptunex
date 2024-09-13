const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async function (event, context) {
  const { name, email, message } = JSON.parse(event.body);

  const msg = {
    to: 'your-email@example.com', // Your email (the recipient)
    from: 'your-sendgrid-verified-email@example.com', // Must be verified on SendGrid
    subject: `New Contact Form Submission from ${name}`,
    text: `Email: ${email}\nMessage: ${message}`,
  };

  try {
    await sgMail.send(msg);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully!' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send the email' }),
    };
  }
};
