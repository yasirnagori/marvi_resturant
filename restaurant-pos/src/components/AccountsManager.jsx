import React from 'react';
import { Landmark, Lock, Unlock, Calendar, ArrowLeft } from 'lucide-react';

const AccountsManager = ({ dailySales = 0, onBack, isCashDrawerOpen, setIsCashDrawerOpen }) => {
    const today = new Date().toLocaleDateString('en-PK', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="flex-1 bg-[#f8fafc] p-10 flex flex-col items-center justify-center relative">
            {!isCashDrawerOpen ? (
                <div className="w-full max-w-md bg-white border border-gray-300 rounded-xl shadow-lg p-10 text-center space-y-6">
                    <div className="bg-blue-900 w-20 h-20 rounded-full flex items-center justify-center text-white mx-auto shadow-xl">
                        <Landmark size={40} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-blue-900 italic">CASH DRAWER</h2>
                        <p className="text-gray-500 font-bold mt-1 uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                            <Calendar size={14} /> {today}
                        </p>
                    </div>

                    <div className="space-y-3">
                        <button
                            onClick={() => {
                                setIsCashDrawerOpen(true);
                                onBack();
                            }}
                            className="w-full bg-blue-600 text-white font-black py-4 rounded-lg shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-3 active:scale-95"
                        >
                            <Unlock size={20} /> OPEN CASH DRAWER
                        </button>
                        <button
                            onClick={onBack}
                            className="w-full bg-gray-100 text-blue-900 font-bold py-3 rounded-lg border border-gray-300 hover:bg-white transition-all flex items-center justify-center gap-2 text-sm active:scale-95"
                        >
                            <ArrowLeft size={18} /> BACK TO POS
                        </button>
                    </div>
                </div>
            ) : (
                <div className="w-full max-w-md bg-white border border-gray-300 rounded-xl shadow-lg p-10 text-center space-y-6">
                    <div className="bg-green-600 w-20 h-20 rounded-full flex items-center justify-center text-white mx-auto shadow-xl animate-pulse">
                        <Unlock size={40} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-green-700 italic uppercase">Drawer is Open</h2>
                        <p className="text-gray-400 font-bold mt-1 uppercase tracking-widest text-[10px]">Active Session: {today}</p>
                    </div>

                    <div className="py-6 border-y border-gray-100 italic">
                        <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-2">Total Sales Today</p>
                        <p className="text-4xl font-black text-blue-900">Rs. {dailySales.toLocaleString()}</p>
                    </div>

                    <div className="space-y-3">
                        <button
                            onClick={() => {
                                alert(`Closing Day Summary\nTotal Sales: Rs. ${dailySales}`);
                                setIsCashDrawerOpen(false);
                            }}
                            className="w-full bg-red-600 text-white font-black py-4 rounded-lg shadow-lg hover:bg-red-700 transition-all flex items-center justify-center gap-3 active:scale-95 uppercase tracking-tighter"
                        >
                            <Lock size={20} /> Close Cash Drawer
                        </button>
                        <button
                            onClick={onBack}
                            className="w-full bg-gray-100 text-blue-900 font-bold py-3 rounded-lg border border-gray-300 hover:bg-white transition-all flex items-center justify-center gap-2 text-sm active:scale-95"
                        >
                            <ArrowLeft size={18} /> BACK TO POS
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AccountsManager;
