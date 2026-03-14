export const categories = [
    { id: 'bbq', name: 'BBQ', icon: 'Flame', image: '/images/bbq_category_isolated.png' },
    { id: 'karahi', name: 'Karahi', icon: 'Soup', image: '/images/karahi_category_isolated.png' },
    { id: 'marvi_roll', name: 'Marvi Roll', icon: 'Wrap', image: '/images/roll_category_isolated.png' },
    { id: 'sandwich', name: 'Sandwich', icon: 'Sandwich', image: '/images/sandwich_category_isolated.png' },
    { id: 'fried_chicken', name: 'Fried Chicken', icon: 'Drumstick', image: '/images/fried_chicken_category_isolated.png' },
    { id: 'burger', name: 'Burger', icon: 'Ham', image: '/images/burger_category_isolated.png' },
    { id: 'fries', name: 'Fries', icon: 'Fries', image: '/images/fries_category_isolated.png' },
    { id: 'pizza_pasta', name: 'Pizza & Pasta', icon: 'Pizza', image: '/images/pizza_category_isolated.png' },
    { id: 'extras', name: 'Extras', icon: 'PlusCircle', image: '/images/extras_category_isolated.png' },
    { id: 'colddrinks', name: 'Cold Drinks', icon: 'CupSoda', image: '/images/drinks_category_isolated.png' },
];

