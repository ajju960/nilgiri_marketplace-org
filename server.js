import express from 'express';
import cors from 'cors';
import twilio from 'twilio';

const app = express();
app.use(cors());
app.use(express.json());

// Twilio Credentials
// Replace [AuthToken] with your actual Auth Token
const accountSid = 'AC852a108dbea95e061e7c3dcb2b08becf';
const authToken = '[AuthToken]'; // User to replace this
const client = new twilio(accountSid, authToken);

app.post('/api/send-whatsapp', async (req, res) => {
    const { orderId, total, items, address } = req.body;
    const customerName = address?.name || 'Customer';

    // Calculate delivery date (4 days from now)
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 4);
    const estimatedDelivery = deliveryDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

    // Format items for message
    let itemsText = "";
    items.slice(0, 2).forEach(item => {
        itemsText += `• ${item.name} x1\n`; // Assuming qty 1 for now as per current cart logic
    });
    if (items.length > 2) {
        itemsText += `• ...and ${items.length - 2} more items`;
    }

    const messageBody = `🎪 ORDER CONFIRMED! 🎪

Hi ${customerName},

Your Nilgiri Tribal order #${orderId} has been confirmed!

📦 ITEMS:
${itemsText}

💰 TOTAL: ₹${total}
🚚 DELIVERY: ${estimatedDelivery}

Track your order: https://nilgiritribal.com/track/${orderId}

Thank you for supporting tribal artisans! ❤️
Toda • Kota • Irula • Kurumba`;

    try {
        const message = await client.messages.create({
            from: 'whatsapp:+14155238886',
            body: messageBody,
            to: 'whatsapp:+919342372290'
        });

        console.log('WhatsApp sent:', message.sid);
        res.json({ success: true, sid: message.sid });
    } catch (error) {
        console.error('Error sending WhatsApp:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
