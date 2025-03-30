// import React, { useState, useEffect } from 'react';
// import { X, AlertTriangle, ShoppingCart } from 'lucide-react';

// // Sample data for vegetables
// const initialVegetables = [
//   { id: 1, name: 'Tomatoes', quantity: 24, quality: 'Good', date: '2025-03-28', category: 'Fruit Vegetables' },
//   { id: 2, name: 'Onions', quantity: 40, quality: 'Excellent', date: '2025-03-25', category: 'Root Vegetables' },
//   { id: 3, name: 'Lettuce', quantity: 12, quality: 'Fair', date: '2025-03-29', category: 'Leafy Greens' },
//   { id: 4, name: 'Carrots', quantity: 8, quality: 'Good', date: '2025-03-26', category: 'Root Vegetables' },
//   { id: 5, name: 'Spinach', quantity: 6, quality: 'Poor', date: '2025-03-30', category: 'Leafy Greens' },
//   { id: 6, name: 'Bell Peppers', quantity: 18, quality: 'Excellent', date: '2025-03-27', category: 'Fruit Vegetables' },
//   { id: 7, name: 'Cucumbers', quantity: 15, quality: 'Good', date: '2025-03-29', category: 'Fruit Vegetables' },
//   { id: 8, name: 'Potatoes', quantity: 50, quality: 'Good', date: '2025-03-24', category: 'Root Vegetables' },
//   { id: 9, name: 'Broccoli', quantity: 10, quality: 'Fair', date: '2025-03-28', category: 'Brassica' },
//   { id: 10, name: 'Mushrooms', quantity: 18, quality: 'Good', date: '2025-03-27', category: 'Fungi' },
//   { id: 11, name: 'Eggplant', quantity: 14, quality: 'Good', date: '2025-03-26', category: 'Fruit Vegetables' },
//   { id: 12, name: 'Zucchini', quantity: 22, quality: 'Excellent', date: '2025-03-28', category: 'Fruit Vegetables' },
//   { id: 13, name: 'Cabbage', quantity: 17, quality: 'Good', date: '2025-03-25', category: 'Brassica' },
//   { id: 14, name: 'Cauliflower', quantity: 9, quality: 'Fair', date: '2025-03-29', category: 'Brassica' },
//   { id: 15, name: 'Garlic', quantity: 30, quality: 'Excellent', date: '2025-03-24', category: 'Bulbs' },
//   { id: 16, name: 'Kale', quantity: 7, quality: 'Poor', date: '2025-03-30', category: 'Leafy Greens' },
//   { id: 17, name: 'Sweet Potatoes', quantity: 35, quality: 'Good', date: '2025-03-26', category: 'Root Vegetables' },
//   { id: 18, name: 'Radishes', quantity: 12, quality: 'Fair', date: '2025-03-28', category: 'Root Vegetables' },
//   { id: 19, name: 'Asparagus', quantity: 8, quality: 'Good', date: '2025-03-29', category: 'Stems' },
//   { id: 20, name: 'Green Beans', quantity: 18, quality: 'Excellent', date: '2025-03-27', category: 'Pods' },
// ];

// // Quantity threshold settings
// const STOCK_LOW = 10;

// const InitialPopup = () => {
//   const [vegetables, setVegetables] = useState(initialVegetables);
//   const [showPopup, setShowPopup] = useState(true);

//   // Identify low stock and spoiled foods
//   const lowStockItems = vegetables.filter(veg => veg.quantity <= STOCK_LOW);
//   const spoiledItems = vegetables.filter(veg => veg.quality === 'Poor');

//   // Function to get quality color class
//   const getQualityColorClass = (quality) => {
//     switch (quality?.toLowerCase()) {
//       case 'excellent':
//         return 'text-green-600';
//       case 'good':
//         return 'text-blue-600';
//       case 'fair':
//         return 'text-yellow-600';
//       case 'poor':
//         return 'text-red-600';
//       default:
//         return 'text-gray-600';
//     }
//   };

