const fs = require('fs');
const file = 'd:/Resturant billing software/restaurant-pos/src/data/menu.js';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/'\/images\//g, "'./images/");
fs.writeFileSync(file, content);
console.log("Updated menu paths!");
