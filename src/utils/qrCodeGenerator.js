const QRCode = require('qrcode');

const generateQRCode = async (text) => {
    try {
        const qrCodeDataURL = await QRCode.toDataURL(text);
        return qrCodeDataURL;
    } catch (err) {
        console.error('Error generating QR code:', err);
        throw err;
    }
};

export { generateQRCode };
