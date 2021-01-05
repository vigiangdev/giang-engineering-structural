const sgMail = require("@sendgrid/mail");

exports.sendEmail = async (req, res, next) => {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: process.env.SENDGRID_EMAIL,
      from: process.env.SENDGRID_EMAIL,
      subject: req.body.subject || `Message from ${req.body.name}`,
      text: req.body.text,
      html: `<p>${req.body.name}</p><p>${req.body.phone}</p><p>${req.body.email}</p><p>${req.body.text}</p>`,
    };

    await sgMail.send(msg);

    res.status(200).json({
      success: true,
      message: "Email has been sent!",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "There was an error sending the email. Please try again.",
    });
  }
};
