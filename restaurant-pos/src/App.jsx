import React, { useState, useMemo } from 'react';
import TopNav from './components/TopNav';
import { Truck } from 'lucide-react';
import OrderPanel from './components/OrderPanel';
import ControlSidebar from './components/ControlSidebar';
import ItemGrid from './components/ItemGrid';
import ItemsManager from './components/ItemsManager';
import CategoryManager from './components/CategoryManager';
import AccountsManager from './components/AccountsManager';
import ReportsManager from './components/ReportsManager';
import NewOrderModal from './components/NewOrderModal';
import { categories as initialCategories, menuItems as initialMenuItems } from './data/menu';

function App() {
  const [activeTab, setActiveTab] = useState("Open Orders");
  const [categories, setCategories] = useState(initialCategories);
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [activeOrders, setActiveOrders] = useState([]);
  const [isCashDrawerOpen, setIsCashDrawerOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(categories[0]?.id);
  const [cartItems, setCartItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderType, setOrderType] = useState(null); // null means no active order session
  const [selectedRider, setSelectedRider] = useState(null);
  const [customerInfo, setCustomerInfo] = useState(null); // stores {name, phone, address}
  const [selectedCartItemId, setSelectedCartItemId] = useState(null);
  const [riders] = useState(["Anas", "Junaid", "Samad", "Nagori", "Punjabi"]);
  const [waiters] = useState(["Sikku", "Kamran", "Jatoi"]);
  const [customerDatabase, setCustomerDatabase] = useState({}); // { phone: { name, address } }
  
  const [selectedWaiter, setSelectedWaiter] = useState(null);
  const [showRiderSelect, setShowRiderSelect] = useState(false);
  const [showWaiterSelect, setShowWaiterSelect] = useState(false);

  // Keypad State
  const [deliveryKeypadOpen, setDeliveryKeypadOpen] = useState(false);
  const [deliveryAmount, setDeliveryAmount] = useState('');
  const [pendingDeliveryItem, setPendingDeliveryItem] = useState(null);

  // Filter items based on category
  const currentItems = menuItems.filter(item => item.categoryId === selectedCategory);

  const handleAddToCart = (item) => {
    if (!isCashDrawerOpen) {
      alert("Open cash drawer first!");
      return;
    }
    if (!orderType) {
      alert("Please click 'New Order' to start a session before selecting items.");
      return;
    }

    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      
      if (item.name === 'Delivery Charges') {
        if (orderType !== 'Delivery') {
          alert("Delivery charges can only be added to Delivery orders.");
          return prev;
        }
        setPendingDeliveryItem(item);
        setDeliveryAmount('');
        setDeliveryKeypadOpen(true);
        return prev;
      }

      if (existing) {
        // Just select it, don't increment
        setSelectedCartItemId(item.id);
        return prev;
      }

      // New item
      const newItem = { ...item, qty: 1 };
      setSelectedCartItemId(item.id);
      return [...prev, newItem];
    });
  };

  const handleUpdateQty = (itemId, change) => {
    setCartItems(prev => {
      const updated = prev.map(item => {
        if (item.id === itemId) {
          const newQty = item.qty + change;
          return newQty > 0 ? { ...item, qty: newQty } : item;
        }
        return item;
      });
      return updated;
    });
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
    if (selectedCartItemId === itemId) setSelectedCartItemId(null);
  };

  const handleNewOrder = () => {
    if (!isCashDrawerOpen) {
      alert("Open cash drawer first!");
      return;
    }
    if (orderType) {
      if (cartItems.length > 0) {
        handleParkOrder(); 
      } else {
        setOrderType(null);
        setSelectedRider(null);
        setSelectedWaiter(null);
        setCustomerInfo(null);
      }
    }
    setIsModalOpen(true);
  };

  const handleSelectOrderType = (type, rider = null, custInfo = null) => {
    setOrderType(type);
    setSelectedRider(rider);
    setSelectedWaiter(null);
    setCustomerInfo(custInfo);
    if (custInfo && custInfo.phone) {
       setCustomerDatabase(prev => ({
         ...prev,
         [custInfo.phone]: { name: custInfo.name, address: custInfo.address }
       }));
    }
    setIsModalOpen(false);
    setCartItems([]);
    setSelectedCartItemId(null);
  };

  const handleControlAction = (actionId) => {
    if (actionId === 'plus') {
      // Logic for selected item QTY could go here
    }
  };

  // Management Handlers
  const handleAddItem = (item) => setMenuItems(prev => [item, ...prev]);
  const handleUpdateItem = (id, updated) => setMenuItems(prev => prev.map(i => i.id === id ? updated : i));
  const handleRemoveMenuItem = (id) => setMenuItems(prev => prev.filter(i => i.id !== id));

  const handleAddCategory = (cat) => setCategories(prev => [...prev, cat]);
  const handleRemoveCategory = (id) => setCategories(prev => prev.filter(c => c.id !== id));

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const dailySales = completedOrders.reduce((acc, o) => acc + o.total, 0);

  const handleCloseOrder = () => {
    if (!orderType || cartItems.length === 0) return;
    const newOrder = {
      id: `SL${Date.now().toString().slice(-8)}`,
      type: orderType,
      itemsCount: cartItems.reduce((acc, i) => acc + i.qty, 0),
      total: cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0),
      rider: selectedRider,
      waiter: selectedWaiter
    };
    setCompletedOrders(prev => [newOrder, ...prev]);
    setCartItems([]);
    setOrderType(null);
    setSelectedRider(null);
    setSelectedWaiter(null);
    alert("Order Closed Successfully!");
  };

  const handleParkOrder = () => {
    if (!orderType || cartItems.length === 0) return;
    const parkedOrder = {
      id: `PK${Date.now().toString().slice(-6)}`,
      type: orderType,
      rider: selectedRider,
      waiter: selectedWaiter,
      cartItems: [...cartItems],
      time: new Date().toLocaleTimeString()
    };
    setActiveOrders(prev => [parkedOrder, ...prev]);
    setOrderType(null);
    setCartItems([]);
    setSelectedRider(null);
    setSelectedWaiter(null);
  };

  const resumeOrder = (order) => {
    setOrderType(order.type);
    setSelectedRider(order.rider);
    setSelectedWaiter(order.waiter);
    setCartItems(order.cartItems);
    setActiveOrders(prev => prev.filter(o => o.id !== order.id));
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-white text-gray-900 font-sans select-none">
      {/* Top Navigation Bar */}
      <TopNav activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">

        {activeTab === "Open Orders" && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Open Orders Bar */}
            <div className="h-10 bg-gray-100 border-b border-gray-400 flex items-center px-2 gap-2 overflow-x-auto scrollbar-hide">
              <span className="text-[10px] font-black text-blue-900 uppercase italic whitespace-nowrap">Open Orders :</span>
              {activeOrders.map(o => (
                <button
                  key={o.id}
                  onClick={() => resumeOrder(o)}
                  className="h-7 px-3 bg-white border border-blue-400 rounded text-[9px] font-bold text-blue-800 flex items-center gap-2 hover:bg-blue-50 transition-colors shadow-sm"
                >
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  {o.type} ({o.id})
                </button>
              ))}
              {activeOrders.length === 0 && <span className="text-[9px] text-gray-400 italic">No open sessions</span>}
            </div>

            <div className="flex-1 flex overflow-hidden">
              {/* Left Column: Order Details */}
              <OrderPanel
                cartItems={cartItems}
                selectedCartItemId={selectedCartItemId}
                onSelectItem={setSelectedCartItemId}
                onUpdateQty={handleUpdateQty}
                onRemoveItem={handleRemoveItem}
                onNewOrder={handleNewOrder}
                onCloseOrder={handleCloseOrder}
                onParkOrder={handleParkOrder}
                orderType={orderType}
                rider={selectedRider}
                customerInfo={customerInfo}
              />

              {/* Middle Column: Controls & Categories */}
              <ControlSidebar
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                selectedCartItemId={selectedCartItemId}
                onUpdateQty={handleUpdateQty}
                onRemoveItem={handleRemoveItem}
              />

              {/* Right Column: Items Grid */}
              <ItemGrid
                items={currentItems}
                onAddToCart={handleAddToCart}
              />
            </div>
          </div>
        )}

        {activeTab === "Items" && (
          <>
            <ItemsManager
              items={menuItems}
              categories={categories}
              onAddItem={handleAddItem}
              onUpdateItem={handleUpdateItem}
              onRemoveItem={handleRemoveMenuItem}
            />
            <CategoryManager
              categories={categories}
              onAddCategory={handleAddCategory}
              onRemoveCategory={handleRemoveCategory}
            />
          </>
        )}

        {activeTab === "Accounts" && (
          <AccountsManager 
            dailySales={dailySales} 
            onBack={() => setActiveTab("Open Orders")} 
            isCashDrawerOpen={isCashDrawerOpen}
            setIsCashDrawerOpen={setIsCashDrawerOpen}
          />
        )}

        {activeTab === "Reports" && (
          <ReportsManager orders={completedOrders} />
        )}

      </div>

      {/* Global Action Footer */}
      <div className="h-14 bg-gray-800 border-t border-gray-700 flex items-center justify-between px-4 gap-2 shadow-[0_-4px_10px_rgba(0,0,0,0.1)]">
        <div className="flex items-center gap-2">
          <button
            onClick={handleNewOrder}
            className="h-10 px-6 bg-white text-blue-900 font-black rounded-lg hover:bg-gray-100 transition-all flex items-center gap-2 uppercase tracking-tight text-sm active:scale-95 shadow-sm"
          >
            New Order
          </button>
          <div className="flex items-center gap-1 ml-2 relative">
            {/* Rider / Waiter Logic block */}
            {orderType === 'Delivery' && (
              <>
                <button
                  className="h-10 px-4 font-bold rounded-lg border flex items-center gap-2 text-xs transition-all bg-orange-500 text-white border-orange-400 hover:bg-orange-600"
                  onClick={() => setShowRiderSelect(!showRiderSelect)}
                >
                  <Truck size={16} /> ASSIGN RIDER {selectedRider ? `: ${selectedRider}` : ''}
                </button>
                {showRiderSelect && (
                  <div className="absolute bottom-12 left-0 w-48 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
                    <div className="bg-gray-100 text-gray-700 text-xs font-bold px-3 py-2 border-b border-gray-200">Select Rider</div>
                    <div className="flex flex-col max-h-48 overflow-y-auto">
                      {riders.map((r) => (
                        <button
                          key={r}
                          className="px-3 py-2 text-left text-sm font-semibold hover:bg-blue-50 text-gray-800 border-b border-gray-100 last:border-0"
                          onClick={() => { setSelectedRider(r); setShowRiderSelect(false); }}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {orderType === 'Dine In' && (
              <>
                <button
                  className="h-10 px-4 font-bold rounded-lg border flex items-center gap-2 text-xs transition-all bg-purple-500 text-white border-purple-400 hover:bg-purple-600"
                  onClick={() => setShowWaiterSelect(!showWaiterSelect)}
                >
                  <Truck size={16} /> ASSIGN WAITER {selectedWaiter ? `: ${selectedWaiter}` : ''}
                </button>
                {showWaiterSelect && (
                  <div className="absolute bottom-12 left-0 w-48 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
                    <div className="bg-gray-100 text-gray-700 text-xs font-bold px-3 py-2 border-b border-gray-200">Select Waiter</div>
                    <div className="flex flex-col">
                      {waiters.map((w) => (
                        <button
                          key={w}
                          className="px-3 py-2 text-left text-sm font-semibold hover:bg-blue-50 text-gray-800 border-b border-gray-100 last:border-0"
                          onClick={() => { setSelectedWaiter(w); setShowWaiterSelect(false); }}
                        >
                          {w}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {orderType !== 'Delivery' && orderType !== 'Dine In' && (
              <button
                className="h-10 px-4 font-bold rounded-lg border flex items-center gap-2 text-xs transition-all bg-blue-800/50 text-white/50 border-blue-700/50 cursor-not-allowed"
                disabled
              >
                <Truck size={16} /> ASSIGN...
              </button>
            )}
            <button
              className="h-10 px-4 bg-blue-800 text-white font-bold rounded-lg border border-blue-700 hover:bg-blue-700 text-xs transition-colors"
              onClick={() => alert("Payment Process Started...")}
            >
              PAYMENT
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert("Printing Bill...")}
            className="h-10 px-4 bg-white/10 text-white font-bold rounded-lg border border-white/20 hover:bg-white/20 text-xs transition-colors"
          >
            PRINT BILL
          </button>
          <button
            onClick={() => alert("Printing Token...")}
            className="h-10 px-4 bg-white/10 text-white font-bold rounded-lg border border-white/20 hover:bg-white/20 text-xs transition-colors"
          >
            PRINT TOKEN
          </button>
          <button
            onClick={handleCloseOrder}
            className={`h-10 px-8 font-black rounded-lg transition-all flex items-center gap-2 uppercase tracking-tight text-sm active:scale-95 ${cartItems.length > 0
              ? 'bg-green-500 text-white hover:bg-green-600 shadow-lg'
              : 'bg-gray-400 text-gray-200 cursor-not-allowed'
              }`}
            disabled={cartItems.length === 0}
          >
            CLOSE ORDER
          </button>
          <button
            onClick={() => { if (confirm("Clear current order?")) { setCartItems([]); setOrderType(null); setSelectedRider(null); setSelectedWaiter(null); setCustomerInfo(null); } }}
            className="h-10 px-4 bg-red-500/10 text-red-100 font-bold rounded-lg border border-red-500/20 hover:bg-red-500/20 text-xs transition-colors"
          >
            CLEAR
          </button>
        </div>
      </div>

      {/* New Order Modal Overlay */}
      <NewOrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectType={handleSelectOrderType}
        customerDatabase={customerDatabase}
      />

      {/* Delivery Custom Keypad Modal */}
      {deliveryKeypadOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-80 flex flex-col items-center">
            <h2 className="text-xl font-black text-gray-800 mb-4">Enter Delivery Charges</h2>
            <div className="w-full h-14 bg-gray-100 rounded-lg flex items-center justify-end px-4 mb-4 text-2xl font-bold tracking-wider">
              Rs. {deliveryAmount || '0'}
            </div>
            <div className="grid grid-cols-3 gap-3 w-full">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                <button
                  key={num}
                  onClick={() => setDeliveryAmount(prev => prev + num)}
                  className="h-14 bg-gray-200 rounded-lg font-bold text-xl hover:bg-gray-300 active:bg-gray-400 transition-colors"
                >
                  {num}
                </button>
              ))}
              <button
                onClick={() => setDeliveryAmount('')}
                className="h-14 bg-red-100 text-red-600 rounded-lg font-bold text-xl hover:bg-red-200 active:bg-red-300 transition-colors"
              >
                C
              </button>
              <button
                onClick={() => setDeliveryAmount(prev => prev + '0')}
                className="h-14 bg-gray-200 rounded-lg font-bold text-xl hover:bg-gray-300 active:bg-gray-400 transition-colors"
              >
                0
              </button>
              <button
                onClick={() => setDeliveryAmount(prev => prev.slice(0, -1))}
                className="h-14 bg-orange-100 text-orange-600 rounded-lg font-bold hover:bg-orange-200 active:bg-orange-300 transition-colors flex items-center justify-center"
              >
                DEL
              </button>
            </div>
            <div className="flex gap-3 w-full mt-4">
              <button
                onClick={() => { setDeliveryKeypadOpen(false); setPendingDeliveryItem(null); }}
                className="flex-1 h-12 border-2 border-gray-300 rounded-lg font-bold text-gray-600 hover:bg-gray-100 active:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const amount = parseFloat(deliveryAmount);
                  if (isNaN(amount) || amount < 0) { alert("Invalid amount."); return; }
                  setCartItems(prev => {
                    const existing = prev.find(i => i.id === pendingDeliveryItem.id);
                    if (existing) {
                      setSelectedCartItemId(pendingDeliveryItem.id);
                      return prev.map(i => i.id === pendingDeliveryItem.id ? { ...i, price: amount } : i);
                    } else {
                      setSelectedCartItemId(pendingDeliveryItem.id);
                      return [...prev, { ...pendingDeliveryItem, price: amount, qty: 1 }];
                    }
                  });
                  setDeliveryKeypadOpen(false);
                  setPendingDeliveryItem(null);
                }}
                className="flex-[2] h-12 bg-green-500 text-white rounded-lg font-bold text-lg hover:bg-green-600 active:bg-green-700 transition-colors shadow-md"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Global Styles for the POS Aesthetic */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </div>
  );
}

export default App;
