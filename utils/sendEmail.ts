const sendEmail = async (email: string, subject: string, message: string) => {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, subject, message }),
  });

  return res.json();
};

export default sendEmail;