export const menuItems = [
    { id: 1, name: 'Chicken Tikka Leg', price: 360, categoryId: 'bbq', image: '/images/bbq_final_1.jpg' },
    { id: 2, name: 'Chicken Tikka Chest', price: 380, categoryId: 'bbq', image: '/images/bbq_final_2.jpg' },
    { id: 3, name: 'Chicken Boti', price: 420, categoryId: 'bbq', image: '/images/bbq_final_7.jpg'  }, 
    { id: 4, name: 'Chicken Malai Boti', price: 460, categoryId: 'bbq', image: '/images/bbq_final_3.jpg'  },
    { id: 5, name: 'Beef Seekh Kabab', price: 420, categoryId: 'bbq', image: '/images/bbq_final_4.jpg'  },
    { id: 6, name: 'Chicken Malai Tikka', price: 480, categoryId: 'bbq', image: '/images/bbq_final_6.jpg'  },
    { id: 7, name: 'Beef Boti', price: 480, categoryId: 'bbq', image: '/images/bbq_final_5.jpg'  },
    { id: 5.5, name: 'Chicken Kabab', price: 420, categoryId: 'bbq', image: '/images/bbq_final_8.jpg' }, 


    // CHICKEN KARAHI
    { id: 8, name: 'Chicken Karahi (Full)', price: 1800, categoryId: 'karahi', image: '/images/karahi_final_10.jpg'  },
    { id: 9, name: 'Chicken Karahi (Half)', price: 900, categoryId: 'karahi', image: '/images/karahi_final_11.jpg'  },
    { id: 10, name: 'Chicken White Karahi (Full)', price: 2000, categoryId: 'karahi', image: '/images/karahi_final_14.jpg'  },
    { id: 11, name: 'Chicken White Karahi (Half)', price: 1000, categoryId: 'karahi', image: '/images/karahi_final_15.jpg'  },
    { id: 12, name: 'Chicken Handi (Full)', price: 2500, categoryId: 'karahi', image: '/images/karahi_final_16.jpg'  },
    { id: 13, name: 'Chicken Handi (Half)', price: 1250, categoryId: 'karahi', image: '/images/karahi_final_18.jpg'  },

    // MARVI ROLL
    { id: 14, name: 'Marvi Special Roll', price: 290, categoryId: 'marvi_roll', image: '/images/roll_special.png'  },
    { id: 15, name: 'Chicken Chatni Roll', price: 150, categoryId: 'marvi_roll', image: '/images/roll_chicken_chatni.png'  },
    { id: 16, name: 'Chicken Mayo Roll', price: 170, categoryId: 'marvi_roll', image: '/images/roll_chicken_mayo.png'  },
    { id: 17, name: 'Chicken Cheese Roll', price: 190, categoryId: 'marvi_roll', image: '/images/roll_chicken_cheese.png'  },
    { id: 18, name: 'Beef Chatni Roll', price: 150, categoryId: 'marvi_roll', image: '/images/roll_beef_chatni.png'  },
    { id: 19, name: 'Beef Mayo Roll', price: 170, categoryId: 'marvi_roll', image: '/images/roll_beef_mayo.png'  },
    { id: 20, name: 'Chicken Kabab Roll', price: 160, categoryId: 'marvi_roll', image: '/images/roll_special.png'  },
    { id: 21, name: 'Chic. Kabab Cheese Roll', price: 190, categoryId: 'marvi_roll', image: '/images/roll_chicken_cheese.png'  },
    { id: 22, name: 'Kabab Mayo Roll', price: 170, categoryId: 'marvi_roll', image: '/images/roll_chicken_mayo.png'  },

    // SANDWICH
    { id: 23, name: 'Chicken Sandwich', price: 330, categoryId: 'sandwich', image: 'https://images.pexels.com/photos/1600711/pexels-photo-1600711.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 24, name: 'Chicken Cheese Sandwich', price: 370, categoryId: 'sandwich', image: 'https://images.pexels.com/photos/1600711/pexels-photo-1600711.jpeg?auto=compress&cs=tinysrgb&w=400'  },
    { id: 25, name: 'Chicken Club Sandwich', price: 380, categoryId: 'sandwich', image: 'https://images.pexels.com/photos/1600711/pexels-photo-1600711.jpeg?auto=compress&cs=tinysrgb&w=400'  },
    { id: 26, name: 'Chick. Club Cheese Sandw.', price: 420, categoryId: 'sandwich', image: 'https://images.pexels.com/photos/1600711/pexels-photo-1600711.jpeg?auto=compress&cs=tinysrgb&w=400'  },
    { id: 27, name: 'BBQ Chicken Sandwich', price: 370, categoryId: 'sandwich', image: 'https://images.pexels.com/photos/1600711/pexels-photo-1600711.jpeg?auto=compress&cs=tinysrgb&w=400'  },
    { id: 28, name: 'BBQ Chick. Club Sandwich', price: 420, categoryId: 'sandwich', image: 'https://images.pexels.com/photos/1600711/pexels-photo-1600711.jpeg?auto=compress&cs=tinysrgb&w=400'  },
    { id: 29, name: 'BBQ Chi. Cheese Club Sandw.', price: 460, categoryId: 'sandwich', image: 'https://images.pexels.com/photos/1600711/pexels-photo-1600711.jpeg?auto=compress&cs=tinysrgb&w=400'  },
    { id: 30, name: 'Crispy Sandwich', price: 380, categoryId: 'sandwich', image: 'https://images.pexels.com/photos/1600711/pexels-photo-1600711.jpeg?auto=compress&cs=tinysrgb&w=400'  },
    { id: 31, name: 'Crispy Club Sandwich', price: 440, categoryId: 'sandwich', image: 'https://images.pexels.com/photos/1600711/pexels-photo-1600711.jpeg?auto=compress&cs=tinysrgb&w=400'  },
    { id: 32, name: 'Crispy Club Cheese Sandw.', price: 480, categoryId: 'sandwich', image: '/images/food_menu_15.jpg'  },

    // FRIED CHICKEN
    { id: 33, name: 'Qtr: Broast Leg', price: 390, categoryId: 'fried_chicken', image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400'  },
    { id: 34, name: 'Qtr: Broast Chest', price: 430, categoryId: 'fried_chicken', image: 'https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=400'  },
    { id: 35, name: 'Half Broast', price: 800, categoryId: 'fried_chicken', image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400'  },
    { id: 36, name: 'Full Broast', price: 1600, categoryId: 'fried_chicken', image: 'https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=400'  },
    { id: 37, name: '6 Pcs Wings', price: 490, categoryId: 'fried_chicken', image: 'https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=400'  },

    // BURGER
    { id: 38, name: 'Zinger Burger', price: 380, categoryId: 'burger', image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=400'  },
    { id: 39, name: 'Zinger Cheese Burger', price: 420, categoryId: 'burger', image: '/images/zinger_cheese_burger.png'  },
    { id: 40, name: 'Chicken Burger', price: 320, categoryId: 'burger', image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=400'  },
    { id: 41, name: 'Beef Burger', price: 340, categoryId: 'burger', image: 'https://images.pexels.com/photos/3219547/pexels-photo-3219547.jpeg?auto=compress&cs=tinysrgb&w=400'  },
    { id: 42, name: 'Chicken Cheese Burger', price: 360, categoryId: 'burger', image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=400'  },
    { id: 43, name: 'Chicken Double Decker', price: 460, categoryId: 'burger', image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=400'  },

    // FRENCH FRIES
    { id: 44, name: 'Regular Fries', price: 120, categoryId: 'fries', image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=400'  },
    { id: 45, name: 'Mayo Fries', price: 180, categoryId: 'fries', image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=400'  },
    { id: 46, name: 'Loaded Fries', price: 300, categoryId: 'fries', image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=400'  },
    { id: 47, name: 'Pizza Fries', price: 350, categoryId: 'fries', image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=400'  },

    // PIZZA & PASTA
    { id: 48, name: 'Pizza Fries Small', price: 350, categoryId: 'pizza_pasta', image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=400'  },
    { id: 49, name: 'Pizza Fries Large', price: 500, categoryId: 'pizza_pasta', image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=400'  },
    { id: 50, name: 'Spicy Pasta Small', price: 400, categoryId: 'pizza_pasta', image: 'https://images.pexels.com/photos/1049620/pexels-photo-1049620.jpeg?auto=compress&cs=tinysrgb&w=400'  },
    { id: 51, name: 'Spicy Pasta Large', price: 600, categoryId: 'pizza_pasta', image: 'https://images.pexels.com/photos/1049620/pexels-photo-1049620.jpeg?auto=compress&cs=tinysrgb&w=400'  },
    { id: 52, name: 'Creamy Pasta Small', price: 400, categoryId: 'pizza_pasta', image: 'https://images.pexels.com/photos/1049620/pexels-photo-1049620.jpeg?auto=compress&cs=tinysrgb&w=400'  },
    { id: 53, name: 'Creamy Pasta Large', price: 600, categoryId: 'pizza_pasta', image: 'https://images.pexels.com/photos/1049620/pexels-photo-1049620.jpeg?auto=compress&cs=tinysrgb&w=400'  },
    { id: 54, name: 'Lasagna Pasta Small', price: 450, categoryId: 'pizza_pasta', image: 'https://images.pexels.com/photos/1049620/pexels-photo-1049620.jpeg?auto=compress&cs=tinysrgb&w=400'  },
    { id: 55, name: 'Lasagna Pasta Large', price: 650, categoryId: 'pizza_pasta', image: 'https://images.pexels.com/photos/1049620/pexels-photo-1049620.jpeg?auto=compress&cs=tinysrgb&w=400'  },
    { id: 56, name: 'Calzone Sandwich Small', price: 350, categoryId: 'pizza_pasta', image: 'https://images.pexels.com/photos/1049620/pexels-photo-1049620.jpeg?auto=compress&cs=tinysrgb&w=400'  },
    { id: 57, name: 'Calzone Sandwich Large', price: 650, categoryId: 'pizza_pasta', image: 'https://images.pexels.com/photos/1049620/pexels-photo-1049620.jpeg?auto=compress&cs=tinysrgb&w=400'  },
    // Special Pizza logic might need variations, for now just simple list
    { id: 58, name: 'Special Pizza Small', price: 350, categoryId: 'pizza_pasta', image: 'https://images.pexels.com/photos/1049620/pexels-photo-1049620.jpeg?auto=compress&cs=tinysrgb&w=400'  },
    { id: 59, name: 'Special Pizza Medium', price: 650, categoryId: 'pizza_pasta', image: 'https://images.pexels.com/photos/1049620/pexels-photo-1049620.jpeg?auto=compress&cs=tinysrgb&w=400'  },
    { id: 60, name: 'Special Pizza Large', price: 950, categoryId: 'pizza_pasta', image: 'https://images.pexels.com/photos/1049620/pexels-photo-1049620.jpeg?auto=compress&cs=tinysrgb&w=400'  },
    { id: 61, name: 'Special Pizza Jumbo', price: 1350, categoryId: 'pizza_pasta', image: 'https://images.pexels.com/photos/1049620/pexels-photo-1049620.jpeg?auto=compress&cs=tinysrgb&w=400'  },

    // EXTRAS
    { id: 62, name: 'Raita', price: 60, categoryId: 'extras', image: '/images/raita_isolated.png'  },
    { id: 63, name: 'Mayo', price: 80, categoryId: 'extras', image: '/images/mayo_isolated.png'  },
    { id: 64, name: 'Pharta', price: 50, categoryId: 'extras', image: '/images/paratha_isolated.png'  },
    { id: 65, name: 'Cheese Slice', price: 40, categoryId: 'extras', image: 'https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg?auto=compress&cs=tinysrgb&w=400'  },
    { id: 66, name: 'Bread', price: 50, categoryId: 'extras', image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=400'  },
    { id: 67, name: 'Coleslaw', price: 50, categoryId: 'extras', image: '/images/coleslaw_isolated.png'  },
    { id: 77, name: 'Delivery Charges', price: 100, categoryId: 'extras', image: null  },

    // COLDRINKS
    { id: 68, name: 'Jumbo', price: 280, categoryId: 'colddrinks', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=400&q=80'  },
    { id: 69, name: '1.5 Ltr', price: 220, categoryId: 'colddrinks', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=400&q=80'  },
    { id: 70, name: '1 Ltr', price: 170, categoryId: 'colddrinks', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=400&q=80'  },
    { id: 71, name: '500 ml', price: 110, categoryId: 'colddrinks', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=400&q=80'  },
    { id: 72, name: '300 ml', price: 80, categoryId: 'colddrinks', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=400&q=80'  },
    { id: 73, name: 'Small Water', price: 60, categoryId: 'colddrinks', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=400&q=80'  },
    { id: 74, name: 'Large Water', price: 120, categoryId: 'colddrinks', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=400&q=80'  },
    { id: 75, name: 'String 300 ml', price: 100, categoryId: 'colddrinks', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=400&q=80'  },
    { id: 76, name: 'Sting 500 ml', price: 130, categoryId: 'colddrinks', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=400&q=80'  },
];
