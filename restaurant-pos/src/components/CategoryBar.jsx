import React from 'react';
import * as Icons from 'lucide-react';

const CategoryBar = ({ categories, selectedCategory, onSelectCategory }) => {
    return (
        <div className="bg-white shadow-sm border-b p-2">
            <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((cat) => {
                    const Icon = Icons[cat.icon] || Icons.Circle;
                    return (
                        <button
                            key={cat.id}
                            onClick={() => onSelectCategory(cat.id)}
                            className={`
                flex flex-col items-center justify-center p-2 rounded-lg min-w-[80px] transition-all
                ${selectedCategory === cat.id
                                    ? 'bg-primary text-white scale-105 shadow-md'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
              `}
                        >
                            <Icon size={20} className="mb-1" />
                            <span className="text-xs font-semibold whitespace-nowrap">{cat.name}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default CategoryBar;
