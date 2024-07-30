import QRCode from 'qrcode';
import path from 'path';


// Function to generate a QR code
const generateQRCode = async (text, filename) => {
    try {
        // Construct the full path for the output file
        const outputFilePath = path.resolve('public/qrcodes', filename); // [ /Users/dhananjaykumar/Desktop/Workspace/Projects/node-microservice/server/public/qrcodes/66a3bad4f9ed83696c40fa62.png ]

        // Generate the QR code and save it to the specified file path
        await QRCode.toFile(outputFilePath, text);

        //Return the file path of the generated QR code
        return outputFilePath;
    } catch (err) {
        console.error('Error generating QR code:', err);
        throw err;
    }
};

export { generateQRCode }
