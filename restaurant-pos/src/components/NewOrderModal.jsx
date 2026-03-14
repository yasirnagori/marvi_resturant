import React, { useState } from 'react';
import { Utensils, ShoppingBag, Truck, User, Phone, MapPin, ArrowRight } from 'lucide-react';

const NewOrderModal = ({ isOpen, onClose, onSelectType, customerDatabase = {} }) => {
    const [step, setStep] = useState('choice'); // 'choice' or 'delivery_info'
    const [deliveryInfo, setDeliveryInfo] = useState({ name: '', phone: '', address: '' });

    if (!isOpen) return null;

    const choices = [
        { type: 'Dine In', icon: Utensils, color: 'bg-blue-100 text-blue-600 hover:bg-blue-200' },
        { type: 'Take Away', icon: ShoppingBag, color: 'bg-green-100 text-green-600 hover:bg-green-200' },
        { type: 'Delivery', icon: Truck, color: 'bg-orange-100 text-orange-600 hover:bg-orange-200' },
    ];

    const handleSelectChoice = (type) => {
        if (type === 'Delivery') {
            setStep('delivery_info');
        } else {
            onSelectType(type);
            resetAndClose();
        }
    };

    const handleDeliverySubmit = (e) => {
        e.preventDefault();
        onSelectType('Delivery', null, deliveryInfo);
        resetAndClose();
    };

    const resetAndClose = () => {
        setStep('choice');
        setDeliveryInfo({ name: '', phone: '', address: '' });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md animate-in fade-in zoom-in duration-200">
                <h2 className="text-2xl font-black text-center mb-6 text-gray-800 italic uppercase tracking-tighter border-b border-gray-100 pb-2">
                    {step === 'choice' ? 'Select Order Type' : 'Delivery Details'}
                </h2>

                {step === 'choice' ? (
                    <div className="grid grid-cols-3 gap-3">
                        {choices.map((choice) => (
                            <button
                                key={choice.type}
                                onClick={() => handleSelectChoice(choice.type)}
                                className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all hover:scale-105 active:scale-95 border border-transparent hover:border-blue-300 shadow-sm ${choice.color}`}
                            >
                                <choice.icon size={32} className="mb-2" />
                                <span className="font-bold text-xs">{choice.type}</span>
                            </button>
                        ))}
                    </div>
                ) : (
                    <form onSubmit={handleDeliverySubmit} className="space-y-4">
                        <div className="space-y-3">
                            <div className="relative">
                                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Customer Name"
                                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                    value={deliveryInfo.name}
                                    onChange={e => setDeliveryInfo({ ...deliveryInfo, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="relative">
                                <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Phone Number"
                                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                    value={deliveryInfo.phone}
                                    onChange={e => {
                                        const phone = e.target.value;
                                        setDeliveryInfo(prev => {
                                            const updated = { ...prev, phone };
                                            if (customerDatabase[phone]) {
                                                updated.name = customerDatabase[phone].name;
                                                updated.address = customerDatabase[phone].address;
                                            }
                                            return updated;
                                        });
                                    }}
                                    required
                                />
                            </div>
                            <div className="relative">
                                <MapPin size={16} className="absolute left-3 top-3 text-gray-400" />
                                <textarea
                                    placeholder="Delivery Address"
                                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 min-h-[80px]"
                                    value={deliveryInfo.address}
                                    onChange={e => setDeliveryInfo({ ...deliveryInfo, address: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                            <button
                                type="button"
                                onClick={() => setStep('choice')}
                                className="flex-1 py-3 text-gray-500 font-bold hover:bg-gray-100 rounded-xl"
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                className="flex-1 py-3 bg-orange-500 text-white font-black rounded-xl shadow-lg hover:bg-orange-600 active:scale-95 flex items-center justify-center gap-2"
                            >
                                NEXT <ArrowRight size={18} />
                            </button>
                        </div>
                    </form>
                )}

                {step === 'choice' && (
                    <button
                        onClick={onClose}
                        className="mt-6 w-full py-2 text-gray-400 hover:text-gray-800 font-bold text-xs uppercase"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </div>
    );
};

export default NewOrderModal;
