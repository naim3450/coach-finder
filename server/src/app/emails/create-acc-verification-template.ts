export function createAccVerificationEmailTemplate(args: {
  greeting: string;
  verificationCode: number;
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Coach Finder Account</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .container {
            background-color: #ffffff;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #4a90e2;
            margin-bottom: 20px;
        }
        .confirmation-code-container {
            background-color: #f0f8ff;
            border: 2px solid #4a90e2;
            border-radius: 8px;
            padding: 15px;
            margin: 25px 0;
            text-align: center;
        }
        .confirmation-code {
            font-size: 36px;
            font-weight: bold;
            color: #4a90e2;
            letter-spacing: 8px;
            margin: 0;
        }
        .code-instruction {
            font-size: 14px;
            color: #666666;
            margin-top: 10px;
        }
        .footer {
            margin-top: 30px;
            font-size: 14px;
            color: #666666;
            border-top: 1px solid #dddddd;
            padding-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to Coach Finder!</h1>
        <p>Hello👋 ${args.greeting}, </p>
        <p>Thank you for creating an account with Coach Finder. We're excited to have you on board! To complete your registration, please verify your email address.</p>
        <p>Your account verification code is:</p>
        <div class="confirmation-code-container">
            <p class="confirmation-code">${args.verificationCode}</p>
            <p class="code-instruction">Enter this code on the account verification page</p>
        </div>
        <p>This code will expire in 30 minutes for security reasons. If you didn't create an account with Coach Finder, please ignore this email.</p>
        <div class="footer">
            <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
            <p>Best regards,<br>The Coach Finder Team</p>
        </div>
    </div>
</body>
</html>`;
}
