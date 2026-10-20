const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);

const emailTemplate = (otp, name = "") => {
  const safeName = name ? escapeHtml(name) : "";
  const safeOtp = escapeHtml(otp);

  return `
  <!doctype html>
  <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="color-scheme" content="light">
      <title>تأكيد البريد الإلكتروني</title>
    </head>
    <body style="margin:0;padding:0;background-color:#f1f5f9;font-family:Arial,Tahoma,sans-serif;color:#172033;direction:rtl">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f1f5f9;padding:36px 12px">
        <tr><td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:560px;background-color:#ffffff;border-radius:20px;overflow:hidden">
            <tr><td style="height:8px;background-color:#0f766e;font-size:0;line-height:0">&nbsp;</td></tr>
            <tr><td align="center" style="padding:36px 32px 12px">
              <div style="width:58px;height:58px;line-height:58px;border-radius:18px;background-color:#ccfbf1;color:#0f766e;font-size:27px;font-weight:bold">S</div>
              <p style="margin:14px 0 0;color:#0f766e;font-size:13px;font-weight:bold;letter-spacing:1px">SARaha</p>
            </td></tr>
            <tr><td align="center" style="padding:12px 32px 32px">
              <h1 style="margin:0 0 14px;font-size:25px;line-height:1.5;color:#172033">أهلاً${safeName ? ` ${safeName}` : ""}، أكّد بريدك الإلكتروني</h1>
              <p style="margin:0;color:#64748b;font-size:15px;line-height:1.9">استخدم رمز التحقق التالي لإكمال إنشاء حسابك. لأمانك، لا تشارك الرمز مع أي شخص.</p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:26px auto 20px;background-color:#f0fdfa;border:1px solid #99f6e4;border-radius:14px">
                <tr><td dir="ltr" align="center" style="padding:18px 30px;color:#0f766e;font-family:Arial,sans-serif;font-size:34px;font-weight:bold;letter-spacing:10px">${safeOtp}</td></tr>
              </table>
              <p style="margin:0;color:#64748b;font-size:14px;line-height:1.8">صلاحية الرمز <strong style="color:#334155">5 دقائق</strong> فقط.</p>
              <p style="margin:18px 0 0;color:#94a3b8;font-size:13px;line-height:1.8">إذا لم تطلب هذا الرمز، يمكنك تجاهل هذه الرسالة بأمان.</p>
            </td></tr>
            <tr><td align="center" style="padding:18px 24px;background-color:#f8fafc;border-top:1px solid #e2e8f0;color:#94a3b8;font-size:12px;line-height:1.8">رسالة تلقائية من Saraha، يُرجى عدم الرد عليها.</td></tr>
          </table>
        </td></tr>
      </table>
    </body>
  </html>`;
};

export default emailTemplate;