//   // Calculate stats
//   const totalItems = vegetables.length;
//   const totalLowStock = lowStockItems.length;
//   const totalSpoiled = spoiledItems.length;

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow">
//         <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-gray-800">Restaurant Inventory Dashboard</h1>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 flex-grow">
//         {/* Inventory stats */}
//         <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-4">
//           <div className="bg-white overflow-hidden shadow rounded-lg">
//             <div className="px-4 py-5 sm:p-6">
//               <div className="flex items-center">
//                 <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
//                   <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                 </div>
//                 <div className="ml-5 w-0 flex-1">
//                   <dl>
//                     <dt className="text-sm font-medium text-gray-500 truncate">Total Items</dt>
//                     <dd className="text-3xl font-semibold text-gray-900">{totalItems}</dd>
//                   </dl>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white overflow-hidden shadow rounded-lg">
//             <div className="px-4 py-5 sm:p-6">
//               <div className="flex items-center">
//                 <div className="flex-shrink-0 bg-red-100 rounded-md p-3">
//                   <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                   </svg>
//                 </div>
//                 <div className="ml-5 w-0 flex-1">
//                   <dl>
//                     <dt className="text-sm font-medium text-gray-500 truncate">Low Stock Items</dt>
//                     <dd className="text-3xl font-semibold text-gray-900">{totalLowStock}</dd>
//                   </dl>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white overflow-hidden shadow rounded-lg">
//             <div className="px-4 py-5 sm:p-6">
//               <div className="flex items-center">
//                 <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
//                   <svg className="h-6 w-6 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                 </div>
//                 <div className="ml-5 w-0 flex-1">
//                   <dl>
//                     <dt className="text-sm font-medium text-gray-500 truncate">Spoiled Items</dt>
//                     <dd className="text-3xl font-semibold text-gray-900">{totalSpoiled}</dd>
//                   </dl>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white overflow-hidden shadow rounded-lg">
//             <div className="px-4 py-5 sm:p-6">
//               <div className="flex items-center">
//                 <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
//                   <svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
//                   </svg>
//                 </div>
//                 <div className="ml-5 w-0 flex-1">
//                   <dl>
//                     <dt className="text-sm font-medium text-gray-500 truncate">Categories</dt>
//                     <dd className="text-3xl font-semibold text-gray-900">
//                       {[...new Set(vegetables.map(v => v.category))].length}
//                     </dd>
//                   </dl>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Low stock and spoiled items sections */}
//         <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
//           {/* Low Stock Items Section */}
//           <div className="bg-white rounded-lg shadow overflow-hidden">
//             <div className="px-4 py-5 border-b border-gray-200 flex justify-between items-center">
//               <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
//                 <ShoppingCart className="w-5 h-5 mr-2 text-red-500" />
//                 Low Stock Items
//               </h3>
//               <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
//                 {lowStockItems.length} items
//               </span>
//             </div>
//             <div className="overflow-y-auto" style={{ maxHeight: '300px' }}>
//               {lowStockItems.length > 0 ? (
//                 <ul className="divide-y divide-gray-200">
//                   {lowStockItems.map((item) => (
//                     <li key={item.id} className="px-4 py-3 hover:bg-gray-50">
//                       <div className="flex justify-between">
//                         <div className="text-sm font-medium text-gray-900">{item.name}</div>
//                         <div className="text-sm text-red-600 font-semibold">{item.quantity} kg</div>
//                       </div>
//                       <div className="mt-1 flex justify-between">
//                         <div className="text-xs text-gray-500">{item.category}</div>
//                         <div className={`text-xs ${getQualityColorClass(item.quality)}`}>{item.quality}</div>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <div className="p-4 text-center text-gray-500">No low stock items</div>
//               )}
//             </div>
//           </div>

//           {/* Spoiled Items Section */}
//           <div className="bg-white rounded-lg shadow overflow-hidden">
//             <div className="px-4 py-5 border-b border-gray-200 flex justify-between items-center">
//               <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
//                 <AlertTriangle className="w-5 h-5 mr-2 text-yellow-500" />
//                 Spoiled Items
//               </h3>
//               <span className="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
//                 {spoiledItems.length} items
//               </span>
//             </div>
//             <div className="overflow-y-auto" style={{ maxHeight: '300px' }}>
//               {spoiledItems.length > 0 ? (
//                 <ul className="divide-y divide-gray-200">
//                   {spoiledItems.map((item) => (
//                     <li key={item.id} className="px-4 py-3 hover:bg-gray-50">
//                       <div className="flex justify-between">
//                         <div className="text-sm font-medium text-gray-900">{item.name}</div>
//                         <div className="text-sm text-gray-600">{item.date}</div>
//                       </div>
//                       <div className="mt-1 flex justify-between">
//                         <div className="text-xs text-gray-500">{item.category}</div>
//                         <div className="text-xs text-red-600 font-semibold">{item.quality}</div>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <div className="p-4 text-center text-gray-500">No spoiled items</div>
//               )}
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* Popup for Low Stock and Spoiled Foods */}
//       {showPopup && (totalLowStock > 0 || totalSpoiled > 0) && (
//         <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
//           <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//             <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
//             <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
//             <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
//               <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//                 <div className="sm:flex sm:items-start">
//                   <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
//                     <AlertTriangle className="h-6 w-6 text-red-600" />
//                   </div>
//                   <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
//                     <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
//                       Inventory Alert
//                     </h3>
//                     <div className="mt-2">
//                       <p className="text-sm text-gray-500">
//                         Your inventory requires immediate attention:
//                       </p>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="mt-4 max-h-60 overflow-y-auto">
//                   {totalLowStock > 0 && (
//                     <div className="mb-4">
//                       <h4 className="font-medium text-red-600 flex items-center">
//                         <ShoppingCart className="w-4 h-4 mr-1" />
//                         Low Stock Items ({totalLowStock})
//                       </h4>
//                       <ul className="mt-2 space-y-2">
//                         {lowStockItems.map((item) => (
//                           <li key={`low-${item.id}`} className="text-sm bg-red-50 rounded-md p-2 flex justify-between">
//                             <span>{item.name}</span>
//                             <span className="font-medium">{item.quantity} kg</span>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   )}
                  
