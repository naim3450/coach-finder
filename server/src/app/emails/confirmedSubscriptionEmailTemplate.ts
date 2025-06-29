import getGreetingBasedOnTime from "../../utils/generate-greeting";

export default function confirmedSubscriptionEmailTemplate(args: {
  name: string;
  packageName: string;
  amount: string;
  billingPeriod: string;
  transactionId: string;
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Subscription Confirmed - Coach Finder</title>
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
        .subscription-details {
            background-color: #f0f8ff;
            border: 2px solid #4a90e2;
            border-radius: 8px;
            padding: 20px;
            margin: 25px 0;
        }
        .package-name {
            font-size: 24px;
            font-weight: bold;
            color: #4a90e2;
            margin-bottom: 10px;
        }
        .amount {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .transaction-id {
            font-size: 16px;
            color: #666666;
            margin-top: 15px;
            padding-top: 15px;
            border-top: 1px solid #dddddd;
        }
        ul {
            padding-left: 20px;
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
        <h1>Subscription Confirmed!</h1>
        <p>Hello ${args.name}, ${getGreetingBasedOnTime()}</p>
        <p>Thank you for subscribing to Coach Finder. Your subscription has been successfully processed, and we're excited to have you on board!</p>
        
        <div class="subscription-details">
            <p class="package-name">${args.packageName}</p>
            <p class="amount">Amount: ${args.amount} / ${args.billingPeriod}</p>
            <p class="transaction-id">Transaction ID: ${args.transactionId}</p>
        </div>
        
        <p>Your subscription is now active, and you have full access to all the features included in your package. You can start connecting with coaches and making the most of our platform right away.</p>
        
        <p>If you have any questions about your subscription or need any assistance, please don't hesitate to reach out to our support team. Be sure to reference your Transaction ID when contacting us.</p>
        
        <div class="footer">
            <p>Thank you for choosing Coach Finder. We look forward to being a part of your personal growth journey.</p>
            <p>Best regards,<br>The Coach Finder Team</p>
        </div>
    </div>
</body>
</html>`;
}
