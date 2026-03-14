// split_karahi.cjs
const fs = require('fs');
const path = require('path');
const { Jimp } = require('jimp');

async function processImage() {
    const imgPath = 'C:\\Users\\HP window 10\\.gemini\\antigravity\\brain\\3db5d85f-531b-410f-803b-ac767ac200f4\\media__1772944768079.jpg';
    const originalImage = await Jimp.read(imgPath);
    
    // The image seems to have:
    // Row 1: 3 items (Tikka Leg, Chest, Malai Boti)
    // Row 2: 3 items (Seekh Kabab, Beef Boti, Beef Malai Tikka)
    // Row 3: 3 items (Chicken Kabab, Beef Boti, Beef Malai Tikka) - slightly repetitive
    // Row 4: 3 items (Chicken Karahi Full, Half, Half)
    // Row 5: 3 items (Karahi Full Boi??, White Karahi Full, White Karahi Half)
    // Row 6: 3 items (Handi Full, Full, Half)
    
    const rows = 6;
    const cols = 3;
    const width = originalImage.bitmap.width;
    const height = originalImage.bitmap.height;
    
    const rh = Math.floor(height / rows);
    const cw = Math.floor(width / cols);
    
    let counter = 1;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const clone = originalImage.clone();
            const cropH = Math.floor(rh * 0.85); // Remove text at bottom
            clone.crop({ x: c * cw, y: r * rh, w: cw, h: cropH });
            
            await clone.write(`public/images/karahi_menu_${counter}.jpg`);
            counter++;
        }
    }
    console.log("Karahi images split successfully into public/images/");
}

processImage().catch(console.error);
