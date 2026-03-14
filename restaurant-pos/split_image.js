import fs from 'fs';
import path from 'path';
import Jimp from 'jimp';

async function processImage() {
    const imgPath = 'C:\\Users\\HP window 10\\.gemini\\antigravity\\brain\\3db5d85f-531b-410f-803b-ac767ac200f4\\media__1772943952586.png';
    const originalImage = await Jimp.read(imgPath);
    
    // The image has 4 rows and 3 columns
    const rows = 4;
    const cols = 3;
    const width = originalImage.bitmap.width;
    const height = originalImage.bitmap.height;
    
    const rowHeight = Math.floor(height / rows);
    const colWidth = Math.floor(width / cols);
    
    const items = [
        "Chicken Tikka", "Chicken Malai Boti", "Beef Seekh Kabab",
        "Beef Boti", "Beef Malai Tikka", "Marvi Special Roll",
        "Chicken Chatni Roll", "Chicken Mayo Roll", "Chicken Cheese Roll",
        "Beef Mayo Roll", "Beef Chatni Roll", "Chicken Kabab Roll",
        "Chic. Kabab Cheese Roll", "Crispy Club Cheese Sandw."
    ];
    
    // Actually the grid is 4 rows, 3 cols. Wait, the first row has 2 items.
    // Looking at the image, we can just slice it computationally:
    // Row 1: 2 items.
    // Row 2: 3 items.
    // Row 3: 3 items.
    // Row 4: 3 items.
    // Row 5: 3 items.
    // The image seems to have 5 rows and 3 columns roughly.
    // Let's just define manual bounding boxes or just slice it into 5 rows, 3 cols, and ignore blanks.
    
    const estRows = 5;
    const estCols = 3;
    const rh = Math.floor(height / estRows);
    const cw = Math.floor(width / estCols);
    
    let counter = 1;
    for (let r = 0; r < estRows; r++) {
        for (let c = 0; c < estCols; c++) {
            // First row only has 2 items (left and right), maybe middle is blank.
            // Let's just crop all cells
            const clone = originalImage.clone();
            const cropH = Math.floor(rh * 0.85); // Remove text at bottom
            clone.crop(c * cw, r * rh, cw, cropH);
            
            await clone.writeAsync(`public/images/food_menu_${counter}.jpg`);
            counter++;
        }
    }
    console.log("Images split successfully into public/images/");
}

processImage().catch(console.error);
