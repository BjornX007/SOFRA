const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

// Set up body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (CSS, JS, etc.)
app.use(express.static('public'));

// Render the booking form (static HTML)
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle form submission
app.post('/submit-booking', (req, res) => {
    const { name, email, phone, date, time, people, message } = req.body;

    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'bjorniupwork@gmail.com', // Replace with your email
            pass: 'bjorni2005A'   // Replace with your email password
        }
    });

    // Compose email
    const mailOptions = {
        from: 'bjorniupwork@gmail.com',
        to: email, // Send confirmation to user's email
        subject: 'Buchungsbestätigung',
        text: `Hallo ${name},\n\nDanke für Ihre Buchung!\n\nDetails Ihrer Buchung:\n\nDatum: ${date}\nZeit: ${time}\nPersonen: ${people}\nTelefon: ${phone}\n\nIhre Nachricht:\n${message}\n\nWir freuen uns auf Ihren Besuch!\n\nMit freundlichen Grüßen,\nIhr Restaurant`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('Fehler beim Senden der E-Mail.');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Buchung erfolgreich! Eine Bestätigungs-E-Mail wurde gesendet.');
        }
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
