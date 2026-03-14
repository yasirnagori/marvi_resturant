import React from 'react';
import { Trash2, Plus, Minus, Printer, CheckCircle, RotateCcw } from 'lucide-react';

const OrderSummary = ({ cartItems, onUpdateQty, onRemoveItem, onNewOrder, orderType }) => {
    const subTotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const total = subTotal; // Add tax/charges here if needed later

    return (
        <div className="w-[350px] bg-white border-l shadow-xl flex flex-col h-full z-10">
            {/* Header */}
            <div className="p-4 bg-gray-800 text-white flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold">Current Order</h2>
                    <div className="text-sm opacity-80 flex items-center gap-1">
                        <span className="bg-primary px-2 py-0.5 rounded text-xs font-bold uppercase">{orderType || 'None'}</span>
                        #{Math.floor(Math.random() * 1000)}
                    </div>
                </div>
                <button
                    onClick={onNewOrder}
                    className="bg-primary hover:bg-orange-600 text-white px-3 py-1 rounded-md text-sm font-semibold transition-colors shadow-sm"
                >
                    New Order
                </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-2">
                {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                        <div className="bg-gray-100 p-4 rounded-full mb-2">
                            <RotateCcw size={32} />
                        </div>
                        <p>No items added yet</p>
                    </div>
                ) : (
                    cartItems.map((item, index) => (
                        <div key={`${item.id}-${index}`} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border">
                            <div className="flex-1">
                                <div className="font-semibold text-gray-800 text-sm">{item.name}</div>
                                <div className="text-xs text-gray-500">Rs. {item.price} x {item.qty}</div>
                            </div>

                            <div className="font-bold text-gray-700 min-w-[60px] text-right">
                                {item.price * item.qty}
                            </div>

                            <div className="flex items-center gap-1 bg-white border rounded-md">
                                <button
                                    onClick={() => onUpdateQty(item.id, -1)}
                                    className="p-1 hover:bg-red-50 text-red-500 rounded-l"
                                >
                                    <Minus size={14} />
                                </button>
                                <div className="w-6 text-center text-sm font-bold">{item.qty}</div>
                                <button
                                    onClick={() => onUpdateQty(item.id, 1)}
                                    className="p-1 hover:bg-green-50 text-green-600 rounded-r"
                                >
                                    <Plus size={14} />
                                </button>
                            </div>

                            <button
                                onClick={() => onRemoveItem(item.id)}
                                className="text-gray-400 hover:text-red-500 p-1"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))
                )}
            </div>

            {/* Footer / Total */}
            <div className="p-4 bg-gray-100 border-t space-y-3">
                <div className="flex justify-between items-center text-lg font-bold text-gray-800">
                    <span>Total</span>
                    <span className="text-2xl text-primary">Rs. {total}</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <button className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold transition-colors">
                        <Printer size={18} />
                        Print
                    </button>
                    <button className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors shadow-sm">
                        <CheckCircle size={18} />
                        Pay & Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
