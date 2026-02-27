const { Resend } = require('resend');
const { resendApiKey, emailFrom } = require('../config/env');

const getResendClient = () => {
  if (!resendApiKey) {
    throw new Error('RESEND_API_KEY não configurada.');
  }

  return new Resend(resendApiKey);
};

const sendVerificationEmail = async ({ to, name, verificationUrl }) => {
  if (!emailFrom) {
    throw new Error('EMAIL_FROM não configurado.');
  }

  const resend = getResendClient();

  await resend.emails.send({
    from: emailFrom,
    to,
    subject: 'Confirme seu e-mail no SkinTrack',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
        <h2>Olá, ${name} 👋</h2>
        <p>Seu cadastro no SkinTrack está quase pronto.</p>
        <p>Clique no botão abaixo para verificar seu e-mail e ativar sua conta:</p>
        <p>
          <a href="${verificationUrl}" style="display: inline-block; padding: 10px 16px; border-radius: 8px; background: #7c3aed; color: #fff; text-decoration: none; font-weight: 600;">
            Verificar e-mail
          </a>
        </p>
        <p>Se preferir, copie e cole este link no navegador:</p>
        <p>${verificationUrl}</p>
        <p>Este link expira em 24 horas.</p>
      </div>
    `
  });
};

module.exports = {
  sendVerificationEmail
};
