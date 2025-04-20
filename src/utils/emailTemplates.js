export const generateSubscriptionMessage = (user, subscription) => {
  const { fullname, email } = user;
  const { paymentStatus, price, deliveryTime, selectedPlan, orderDetails } = subscription;

  // Format orderDetails items (group by day, list items as strings)
  const itemsList = Array.isArray(orderDetails) && orderDetails.length > 0
    ? orderDetails
        .map(
          (entry) => `
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">${entry.day || "Unknown Day"}</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${(entry.items || []).length > 0 ? entry.items.join(", ") : "No items specified"}</td>
          </tr>`
        )
        .join("")
    : `
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; text-align: center;" colspan="2">No items specified</td>
        </tr>`;

  const text = `
Dear ${fullname},

Thank you for subscribing to Khaja Sansar!

Subscription Details:
- Plan: ${selectedPlan}
- Price: NPR ${price?.toFixed(2)}
- Delivery Time: ${deliveryTime}
- Payment Status: ${paymentStatus}

Order Items:
${Array.isArray(orderDetails) && orderDetails.length > 0
  ? orderDetails
      .map(
        (entry) =>
          `${entry.day || "Unknown Day"}: ${(entry.items || []).length > 0 ? entry.items.join(", ") : "No items specified"}`
      )
      .join("\n")
  : "No items specified"}

We’re excited to have you on board! If you have any questions, contact us at support@khajasansar.com.

Best regards,
The Khaja Sansar Team
`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Subscription Confirmation</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; color: #333333; line-height: 1.6; background-color: #f4f4f4;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header with Company Name -->
          <tr>
            <td style="background-color: #2c3e50; padding: 20px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px;">
              <h1 style="margin: 0; font-size: 28px; color: #ffffff; font-weight: bold;">Khaja Sansar</h1>
            </td>
          </tr>
          <!-- Letterhead Section -->
          <tr>
            <td style="padding: 20px 30px 10px; background-color: #ffffff;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="font-size: 14px; color: #666666;">
                    Khaja Sansar<br />
                    Kamalpokari, Islington College, Kathmandu, Nepal<br />
                    Email: <a href="mailto:support@khajasansar.com" style="color: #e67e22; text-decoration: none;">support@khajasansar.com</a><br />
                    Phone: +977-9809820098
                  </td>
                  <td style="font-size: 14px; color: #666666; text-align: right;">
                    Date: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}<br />
                    To: ${fullname} <${email}>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Main Content -->
          <tr>
            <td style="padding: 20px 30px; background-color: #ffffff;">
              <h2 style="color: #2c3e50; margin: 0 0 20px; font-size: 24px;">Subscription Confirmation</h2>
              <p style="margin: 0 0 15px;">Dear ${fullname},</p>
              <p style="margin: 0 0 15px;">Thank you for subscribing to Khaja Sansar! We're thrilled to have you on board. Below are the details of your subscription:</p>
              <h3 style="color: #2c3e50; margin: 20px 0 10px; font-size: 18px;">Subscription Details</h3>
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 14px; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 5px 0;"><strong>Plan:</strong></td>
                  <td style="padding: 5px 0;">${selectedPlan}</td>
                </tr>
                <tr>
                  <td style="padding: 5px 0;"><strong>Price:</strong></td>
                  <td style="padding: 5px 0;">NPR ${price?.toFixed(2)}</td>
                </tr>
                <tr>
                  <td style="padding: 5px 0;"><strong>Delivery Time:</strong></td>
                  <td style="padding: 5px 0;">${deliveryTime}</td>
                </tr>
                <tr>
                  <td style="padding: 5px 0;"><strong>Payment Status:</strong></td>
                  <td style="padding: 5px 0;">${paymentStatus}</td>
                </tr>
              </table>
              <h3 style="color: #2c3e50; margin: 20px 0 10px; font-size: 18px;">Order Items</h3>
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 14px; border-collapse: collapse; margin-bottom: 20px;">
                <thead>
                  <tr style="background-color: #f8f8f8;">
                    <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Day</th>
                    <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Items</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsList}
                </tbody>
              </table>
              <p style="margin: 0 0 15px;">If you have any questions or need assistance, please reach out to us at <a href="mailto:support@khajasansar.com" style="color: #e67e22; text-decoration: none;">support@khajasansar.com</a> or call us at +977-9809820098.</p>
              <p style="margin: 0;">Best regards,<br />The Khaja Sansar Team</p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color: #2c3e50; padding: 15px; text-align: center; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
              <p style="margin: 0; font-size: 12px; color: #ffffff;">
                © ${new Date().getFullYear()} Khaja Sansar. All rights reserved.<br />
                <a href="https://www.khajasansar.com" style="color: #e67e22; text-decoration: none;">Visit our website</a> | 
                <a href="https://www.khajasansar.com/unsubscribe" style="color: #e67e22; text-decoration: none;">Unsubscribe</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

  return { html, text };
};