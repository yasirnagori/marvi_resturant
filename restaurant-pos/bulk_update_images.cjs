const fs = require('fs');

const categoryImages = {
    'bbq': 'https://www.shutterstock.com/image-photo/chicken-tikka-boti-kabab-served-260nw-1887343468.jpg',
    'karahi': 'https://www.shutterstock.com/image-photo/chicken-karahi-pakistani-indian-traditional-260nw-1714545580.jpg',
    'marvi_roll': '/images/food_menu_7.jpg',
    'sandwich': 'https://images.pexels.com/photos/1600711/pexels-photo-1600711.jpeg?auto=compress&cs=tinysrgb&w=400',
    'fried_chicken': 'https://www.shutterstock.com/image-photo/isolated-crispy-chicken-broast-260nw-1910260480.jpg',
    'burger': 'https://www.shutterstock.com/image-photo/isolated-crispy-chicken-zinger-burger-260nw-1910260480.jpg',
    'fries': 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=400',
    'pizza_pasta': 'https://images.pexels.com/photos/1049620/pexels-photo-1049620.jpeg?auto=compress&cs=tinysrgb&w=400',
    'extras': 'https://images.pexels.com/photos/6605214/pexels-photo-6605214.jpeg?auto=compress&cs=tinysrgb&w=400',
    'colddrinks': 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=400&q=80'
};

const specificImages = {
    'Chicken Tikka Leg': '/images/karahi_menu_1.jpg',
    'Chicken Tikka Chest': '/images/karahi_menu_2.jpg',
    'Chicken Malai Boti': '/images/karahi_menu_3.jpg',
    'Beef Seekh Kabab': '/images/karahi_menu_4.jpg',
    'Beef Boti': '/images/karahi_menu_5.jpg',
    'Beef Malai Tikka': '/images/karahi_menu_6.jpg',
    'Chicken Kabab': '/images/karahi_menu_7.jpg',
    'Chicken Karahi (Full)': '/images/karahi_menu_10.jpg',
    'Chicken Karahi (Half)': '/images/karahi_menu_11.jpg',
    'Chicken White Karahi (Full)': '/images/karahi_menu_14.jpg',
    'Chicken White Karahi (Half)': '/images/karahi_menu_15.jpg',
    'Chicken Handi (Full)': '/images/karahi_menu_16.jpg',
    'Chicken Handi (Half)': '/images/karahi_menu_18.jpg',
    'Marvi Special Roll': '/images/food_menu_7.jpg',
    'Chicken Chatni Roll': '/images/food_menu_8.jpg',
    'Chicken Mayo Roll': '/images/food_menu_9.jpg',
    'Chicken Cheese Roll': '/images/food_menu_10.jpg',
    'Beef Mayo Roll': '/images/food_menu_11.jpg',
    'Beef Chatni Roll': '/images/food_menu_12.jpg',
    'Chicken Kabab Roll': '/images/food_menu_13.jpg',
    'Chic. Kabab Cheese Roll': '/images/food_menu_14.jpg',
    'Crispy Club Cheese Sandw.': '/images/food_menu_15.jpg'
};

const menuPath = 'src/data/menu.js';
const data = fs.readFileSync(menuPath, 'utf8');

const updatedData = data.split('\n').map(line => {
    if (line.includes('{ id:')) {
        const nameMatch = line.match(/name:\s*'([^']+)'/);
        const catMatch = line.match(/categoryId:\s*'([^']+)'/);
        
        if (nameMatch && catMatch) {
            const name = nameMatch[1];
            const categoryId = catMatch[1];
            
            let imageUrl = specificImages[name] || categoryImages[categoryId] || '';
            
            if (imageUrl) {
                if (line.includes('image:')) {
                    return line.replace(/image:\s*'[^']+'/, `image: '${imageUrl}'`);
                } else {
                    return line.replace(/\s*\},?$/, `, image: '${imageUrl}' },`);
                }
            }
        }
    }
    return line;
}).join('\n');

fs.writeFileSync(menuPath, updatedData);
console.log('All menu images updated successfully.');
