const fs = require('fs');

const images = {
    'bbq': 'https://plus.unsplash.com/premium_photo-1663955628549-9ee761a29202?auto=format&fit=crop&w=400&q=80',
    'karahi': 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=400&q=80',
    'marvi_roll': 'https://images.unsplash.com/photo-1626804475297-41604ea082eb?auto=format&fit=crop&w=400&q=80',
    'sandwich': 'https://images.pexels.com/photos/1600711/pexels-photo-1600711.jpeg?auto=compress&cs=tinysrgb&w=400',
    'fried_chicken': 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6cb?auto=format&fit=crop&w=400&q=80',
    'burger': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80',
    'fries': 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=400&q=80',
    'pizza_pasta': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80',
    'extras': 'https://images.unsplash.com/photo-1514944288352-8f1819662b9a?auto=format&fit=crop&w=400&q=80',
    'colddrinks': 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=400&q=80'
};

const content = fs.readFileSync('src/data/menu.js', 'utf-8');

const lines = content.split('\n');
const outLines = [];

for (let line of lines) {
    if (line.includes('categoryId:') && line.includes('id:') && !line.includes('image:')) {
        const match = line.match(/categoryId:\s*'([^']+)'/);
        if (match) {
            const category = match[1];
            const imgUrl = images[category] || 'https://placehold.co/400x400/FFFFFF/000000?text=Food';
            line = line.replace(/(\s*\},?\s*)$/, `, image: '${imgUrl}' $1`);
        }
    }
    outLines.push(line);
}

fs.writeFileSync('src/data/menu.js', outLines.join('\n'), 'utf-8');
console.log('Updated menu.js with images');
