export default function forgotPasswordEmailTemplate(args: {
  name: string;
  confirmationCode: number;
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Coach Finder Password</title>
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
            background-color: #f9f9f9;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #ff4500;
            margin-bottom: 20px;
        }
        .confirmation-code-container {
            background-color: #eee;
            border: 2px solid #ff4500;
            border-radius: 8px;
            padding: 15px;
            margin: 25px 0;
            text-align: center;
        }
        .confirmation-code {
            font-size: 36px;
            font-weight: bold;
            color: #ff4500;
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
        <h1>Reset Your Coach Finder Password</h1>
        <p>Hello ${args.name},</p>
        <p>We received a request to reset your password for your Coach Finder account. If you didn't make this request, you can safely ignore this email.</p>
        <p>To reset your password, please use the following 4-digit confirmation code:</p>
        <div class="confirmation-code-container">
            <p class="confirmation-code">${args.confirmationCode}</p>
            <p class="code-instruction">Enter this code on the password reset page</p>
        </div>
        <p>This code will expire in 30 minutes for security reasons.</p>
        <p>If you have any questions or concerns, please don't hesitate to contact our support team.</p>
        <div class="footer">
            <p>Best regards,<br>Coach Finder Team</p>
        </div>
    </div>
</body>
</html>`;
}