//                   {totalSpoiled > 0 && (
//                     <div>
//                       <h4 className="font-medium text-yellow-600 flex items-center">
//                         <AlertTriangle className="w-4 h-4 mr-1" />
//                         Spoiled Items ({totalSpoiled})
//                       </h4>
//                       <ul className="mt-2 space-y-2">
//                         {spoiledItems.map((item) => (
//                           <li key={`spoil-${item.id}`} className="text-sm bg-yellow-50 rounded-md p-2 flex justify-between">
//                             <span>{item.name}</span>
//                             <span className="font-medium text-red-600">{item.quality}</span>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   )}
//                 </div>
//               </div>
              
//               <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//                 <button
//                   type="button"
//                   className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
//                   onClick={() => setShowPopup(false)}
//                 >
//                   Close
//                 </button>
//               </div>
              
//               {/* Close button at top right */}
//               <button
//                 className="absolute top-0 right-0 m-4 text-gray-400 hover:text-gray-500 focus:outline-none"
//                 onClick={() => setShowPopup(false)}
//               >
//                 <X className="h-6 w-6" />
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // export default InitialPopup;
// import React, { useState, useEffect } from 'react';
// import { X, AlertTriangle, ShoppingCart } from 'lucide-react';

// // Sample data for inventory items
// const initialVegetables = [
//   { id: 1, name: 'Tomatoes', quantity: 8, quality: 'Good', category: 'Fruit Vegetables' },
//   { id: 3, name: 'Lettuce', quantity: 5, quality: 'Fair', category: 'Leafy Greens' },
//   { id: 5, name: 'Spinach', quantity: 6, quality: 'Poor', category: 'Leafy Greens' },
//   { id: 16, name: 'Kale', quantity: 7, quality: 'Poor', category: 'Leafy Greens' },
//   { id: 19, name: 'Asparagus', quantity: 8, quality: 'Good', category: 'Stems' },
// ];

// // Constants
// const STOCK_LOW = 10;

// const InventoryAlertPopup = () => {
//   // State for controlling popup visibility
//   const [showPopup, setShowPopup] = useState(true);

//   // Process the data to find low stock and spoiled items
//   const lowStockItems = initialVegetables.filter(item => item.quantity <= STOCK_LOW);
//   const spoiledItems = initialVegetables.filter(item => item.quality === 'Poor');
  
//   const totalLowStock = lowStockItems.length;
//   const totalSpoiled = spoiledItems.length;

//   // Only show popup if there are issues to report
//   const hasIssues = totalLowStock > 0 || totalSpoiled > 0;

//   // Function to close the popup
//   const handleClose = () => {
//     setShowPopup(false);
//   };

//   if (!showPopup || !hasIssues) return null;

//   return (
//     <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
//       <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//         <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
//         <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
//         <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
//           <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//             <div className="sm:flex sm:items-start">
//               <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
//                 <AlertTriangle className="h-6 w-6 text-red-600" />
//               </div>
//               <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
//                 <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
//                   Inventory Alert
//                 </h3>
//                 <div className="mt-2">
//                   <p className="text-sm text-gray-500">
//                     Your inventory requires immediate attention:
//                   </p>
//                 </div>
//               </div>
//             </div>
            
