import React from 'react';
import * as LucideIcons from 'lucide-react';

const ControlSidebar = ({ categories, selectedCategory, onSelectCategory, selectedCartItemId, onUpdateQty, onRemoveItem }) => {
    const topActions = [
        { id: 'kot', label: 'KOT Reprint' },
        { id: 'refund', label: 'Refund Item' },
        { id: 'remove', label: 'Remove Item', color: 'text-red-500', onClick: () => selectedCartItemId && onRemoveItem(selectedCartItemId) },
    ];

    const qtyActions = [
        { id: 'plus', label: '+ QTY' },
        { id: 'minus', label: '- QTY' },
    ];

    const bottomActions = [
        { id: 'note', label: 'Note' },
        { id: 'kds', label: 'KDS' },
    ];

    return (
        <div className="w-[320px] flex h-full border-r border-gray-400 shadow-lg">
            {/* Utility Buttons Column */}
            <div className="w-[120px] flex flex-col gap-[2px] p-[2px] border-r border-gray-300 bg-gray-200">
                <div className="flex flex-col gap-1 mb-2 tracking-tight">
                    {topActions.map(action => (
                        <button
                            key={action.id}
                            onClick={action.onClick}
                            className={`h-12 border-2 border-gray-400 bg-white text-[10px] font-black uppercase leading-tight px-2 rounded-lg shadow-sm transition-all ${action.onClick && !selectedCartItemId ? 'opacity-30 cursor-not-allowed' : 'hover:bg-blue-50 hover:border-blue-400 active:scale-95'
                                } ${action.color || 'text-gray-800'}`}
                            disabled={action.onClick && !selectedCartItemId}
                        >
                            {action.label}
                        </button>
                    ))}
                </div>

                <div className="space-y-1 mb-2">
                    {qtyActions.map(action => (
                        <button
                            key={action.id}
                            className={`w-full h-14 border-2 border-blue-200 text-xl font-black shadow-md rounded-xl transition-all ${!selectedCartItemId ? 'opacity-30 cursor-not-allowed' : 'bg-white hover:bg-blue-600 hover:text-white hover:border-blue-700 active:scale-90 text-blue-900'
                                }`}
                            onClick={() => selectedCartItemId && onUpdateQty(selectedCartItemId, action.id === 'plus' ? 1 : -1)}
                            disabled={!selectedCartItemId}
                        >
                            {action.label === '+ QTY' ? '+' : '-'} {action.label.split(' ')[1]}
                        </button>
                    ))}
                </div>

                <div className="flex flex-col gap-1">
                    {bottomActions.map(action => (
                        <button
                            key={action.id}
                            className="h-10 border-2 border-gray-300 bg-white text-[10px] font-black text-gray-700 rounded-lg hover:bg-gray-100 uppercase tracking-tighter"
                        >
                            {action.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Categories Column */}
            <div className="flex-1 flex flex-col gap-[1px] p-[1px] bg-gray-100 overflow-y-auto scrollbar-hide">
                <div className="text-[10px] font-black text-center py-2 text-blue-900 border-b border-gray-300 mb-1 uppercase tracking-tight bg-white sticky top-0 z-10 w-full col-span-2">Categories</div>
                <div className="grid grid-cols-2 gap-1 px-1 pb-2">
                    {categories.map((category) => {
                        const IconComponent = LucideIcons[category.icon] || LucideIcons.Package;
                        const isActive = selectedCategory === category.id;

                        return (
                            <button
                                key={category.id}
                                onClick={() => onSelectCategory(category.id)}
                                className={`flex flex-col items-center justify-center gap-1 p-2 rounded-lg border-2 shadow-sm transition-all min-h-[70px] ${isActive
                                    ? "bg-blue-600 text-white border-blue-700 shadow-md z-10 scale-[1.02]"
                                    : "bg-white text-gray-700 border-gray-200 hover:border-blue-400 hover:shadow-md"
                                    }`}
                            >
                                {category.image ? (
                                    <div className="w-10 h-10 aspect-square flex items-center justify-center bg-white rounded-md overflow-hidden p-0.5">
                                        <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                                    </div>
                                ) : (
                                    <IconComponent size={24} className={isActive ? "text-white" : "text-blue-600"} />
                                )}
                                <span className={`text-[8px] font-black uppercase tracking-tighter text-center leading-tight ${isActive ? "text-white" : "text-gray-800"}`}>
                                    {category.name}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ControlSidebar;
