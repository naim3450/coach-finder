export default function adminSubscriptionNotificationTemplate(args: {
  subscriberEmail: string;
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Subscription Notification - Coach Finder</title>
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
            border-radius: 5px;
            padding: 20px;
            border: 1px solid #dddddd;
        }
        h1 {
            color: #4a90e2;
            margin-bottom: 20px;
        }
        .subscriber-email {
            font-size: 18px;
            font-weight: bold;
            background-color: #ffffff;
            border: 1px solid #4a90e2;
            border-radius: 4px;
            padding: 10px;
            margin-top: 10px;
        }
        .footer {
            margin-top: 20px;
            font-size: 14px;
            color: #666666;
            border-top: 1px solid #dddddd;
            padding-top: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>New Subscription Alert</h1>
        <p>A new user has subscribed to Coach Finder.</p>
        <p>Subscriber's email:</p>
        <div class="subscriber-email">
            ${args.subscriberEmail}
        </div>
        <div class="footer">
            <p>This is an automated notification from the Coach Finder system.</p>
        </div>
    </div>
</body>
</html>`;
}
