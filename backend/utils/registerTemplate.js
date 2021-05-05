const registerTemplate = ({ name, lastname, verificationCode }) =>
  `
    <html>
    <head></head>
    <body>
        <h3>¡Hola ${name}, ${lastname} Gracias por registrarte!</h3>
        <a ref="${process.env.DEV_URL}/auth/verificationCode/${verificationCode}">Click aca para verificar la cuenta" </a>
    </body>
    </html>
    `;
