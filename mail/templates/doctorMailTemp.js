exports.appointmentNotificationEmail = (
  firstName,
  lastName,
  patientName,
  patientEmail,
  appointmentDate,
  message
) => {
  return `<!DOCTYPE html>
        <html>
        
        <head>
            <meta charset="UTF-8">
            <title>New Appointment Notification</title>
            <style>
                body {
                    background-color: #ffffff;
                    font-family: Arial, sans-serif;
                    font-size: 16px;
                    line-height: 1.4;
                    color: #333333;
                    margin: 0;
                    padding: 0;
                }
        
        
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    text-align: center;
                }
        
                .logo {
                    max-width: 200px;
                    margin-bottom: 20px;
                }
        
                .message {
                    font-size: 18px;
                    font-weight: bold;
                    margin-bottom: 20px;
                }
        
                .body {
                    font-size: 16px;
                    margin-bottom: 20px;
                }
        
                .cta {
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #FFD60A;
                    color: #000000;
                    text-decoration: none;
                    border-radius: 5px;
                    font-size: 16px;
                    font-weight: bold;
                    margin-top: 20px;
                }
        
                .support {
                    font-size: 14px;
                    color: #999999;
                    margin-top: 20px;
                }
        
                .highlight {
                    font-weight: bold;
                }
            </style>
        
        </head>
        
        <body>
            <div class="container">
                <div class="message">New Appointment Notification</div>
                <div class="body">
                    <p>Dear Dr. ${firstName} ${lastName},</p>
                    <p>You have a new appointment scheduled:</p>
                    <p>Patient Name: ${patientName}</p>
                    <p>Patient Email: ${patientEmail}</p>
                    <p>Appointment Date: ${appointmentDate}</p>
                    <p>Message by Patient : ${message}</p>
                    <p>Please be prepared for the appointment.</p>
                </div>
                <div class="support">If you have any questions or need assistance, please contact us at <a href="mailto:info@yourclinicwebsite.com">info@yourclinicwebsite.com</a>.</div>
            </div>
        </body>
        
        </html>`;
};
