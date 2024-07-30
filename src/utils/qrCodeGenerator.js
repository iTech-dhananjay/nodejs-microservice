import QRCode from 'qrcode';
import path from 'path';

const generateQRCode = async (text, filename) => {
    try {
        const outputFilePath = path.resolve('public/qrcodes', filename);
        await QRCode.toFile(outputFilePath, text);
        return outputFilePath;
    } catch (err) {
        console.error('Error generating QR code:', err);
        throw err;
    }
};

export { generateQRCode }
