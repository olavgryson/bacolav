import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Ongeldig e-mailadres" }, { status: 400 });
    }

    const apiKey = process.env.BREVO_API_KEY;
    const toEmail = process.env.NOTIFICATION_EMAIL;

    if (!apiKey || !toEmail) {
      console.error("Missing Brevo configuration (BREVO_API_KEY or NOTIFICATION_EMAIL)");
      return NextResponse.json({ error: "Configuratiefout op de server." }, { status: 500 });
    }

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Bacolav Website", email: toEmail }, // Using toEmail as sender often works if it's verified
        to: [{ email: toEmail }],
        subject: "Nieuwe Pre-order voor Bacolav!",
        htmlContent: `
          <html>
            <body>
              <h1>Nieuwe Pre-order Ontvangen</h1>
              <p>Er is een nieuwe pre-order geplaatst op de website.</p>
              <p><strong>E-mailadres:</strong> ${email}</p>
              <p>Datum: ${new Date().toLocaleString('nl-NL')}</p>
            </body>
          </html>
        `,
      }),
    });

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      const errorData = await response.json();
      console.error("Brevo API error:", errorData);
      return NextResponse.json({ error: "Fout bij het verzenden van de notificatie." }, { status: 500 });
    }
  } catch (error) {
    console.error("Pre-order API error details:", {
      message: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.json({ error: "Interne serverfout" }, { status: 500 });
  }
}