//             <div className="mt-4 max-h-60 overflow-y-auto">
//               {totalLowStock > 0 && (
//                 <div className="mb-4">
//                   <h4 className="font-medium text-red-600 flex items-center">
//                     <ShoppingCart className="w-4 h-4 mr-1" />
//                     Low Stock Items ({totalLowStock})
//                   </h4>
//                   <ul className="mt-2 space-y-2">
//                     {lowStockItems.map((item) => (
//                       <li key={`low-${item.id}`} className="text-sm bg-red-50 rounded-md p-2 flex justify-between">
//                         <span>{item.name}</span>
//                         <span className="font-medium">{item.quantity} kg</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
              
//               {totalSpoiled > 0 && (
//                 <div>
//                   <h4 className="font-medium text-yellow-600 flex items-center">
//                     <AlertTriangle className="w-4 h-4 mr-1" />
//                     Spoiled Items ({totalSpoiled})
//                   </h4>
//                   <ul className="mt-2 space-y-2">
//                     {spoiledItems.map((item) => (
//                       <li key={`spoil-${item.id}`} className="text-sm bg-yellow-50 rounded-md p-2 flex justify-between">
//                         <span>{item.name}</span>
//                         <span className="font-medium text-red-600">{item.quality}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           </div>
          
//           <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//             <button
//               type="button"
//               className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
//               onClick={handleClose}
//             >
//               Close
//             </button>
//           </div>
          
//           {/* Close button at top right */}
//           <button
//             className="absolute top-0 right-0 m-4 text-gray-400 hover:text-gray-500 focus:outline-none"
//             onClick={handleClose}
//           >
//             <X className="h-6 w-6" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };


// export default InventoryAlertPopup;


import React, { useState, useEffect } from 'react';
import { X, AlertTriangle, ShoppingCart } from 'lucide-react';

// Sample data for inventory items
const initialVegetables = [
  { id: 1, name: 'Tomatoes', quantity: 8, quality: 'Good', category: 'Fruit Vegetables' },
  { id: 3, name: 'Lettuce', quantity: 5, quality: 'Fair', category: 'Leafy Greens' },
  { id: 5, name: 'Spinach', quantity: 6, quality: 'Poor', category: 'Leafy Greens' },
  { id: 16, name: 'Kale', quantity: 7, quality: 'Poor', category: 'Leafy Greens' },
  { id: 19, name: 'Asparagus', quantity: 8, quality: 'Good', category: 'Stems' },
];

// Constants
const STOCK_LOW = 10;

const InventoryAlertPopup = ({ isOpen, onClose }) => {
  // State for controlling popup visibility
  const [showPopup, setShowPopup] = useState(isOpen);

  // Process the data to find low stock and spoiled items
  const lowStockItems = initialVegetables.filter(item => item.quantity <= STOCK_LOW);
  const spoiledItems = initialVegetables.filter(item => item.quality === 'Poor');
  
  const totalLowStock = lowStockItems.length;
  const totalSpoiled = spoiledItems.length;

  // Only show popup if there are issues to report
  const hasIssues = totalLowStock > 0 || totalSpoiled > 0;

  // Update the showPopup state when isOpen prop changes
  useEffect(() => {
    setShowPopup(isOpen);
  }, [isOpen]);

  // Function to close the popup
  const handleClose = () => {
    setShowPopup(false);
    if (onClose) onClose();
  };

  if (!showPopup || !hasIssues) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Inventory Alert
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Your inventory requires immediate attention:
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-4 max-h-60 overflow-y-auto">
              {totalLowStock > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium text-red-600 flex items-center">
                    <ShoppingCart className="w-4 h-4 mr-1" />
                    Low Stock Items ({totalLowStock})
                  </h4>
                  <ul className="mt-2 space-y-2">
                    {lowStockItems.map((item) => (
                      <li key={`low-${item.id}`} className="text-sm bg-red-50 rounded-md p-2 flex justify-between">
                        <span>{item.name}</span>
                        <span className="font-medium">{item.quantity} kg</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {totalSpoiled > 0 && (
                <div>
                  <h4 className="font-medium text-yellow-600 flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    Spoiled Items ({totalSpoiled})
                  </h4>
                  <ul className="mt-2 space-y-2">
                    {spoiledItems.map((item) => (
                      <li key={`spoil-${item.id}`} className="text-sm bg-yellow-50 rounded-md p-2 flex justify-between">
                        <span>{item.name}</span>
                        <span className="font-medium text-red-600">{item.quality}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
          
          {/* Close button at top right */}
          <button
            className="absolute top-0 right-0 m-4 text-gray-400 hover:text-gray-500 focus:outline-none"
            onClick={handleClose}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InventoryAlertPopup;