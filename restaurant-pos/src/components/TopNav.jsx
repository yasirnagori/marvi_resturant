import React from 'react';
import { Search, User, Wifi } from 'lucide-react';

const TopNav = ({ activeTab, onSelectTab }) => {
    const tabs = ["Open Orders", "Items", "Accounts", "Reports"];

    return (
        <div className="h-10 bg-[#cbd5e1] border-b border-gray-400 flex items-center justify-between px-2 text-sm font-medium">
            <div className="flex h-full">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => onSelectTab(tab)}
                        className={`px-4 h-full border-r border-gray-400 flex items-center transition-colors ${activeTab === tab
                                ? "bg-[#f1f5f9] border-t-2 border-t-blue-500 shadow-inner text-blue-800"
                                : "hover:bg-gray-200 text-gray-700"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

        </div>
    );
};

export default TopNav;
