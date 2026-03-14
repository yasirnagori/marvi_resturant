import React, { useState } from 'react';
import { Plus, Trash2, Tag } from 'lucide-react';

const CategoryManager = ({ categories, onAddCategory, onRemoveCategory }) => {
    const [newCatName, setNewCatName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newCatName) return;
        onAddCategory({
            id: newCatName.toLowerCase().replace(/\s+/g, '_'),
            name: newCatName,
            icon: 'Package'
        });
        setNewCatName('');
    };

    return (
        <div className="w-80 bg-gray-50 border-l border-gray-300 p-4 flex flex-col">
            <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2 mb-4">
                <Tag size={16} /> Manage Categories
            </h3>

            <form onSubmit={handleSubmit} className="mb-6">
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="New Category Name..."
                        className="flex-1 border p-2 text-xs rounded"
                        value={newCatName}
                        onChange={e => setNewCatName(e.target.value)}
                    />
                    <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                        <Plus size={16} />
                    </button>
                </div>
            </form>

            <div className="flex-1 overflow-auto space-y-2">
                {categories.map(cat => (
                    <div key={cat.id} className="flex items-center justify-between bg-white border p-2 rounded text-xs">
                        <span className="font-medium text-gray-700">{cat.name}</span>
                        <button
                            onClick={() => onRemoveCategory(cat.id)}
                            className="text-red-400 hover:text-red-600 p-1"
                        >
                            <Trash2 size={14} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryManager;
