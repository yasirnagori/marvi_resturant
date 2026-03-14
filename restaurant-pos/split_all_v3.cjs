// split_all_v3.cjs
const fs = require('fs');
const path = require('path');
const { Jimp } = require('jimp');

async function processImage(imgPath, rows, cols, prefix, cropRatio = 0.82) {
    console.log(`Processing ${imgPath}...`);
    const originalImage = await Jimp.read(imgPath);
    const width = originalImage.bitmap.width;
    const height = originalImage.bitmap.height;
    
    const rh = Math.floor(height / rows);
    const cw = Math.floor(width / cols);
    
    let counter = 1;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const clone = originalImage.clone();
            // More aggressive crop to remove text at the bottom of each item cell
            const cropH = Math.floor(rh * cropRatio); 
            clone.crop({ x: c * cw, y: r * rh, w: cw, h: cropH });
            
            const fileName = `public/images/${prefix}_${counter}.jpg`;
            await clone.write(fileName);
            console.log(`Saved ${fileName}`);
            counter++;
        }
    }
}

async function main() {
    // 1. BBQ (Original with text removal)
    // 4 rows, 2 cols
    await processImage(
        'C:\\Users\\HP window 10\\.gemini\\antigravity\\brain\\56a34ad5-82bd-4c3d-82cd-2ea8e00940ed\\uploaded_media_1772945683040.jpg',
        4, 2, 'bbq_v2', 0.82
    );

    // 2. Karahi (Original with text removal)
    // 6 rows, 3 cols
    await processImage(
        'C:\\Users\\HP window 10\\.gemini\\antigravity\\brain\\3db5d85f-531b-410f-803b-ac767ac200f4\\media__1772944768079.jpg',
        6, 3, 'karahi_v2', 0.82
    );

    // 3. Rolls (New)
    // 5 rows, 3 cols
    await processImage(
        'C:\\Users\\HP window 10\\.gemini\\antigravity\\brain\\56a34ad5-82bd-4c3d-82cd-2ea8e00940ed\\uploaded_media_1772946363040.jpg',
        5, 3, 'rolls', 0.85
    );

    console.log("All images processed successfully!");
}

main().catch(console.error);
