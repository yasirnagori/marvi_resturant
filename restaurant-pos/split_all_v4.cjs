// split_all_v4.cjs
const fs = require('fs');
const path = require('path');
const { Jimp } = require('jimp');

async function processImage(imgPath, rows, cols, prefix, cropRatio = 0.82) {
    console.log(`Processing ${imgPath}...`);
    try {
        const originalImage = await Jimp.read(imgPath);
        const width = originalImage.bitmap.width;
        const height = originalImage.bitmap.height;
        
        const rh = Math.floor(height / rows);
        const cw = Math.floor(width / cols);
        
        let counter = 1;
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const clone = originalImage.clone();
                const cropH = Math.floor(rh * cropRatio); 
                clone.crop({ x: c * cw, y: r * rh, w: cw, h: cropH });
                
                const fileName = `public/images/${prefix}_${counter}.jpg`;
                await clone.write(fileName);
                console.log(`Saved ${fileName}`);
                counter++;
            }
        }
    } catch (err) {
        console.error(`Failed to process ${imgPath}:`, err.message);
    }
}

async function main() {
    // 1. BBQ
    await processImage(
        'C:\\Users\\HP window 10\\.gemini\\antigravity\\brain\\56a34ad5-82bd-4c3d-82cd-2ea8e00940ed\\uploaded_media_1772945683040.jpg',
        4, 2, 'bbq_v2', 0.82
    );

    // 2. Karahi
    await processImage(
        'C:\\Users\\HP window 10\\.gemini\\antigravity\\brain\\3db5d85f-531b-410f-803b-ac767ac200f4\\media__1772944768079.jpg',
        6, 3, 'karahi_v2', 0.82
    );

    // 3. Rolls (Fixed path: uploaded_media_1772946363980.img)
    // Looking at the img, it has 5 rows and 3 columns
    await processImage(
        'C:\\Users\\HP window 10\\.gemini\\antigravity\\brain\\56a34ad5-82bd-4c3d-82cd-2ea8e00940ed\\rolls_source.jpg',
        5, 3, 'rolls', 0.85
    );

    console.log("All images processed!");
}

main().catch(console.error);
