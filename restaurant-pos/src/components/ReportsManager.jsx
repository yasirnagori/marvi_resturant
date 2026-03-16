import React, { useState } from 'react';
import { BarChart3, Filter, Bike, Search, Utensils, ChevronDown, ChevronUp } from 'lucide-react';

const ReportsManager = ({ orders = [] }) => {
    const [filterType, setFilterType] = useState('All');
    const [selectedRider, setSelectedRider] = useState('All');
    const [expandedOrderId, setExpandedOrderId] = useState(null);

    const riders = ["Anas", "Junaid", "Samad", "Nagori", "Punjabi"];

    const filteredOrders = orders.filter(order => {
        if (filterType !== 'All' && order.type !== filterType) return false;
        if (filterType === 'Delivery' && selectedRider !== 'All' && order.rider !== selectedRider) return false;
        return true;
    });

    const totalSales = filteredOrders.reduce((acc, o) => acc + o.total, 0);

    const riderStats = riders.map(riderName => ({
        name: riderName,
        count: orders.filter(o => o.type === 'Delivery' && o.rider === riderName).length,
        total: orders.filter(o => o.type === 'Delivery' && o.rider === riderName).reduce((acc, o) => acc + o.total, 0)
    }));

    return (
        <div className="flex-1 flex flex-col bg-white overflow-hidden p-6">
            <div className="flex justify-between items-end mb-8 border-b pb-4">
                <div>
                    <h2 className="text-2xl font-black text-gray-800 uppercase tracking-tighter flex items-center gap-3">
                        <BarChart3 size={28} className="text-blue-800" />
                        Sales Report
                    </h2>
                    <p className="text-gray-500 text-sm italic">Categorized breakdown of today's performance</p>
                </div>

                <div className="flex gap-4">
                    <div className="bg-gray-100 p-1 rounded-lg flex border">
                        {['All', 'Dine In', 'Take Away', 'Delivery'].map(type => (
                            <button
                                key={type}
                                onClick={() => setFilterType(type)}
                                className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${filterType === type
                                        ? "bg-white text-blue-900 shadow-sm border border-gray-200"
                                        : "text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>

                    {filterType === 'Delivery' && (
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-gray-600 uppercase flex items-center gap-1">
                                <Bike size={14} /> Rider:
                            </span>
                            <select
                                className="border p-1.5 text-xs rounded font-bold bg-white"
                                value={selectedRider}
                                onChange={e => setSelectedRider(e.target.value)}
                            >
                                <option value="All">All Riders</option>
                                {riders.map(r => <option key={r} value={r}>{r}</option>)}
                            </select>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-4 gap-6 mb-8">
                <StatCard label="Total Orders" value={filteredOrders.length} icon={<Search className="text-blue-500" />} />
                <StatCard label="Total Sales" value={`Rs. ${totalSales.toLocaleString()}`} icon={<DollarSignIcon className="text-green-500" />} />
                <StatCard label="Dine In" value={orders.filter(o => o.type === 'Dine In').length} icon={<Utensils className="text-orange-500" />} />
                <StatCard label="Delivery" value={orders.filter(o => o.type === 'Delivery').length} icon={<Bike className="text-purple-500" />} />
            </div>

            <div className="flex gap-6 flex-1 overflow-hidden">
                <div className="flex-[2] flex flex-col overflow-hidden border border-gray-300 rounded-xl shadow-sm">
                    <div className="bg-gray-100 p-3 border-b text-[10px] font-black uppercase tracking-widest text-gray-600">Order Logs</div>
                    <div className="flex-1 overflow-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#1e3a8a] text-white sticky top-0 uppercase text-[10px] font-black tracking-widest z-10">
                                <tr>
                                    <th className="p-3">Order ID</th>
                                    <th className="p-3">Type</th>
                                    <th className="p-3">Items</th>
                                    <th className="p-3">Rider/Waiter</th>
                                    <th className="p-3 text-right">Total</th>
                                    <th className="p-3 text-center w-10"></th>
                                </tr>
                            </thead>
                            <tbody className="text-xs">
                                {filteredOrders.length > 0 ? filteredOrders.map(order => (
                                    <React.Fragment key={order.id}>
                                        <tr 
                                            className={`border-b transition-colors cursor-pointer ${expandedOrderId === order.id ? 'bg-blue-50' : 'hover:bg-blue-50/50'}`}
                                            onClick={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)}
                                        >
                                            <td className="p-3 font-mono text-blue-800 font-bold">{order.id}</td>
                                            <td className="p-3">
                                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${order.type === 'Dine In' ? 'bg-orange-100 text-orange-700' :
                                                        order.type === 'Take Away' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'
                                                    }`}>
                                                    {order.type}
                                                </span>
                                            </td>
                                            <td className="p-3 text-gray-600 font-bold">{order.cartItems ? order.cartItems.length : order.itemsCount} items</td>
                                            <td className="p-3 font-medium">{order.rider || order.waiter || '-'}</td>
                                            <td className="p-3 text-right font-black text-green-700">Rs. {order.total.toLocaleString()}</td>
                                            <td className="p-3 text-center text-gray-400">
                                                {expandedOrderId === order.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                            </td>
                                        </tr>
                                        {expandedOrderId === order.id && (
                                            <tr className="bg-gray-50 border-b border-blue-200">
                                                <td colSpan="6" className="p-4">
                                                    <div className="flex gap-6">
                                                        <div className="flex-[2] bg-white border rounded p-3">
                                                            <h4 className="text-[10px] font-black uppercase text-gray-500 mb-2 border-b pb-1">Order Items</h4>
                                                            <div className="space-y-1">
                                                                {order.cartItems ? order.cartItems.map((item, idx) => (
                                                                    <div key={idx} className="flex justify-between text-xs py-1 border-b border-dashed border-gray-200 last:border-0">
                                                                        <span className="font-medium text-gray-700">{item.qty}x {item.name}</span>
                                                                        <span className="font-bold text-gray-600">{(item.price * item.qty).toLocaleString()}</span>
                                                                    </div>
                                                                )) : <span className="text-xs text-gray-400 italic">Item details not available in log</span>}
                                                            </div>
                                                            <div className="flex justify-between text-xs font-black mt-2 pt-2 border-t">
                                                                <span>TOTAL AMOUNT</span>
                                                                <span className="text-green-600">Rs. {order.total.toLocaleString()}</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex-1 bg-white border rounded p-3 flex flex-col gap-3">
                                                            <div>
                                                                <h4 className="text-[10px] font-black uppercase text-gray-500 mb-1">Order Details</h4>
                                                                <p className="text-xs font-medium"><span className="text-gray-400">Time:</span> {order.time || 'N/A'}</p>
                                                                <p className="text-xs font-medium"><span className="text-gray-400">Status:</span> Completed</p>
                                                            </div>
                                                            {order.customerInfo && (
                                                                <div className="pt-2 border-t">
                                                                    <h4 className="text-[10px] font-black uppercase text-gray-500 mb-1">Customer Info</h4>
                                                                    <p className="text-xs font-bold text-gray-800">{order.customerInfo.name}</p>
                                                                    <p className="text-[10px] font-medium text-gray-600">{order.customerInfo.phone}</p>
                                                                    <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">{order.customerInfo.address}</p>
                                                                </div>
                                                            )}
                                                            {order.rider && (
                                                                 <div className="pt-2 border-t">
                                                                 <h4 className="text-[10px] font-black uppercase text-gray-500 mb-1">Assigned Rider</h4>
                                                                 <p className="text-xs font-bold text-blue-800 flex items-center gap-1"><Bike size={12}/> {order.rider}</p>
                                                             </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                )) : (
                                    <tr>
                                        <td colSpan="5" className="p-20 text-center text-gray-400 italic">No orders found for this selection</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex-1 flex flex-col overflow-hidden border border-gray-300 rounded-xl shadow-sm bg-gray-50">
                    <div className="bg-gray-100 p-3 border-b text-[10px] font-black uppercase tracking-widest text-gray-600">Rider Performance</div>
                    <div className="p-3 space-y-2 overflow-y-auto max-h-full scrollbar-hide">
                        {riderStats.map(rider => (
                            <div key={rider.name} className="bg-white p-2.5 rounded-lg border border-gray-200 shadow-sm flex items-center justify-between transition-all hover:border-blue-300 overflow-hidden">
                                <div className="flex-1 min-w-0">
                                    <p className="text-[9px] font-black text-blue-900 uppercase tracking-tight truncate">{rider.name}</p>
                                    <p className="text-sm font-black text-gray-800 leading-tight">
                                        {rider.count} <span className="text-[8px] text-gray-400 font-bold uppercase tracking-widest ml-1">Orders</span>
                                    </p>
                                </div>
                                <div className="text-right flex-shrink-0">
                                    <p className="text-[7px] font-bold text-gray-400 uppercase tracking-widest">Revenue</p>
                                    <p className="text-[10px] font-black text-green-600">Rs. {rider.total.toLocaleString()}</p>
                                </div>
                            </div>
                        ))}
                        {riderStats.length === 0 && <p className="text-center text-[10px] text-gray-400 italic py-10 uppercase font-bold tracking-widest">No Rider Data</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ label, value, icon }) => (
    <div className="bg-white border-2 border-gray-100 p-5 rounded-2xl flex items-center justify-between shadow-sm">
        <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">{label}</p>
            <p className="text-2xl font-black text-gray-800 leading-none">{value}</p>
        </div>
        <div className="bg-gray-50 p-2.5 rounded-xl">{icon}</div>
    </div>
);

const DollarSignIcon = (props) => (
    <svg {...props} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"></line>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>
);

export default ReportsManager;
