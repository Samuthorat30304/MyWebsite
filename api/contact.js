// api/contact.js

export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method Not Allowed"
        });
    }

    try {

        const { name, email, mobile, message } = req.body;

        const smsText =
`New Website Inquiry

Name: ${name}
Email: ${email}
Mobile: ${mobile}

Message:
${message}`;

        const response = await fetch(
            "https://control.msg91.com/api/v5/flow/",
            {
                method: "POST",
                headers: {
                    "authkey": process.env.MSG91_AUTH_KEY,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    template_id: process.env.MSG91_TEMPLATE_ID,
                    recipients: [
                        {
                            mobiles: "91YOUR_MOBILE_NUMBER",
                            VAR1: name,
                            VAR2: mobile,
                            VAR3: message
                        }
                    ]
                })
            }
        );

        const result = await response.json();

        return res.status(200).json({
            success: true,
            result
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "SMS sending failed"
        });

    }
}