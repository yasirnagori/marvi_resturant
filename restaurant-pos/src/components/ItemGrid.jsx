import React, { useState } from 'react';
import { Search, Monitor } from 'lucide-react';

const ItemGrid = ({ items, cartItems = [], onAddToCart }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#e2e8f0]">
            {/* Search Header */}
            <div className="p-2 bg-gray-300 border-b border-gray-400 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 sticky top-0 z-10">
                    <span className="text-xs font-bold text-gray-700">Items :</span>
                    <div className="relative w-72">
                        <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
                        <input
                            type="text"
                            placeholder="Search items..."
                            className="w-full pl-7 pr-2 h-7 border border-gray-400 focus:outline-none text-xs"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-1 bg-white border border-gray-300 px-2 py-1 rounded text-green-700 text-[10px] font-bold">
                    <Monitor size={12} />
                    <span>Online</span>
                </div>
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-y-auto p-2 scrollbar-hide">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
                    {filteredItems.map((item) => {
                        const isInCart = cartItems.some(i => i.id === item.id);
                        return (
                            <div
                                key={item.id}
                                onClick={() => onAddToCart(item)}
                                className={`bg-white p-2 border-2 rounded-lg cursor-pointer shadow-sm flex flex-col items-center text-center gap-2 min-h-[140px] transition-all transform active:scale-95 ${
                                    isInCart 
                                    ? "border-blue-600 ring-2 ring-blue-500/20 z-10 scale-[1.02]" 
                                    : "border-gray-200 hover:border-blue-400 hover:shadow-md"
                                }`}
                            >
                                <div className="w-full aspect-square bg-gray-50 flex items-center justify-center border border-gray-100 overflow-hidden rounded-md relative text-center">
                                    {isInCart && (
                                        <div className="absolute top-1 right-1 bg-blue-600 text-white p-1 rounded-full shadow-lg z-20">
                                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                        </div>
                                    )}
                                    {item.name === 'Delivery Charges' ? (
                                        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-500 gap-2">
                                            <span className="text-xs font-bold text-center px-2">Delivery</span>
                                        </div>
                                    ) : (
                                        <img 
                                            src={item.image ? item.image : `https://placehold.co/100x100?text=${item.name.split(' ')[0]}`} 
                                            alt={item.name} 
                                            className="w-full h-full object-cover p-1 bg-white" 
                                        />
                                    )}
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] font-black text-gray-800 leading-tight uppercase tracking-tight">
                                        {item.name}
                                    </span>
                                    <span className="text-[10px] text-blue-700 font-bold">Rs. {item.price}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ItemGrid;
