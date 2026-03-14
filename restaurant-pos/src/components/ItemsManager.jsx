import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Save, X } from 'lucide-react';

const ItemsManager = ({ items, categories, onAddItem, onUpdateItem, onRemoveItem }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [newItem, setNewItem] = useState({ name: '', price: '', categoryId: categories[0]?.id });
    const [editingId, setEditingId] = useState(null);
    const [editValues, setEditValues] = useState({});

    const handleAddSubmit = (e) => {
        e.preventDefault();
        if (!newItem.name || !newItem.price) return;
        onAddItem({ ...newItem, id: Date.now(), price: Number(newItem.price) });
        setNewItem({ name: '', price: '', categoryId: categories[0]?.id });
        setIsAdding(false);
    };

    const startEdit = (item) => {
        setEditingId(item.id);
        setEditValues({ ...item });
    };

    const handleEditSave = () => {
        onUpdateItem(editingId, { ...editValues, price: Number(editValues.price) });
        setEditingId(null);
    };

    return (
        <div className="flex-1 flex flex-col bg-white overflow-hidden p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-blue-900 italic">Menu Items Management</h2>
                <button
                    onClick={() => setIsAdding(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 font-bold hover:bg-blue-700"
                >
                    <Plus size={18} /> Add New Item
                </button>
            </div>

            {isAdding && (
                <form onSubmit={handleAddSubmit} className="bg-blue-50 p-4 border border-blue-200 rounded-lg mb-4 flex gap-4 items-end">
                    <div className="flex-1">
                        <label className="block text-xs font-bold text-gray-600 mb-1">Item Name</label>
                        <input
                            type="text"
                            className="w-full border p-2 rounded"
                            value={newItem.name}
                            onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                            required
                        />
                    </div>
                    <div className="w-32">
                        <label className="block text-xs font-bold text-gray-600 mb-1">Price (Rs.)</label>
                        <input
                            type="number"
                            className="w-full border p-2 rounded"
                            value={newItem.price}
                            onChange={e => setNewItem({ ...newItem, price: e.target.value })}
                            required
                        />
                    </div>
                    <div className="w-48">
                        <label className="block text-xs font-bold text-gray-600 mb-1">Category</label>
                        <select
                            className="w-full border p-2 rounded"
                            value={newItem.categoryId}
                            onChange={e => setNewItem({ ...newItem, categoryId: e.target.value })}
                        >
                            {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                        </select>
                    </div>
                    <div className="flex gap-2">
                        <button type="submit" className="bg-green-600 text-white p-2 rounded hover:bg-green-700"><Save size={20} /></button>
                        <button type="button" onClick={() => setIsAdding(false)} className="bg-gray-400 text-white p-2 rounded hover:bg-gray-500"><X size={20} /></button>
                    </div>
                </form>
            )}

            <div className="flex-1 overflow-auto border border-gray-200 rounded-lg">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100 sticky top-0">
                        <tr>
                            <th className="p-3 text-left border-b font-bold">Item Name</th>
                            <th className="p-3 text-left border-b font-bold">Category</th>
                            <th className="p-3 text-right border-b font-bold">Price (Rs.)</th>
                            <th className="p-3 text-center border-b font-bold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item.id} className="border-b hover:bg-gray-50">
                                <td className="p-3">
                                    {editingId === item.id ? (
                                        <input
                                            type="text"
                                            className="border p-1 w-full rounded"
                                            value={editValues.name}
                                            onChange={e => setEditValues({ ...editValues, name: e.target.value })}
                                        />
                                    ) : item.name}
                                </td>
                                <td className="p-3">
                                    {editingId === item.id ? (
                                        <select
                                            className="border p-1 w-full rounded"
                                            value={editValues.categoryId}
                                            onChange={e => setEditValues({ ...editValues, categoryId: e.target.value })}
                                        >
                                            {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                                        </select>
                                    ) : categories.find(c => c.id === item.categoryId)?.name}
                                </td>
                                <td className="p-3 text-right">
                                    {editingId === item.id ? (
                                        <input
                                            type="number"
                                            className="border p-1 w-24 text-right rounded"
                                            value={editValues.price}
                                            onChange={e => setEditValues({ ...editValues, price: e.target.value })}
                                        />
                                    ) : item.price}
                                </td>
                                <td className="p-3">
                                    <div className="flex justify-center gap-2">
                                        {editingId === item.id ? (
                                            <>
                                                <button onClick={handleEditSave} className="text-green-600 hover:bg-green-50 p-1 rounded"><Save size={18} /></button>
                                                <button onClick={() => setEditingId(null)} className="text-gray-600 hover:bg-gray-50 p-1 rounded"><X size={18} /></button>
                                            </>
                                        ) : (
                                            <>
                                                <button onClick={() => startEdit(item)} className="text-blue-600 hover:bg-blue-50 p-1 rounded"><Edit2 size={18} /></button>
                                                <button onClick={() => onRemoveItem(item.id)} className="text-red-500 hover:bg-red-50 p-1 rounded"><Trash2 size={18} /></button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ItemsManager;
