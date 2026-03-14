// split_image.cjs
const fs = require('fs');
const path = require('path');
const { Jimp } = require('jimp');

async function processImage() {
    const imgPath = 'C:\\Users\\HP window 10\\.gemini\\antigravity\\brain\\3db5d85f-531b-410f-803b-ac767ac200f4\\media__1772943952586.png';
    const originalImage = await Jimp.read(imgPath);
    
    // The image has 4 rows and 3 columns
    const rows = 4;
    const cols = 3;
    const width = originalImage.bitmap.width;
    const height = originalImage.bitmap.height;
    
    // Looking at the image, there are 5 rows, and maximum 3 columns.
    const estRows = 5;
    const estCols = 3;
    const rh = Math.floor(height / estRows);
    const cw = Math.floor(width / estCols);
    
    let counter = 1;
    for (let r = 0; r < estRows; r++) {
        for (let c = 0; c < estCols; c++) {
            const clone = originalImage.clone();
            const cropH = Math.floor(rh * 0.85); // Remove text at bottom
            clone.crop({ x: c * cw, y: r * rh, w: cw, h: cropH });
            
            await clone.write(`public/images/food_menu_${counter}.jpg`);
            counter++;
        }
    }
    console.log("Images split successfully into public/images/");
}

processImage().catch(console.error);
