// split_all_final.cjs
const fs = require('fs');
const path = require('path');
const { Jimp } = require('jimp');

async function processImage(imgPath, rows, cols, prefix, cropRatio = 0.81) {
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
                // Crop from 10% down to 82% to remove BOTH top and bottom text
                const cropY = Math.floor(rh * 0.10);
                const cropH = Math.floor(rh * 0.72); 
                clone.crop({ x: c * cw, y: r * rh + cropY, w: cw, h: cropH });
                
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
    // 1. BBQ (Original source, 4 rows, 2 columns)
    await processImage(
        'C:\\Users\\HP window 10\\.gemini\\antigravity\\brain\\56a34ad5-82bd-4c3d-82cd-2ea8e00940ed\\uploaded_media_1772945683040.jpg',
        4, 2, 'bbq_final', 0.80
    );

    // 2. Karahi (Source from prev convo, 6 rows, 3 columns)
    await processImage(
        'C:\\Users\\HP window 10\\.gemini\\antigravity\\brain\\3db5d85f-531b-410f-803b-ac767ac200f4\\media__1772944768079.jpg',
        6, 3, 'karahi_final', 0.80
    );

    // 3. Rolls (Correct source from prev convo, 5 rows, 3 columns)
    await processImage(
        'C:\\Users\\HP window 10\\.gemini\\antigravity\\brain\\56a34ad5-82bd-4c3d-82cd-2ea8e00940ed\\media__1772946289963.jpg',
        5, 3, 'rolls_final', 0.80
    );

    console.log("ALL TEXT-FREE IMAGES GENERATED!");
}

main().catch(console.error);
