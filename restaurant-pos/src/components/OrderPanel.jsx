import React from 'react';
import { Printer, Plus, User, FileText, Scan, RefreshCcw, Phone, MapPin } from 'lucide-react';

const OrderPanel = ({ cartItems, selectedCartItemId, onSelectItem, onUpdateQty, onRemoveItem, onNewOrder, onCloseOrder, onParkOrder, orderType, rider, customerInfo }) => {
    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);

    return (
        <div className="w-[380px] flex flex-col h-full bg-[#f1f5f9] border-r border-gray-400">
            {/* Header Info */}
            <div className="p-2 space-y-1 text-xs font-bold border-b border-gray-300">
                <div className="flex justify-between">
                    <span>Order No : <span className="text-gray-700 italic">{orderType ? `SL${Date.now().toString().slice(-4)}` : 'N/A'}</span></span>
                    <span className={`text-[10px] font-black uppercase ${orderType ? 'text-green-600' : 'text-red-500'}`}>
                        {orderType ? `[ ${orderType}${rider ? ` - ${rider}` : ''} ]` : '[ NO ACTIVE SESSION ]'}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-500">Start : {orderType ? new Date().toLocaleTimeString() : '--:--:--'}</span>
                    {orderType && (
                        <button
                            onClick={onParkOrder}
                            className="text-[9px] bg-orange-100 text-orange-700 border border-orange-300 px-1.5 py-0.5 rounded-full hover:bg-orange-200 transition-colors font-black uppercase"
                        >
                            PARK
                        </button>
                    )}
                </div>

                {orderType === 'Delivery' && customerInfo && (
                    <div className="mt-2 p-2 bg-blue-50 border border-blue-100 rounded-lg space-y-1">
                        <div className="flex justify-between items-center text-[10px]">
                            <span className="font-black text-blue-900 truncate flex items-center gap-1 uppercase">
                                <User size={12} /> {customerInfo.name}
                            </span>
                            <span className="font-bold text-blue-700 flex items-center gap-1">
                                <Phone size={12} /> {customerInfo.phone}
                            </span>
                        </div>
                        <div className="text-[9px] text-gray-600 italic border-t border-blue-100 pt-1 flex items-start gap-1">
                            <MapPin size={12} className="flex-shrink-0 mt-0.5" />
                            <span className="leading-tight">{customerInfo.address}</span>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-[60px_1fr_30px] items-center gap-1 pt-1">
                    <label className="text-gray-600">Waiter :</label>
                    <input type="text" className="border border-gray-300 bg-white h-6 px-1 focus:outline-none" />
                    <button className="border border-gray-300 bg-white h-6 flex items-center justify-center"><Printer size={14} /></button>
                </div>

                <div className="grid grid-cols-[60px_1fr] items-center gap-1">
                    <label className="text-gray-600">Desc :</label>
                    <input type="text" className="border border-gray-300 bg-white h-6 px-1 focus:outline-none" />
                </div>

                <div className="grid grid-cols-[60px_1fr_30px] items-center gap-1">
                    <label className="text-gray-600">Scan :</label>
                    <input type="text" className="border border-gray-300 bg-white h-6 px-1 focus:outline-none" />
                    <button className="bg-green-600 text-white h-6 flex items-center justify-center rounded"><Plus size={14} /></button>
                </div>
            </div>

            {/* Cart Table */}
            <div className="flex-1 overflow-auto bg-white m-1 border border-gray-300">
                <table className="w-full text-left border-collapse text-[10px]">
                    <thead className="sticky top-0 bg-[#f8fafc] border-b border-gray-300 font-bold">
                        <tr>
                            <th className="p-1 border-r border-gray-300">Item</th>
                            <th className="p-1 border-r border-gray-300 text-right w-12">Price</th>
                            <th className="p-1 border-r border-gray-300 text-center w-8">QTY</th>
                            <th className="p-1 text-right w-12">Amt</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item) => (
                            <tr
                                key={item.id}
                                className={`border-b border-gray-200 cursor-pointer transition-colors ${selectedCartItemId === item.id ? 'bg-blue-100 font-bold' : 'hover:bg-blue-50'
                                    }`}
                                onClick={() => onSelectItem(item.id)}
                            >
                                <td className="p-1 border-r border-gray-300 max-w-[120px] truncate">{item.name}</td>
                                <td className="p-1 border-r border-gray-300 text-right">{item.price}</td>
                                <td className="p-1 border-r border-gray-300 text-center">{item.qty}</td>
                                <td className="p-1 text-right font-bold">{item.price * item.qty}</td>
                            </tr>
                        ))}
                        {/* Empty rows to maintain table look if needed */}
                        {Array.from({ length: Math.max(0, 15 - cartItems.length) }).map((_, i) => (
                            <tr key={`empty-${i}`} className="border-b border-gray-50 h-5">
                                <td className="p-1 border-r border-gray-300"></td>
                                <td className="p-1 border-r border-gray-300"></td>
                                <td className="p-1 border-r border-gray-300"></td>
                                <td className="p-1"></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Totals Section */}
            <div className="p-2 border-t border-gray-400 bg-gray-100 font-bold text-xs space-y-1">
                <div className="flex justify-between">
                    <span>Sub Total :</span>
                    <span>{subtotal}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span>Received :</span>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 font-normal">Cash</span>
                        <span>0</span>
                        <button className="bg-green-600 text-white rounded-[2px] p-[2px]"><Plus size={12} /></button>
                    </div>
                </div>
            </div>

            {/* Bottom Actions Removed - Moved to Global Footer */}
        </div>
    );
};

export default OrderPanel;
