// split_bbq_images.cjs
const fs = require('fs');
const path = require('path');
const { Jimp } = require('jimp');

async function processImage() {
    const imgPath = 'C:\\Users\\HP window 10\\.gemini\\antigravity\\brain\\56a34ad5-82bd-4c3d-82cd-2ea8e00940ed\\uploaded_media_1772945683040.jpg';
    const originalImage = await Jimp.read(imgPath);
    
    // The image has 4 rows and 2 columns
    const rows = 4;
    const cols = 2;
    const width = originalImage.bitmap.width;
    const height = originalImage.bitmap.height;
    
    const rh = Math.floor(height / rows);
    const cw = Math.floor(width / cols);
    
    let counter = 1;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const clone = originalImage.clone();
            // Crop to individual items, removing some of the bottom text if necessary
            // For this specific image, the text is below each item. 
            // We want the image of the food.
            const cropH = Math.floor(rh * 0.85); 
            clone.crop({ x: c * cw, y: r * rh, w: cw, h: cropH });
            
            await clone.write(`public/images/bbq_${counter}.jpg`);
            counter++;
        }
    }
    console.log("Images split successfully into public/images/ as bbq_*.jpg");
}

processImage().catch(console.error);
