// import React, { useState, useEffect } from 'react';
// import { ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';

// // Sample recipe database
// const recipes = [
//   {
//     id: 1,
//     name: 'Mixed Vegetable Soup',
//     vegetables: ['Tomatoes', 'Carrots', 'Spinach', 'Cabbage', 'Onions'],
//     usesPoorQuality: true,
//     description: 'A hearty soup thats perfect for using vegetables that are past their prime.',
//     recommendedDiscount: 15,
//     preparationTime: '30 mins',
//     costEfficiency: 'High'
//   },
//   {
//     id: 2,
//     name: 'Vegetable Stir Fry',
//     vegetables: ['Bell Peppers', 'Carrots', 'Mushrooms', 'Onions', 'Broccoli'],
//     usesPoorQuality: true,
//     description: 'Quick-cooking at high heat makes this ideal for vegetables that need to be used quickly.',
//     recommendedDiscount: 10,
//     preparationTime: '20 mins',
//     costEfficiency: 'Medium'
//   },
//   {
//     id: 3,
//     name: 'Garden Pasta',
//     vegetables: ['Tomatoes', 'Spinach', 'Zucchini', 'Eggplant', 'Garlic'],
//     usesPoorQuality: true,
//     description: 'The sauce cooking process makes this perfect for softening vegetables past their prime.',
//     recommendedDiscount: 20,
//     preparationTime: '25 mins',
//     costEfficiency: 'High'
//   },
//   {
//     id: 4,
//     name: 'Vegetable Curry',
//     vegetables: ['Potatoes', 'Cauliflower', 'Spinach', 'Tomatoes', 'Onions'],
//     usesPoorQuality: true,
//     description: 'Spices and slow cooking make this perfect for vegetables that need flavor enhancement.',
//     recommendedDiscount: 15,
//     preparationTime: '40 mins',
//     costEfficiency: 'High'
//   },
//   {
//     id: 5,
//     name: 'Roasted Vegetable Medley',
//     vegetables: ['Sweet Potatoes', 'Bell Peppers', 'Zucchini', 'Eggplant', 'Onions'],
//     usesPoorQuality: false,
//     description: 'Roasting brings out natural sweetness in vegetables.',
//     recommendedDiscount: 10,
//     preparationTime: '35 mins',
//     costEfficiency: 'Medium'
//   },
//   {
//     id: 6,
//     name: 'Vegetable Stock',
//     vegetables: ['Carrots', 'Onions', 'Celery', 'Garlic', 'Mushrooms'],
//     usesPoorQuality: true,
//     description: 'Perfect use for vegetable trimmings and those past their prime.',
//     recommendedDiscount: 0,
//     preparationTime: '60 mins',
//     costEfficiency: 'Very High'
//   },
//   {
//     id: 7,
//     name: 'Tomato & Kale Salad',
//     vegetables: ['Tomatoes', 'Kale', 'Onions', 'Radishes', 'Cucumbers'],
//     usesPoorQuality: false,
//     description: 'Fresh, vibrant salad featuring seasonal vegetables.',
//     recommendedDiscount: 0,
//     preparationTime: '15 mins',
//     costEfficiency: 'Low'
//   },
//   {
//     id: 8,
//     name: 'Grilled Vegetable Plate',
//     vegetables: ['Eggplant', 'Zucchini', 'Bell Peppers', 'Mushrooms', 'Asparagus'],
//     usesPoorQuality: false,
//     description: 'Showcase your freshest vegetables with simple grilling.',
//     recommendedDiscount: 0,
//     preparationTime: '25 mins',
//     costEfficiency: 'Low'
//   },
//   {
//     id: 9,
//     name: 'Vegetable Fritters',
//     vegetables: ['Zucchini', 'Carrots', 'Onions', 'Potatoes', 'Broccoli'],
//     usesPoorQuality: true,
//     description: 'Crispy fritters that can use up vegetables that are softening.',
//     recommendedDiscount: 15,
//     preparationTime: '30 mins',
//     costEfficiency: 'Medium'
//   },
//   {
//     id: 10,
//     name: 'Pickled Vegetables',
//     vegetables: ['Cucumbers', 'Carrots', 'Radishes', 'Cauliflower', 'Bell Peppers'],
//     usesPoorQuality: true,
//     description: 'Extend the life of vegetables by pickling them.',
//     recommendedDiscount: 0,
//     preparationTime: '20 mins + 2 days',
//     costEfficiency: 'High'
//   }
// ];

// // Constants for low stock and poor quality
// const STOCK_LOW = 10;
// const POOR_QUALITY = 'Poor';
// const FAIR_QUALITY = 'Fair';

// export default function FoodRecommendation({ vegetables }) {
//   const [showDetails, setShowDetails] = useState({});
//   const [openSection, setOpenSection] = useState(true);
//   const [recommendations, setRecommendations] = useState([]);
//   const [urgentRecommendations, setUrgentRecommendations] = useState([]);
//   const [secondaryRecommendations, setSecondaryRecommendations] = useState([]);

//   // Toggle section visibility
//   const toggleSection = () => {
//     setOpenSection(!openSection);
//   };

//   // Toggle recipe details
//   const toggleDetails = (recipeId) => {
//     setShowDetails({
//       ...showDetails,
//       [recipeId]: !showDetails[recipeId]
//     });
//   };

//   // Get badge color based on priority
//   const getPriorityBadgeColor = (isPrimary) => {
//     return isPrimary 
//       ? 'bg-red-100 text-red-800 border border-red-200' 
//       : 'bg-yellow-100 text-yellow-800 border border-yellow-200';
//   };

//   // Identify vegetables in poor condition
//   useEffect(() => {
//     if (!vegetables || vegetables.length === 0) return;

//     // Find vegetables with low stock and poor/fair quality
//     const urgentVegetables = vegetables.filter(
//       veg => (veg.quantity <= STOCK_LOW && (veg.quality === POOR_QUALITY || veg.quality === FAIR_QUALITY))
//     );
    
//     // Find vegetables with either low stock or poor quality
//     const secondaryVegetables = vegetables.filter(
//       veg => (veg.quantity <= STOCK_LOW || veg.quality === POOR_QUALITY || veg.quality === FAIR_QUALITY)
//     ).filter(veg => !urgentVegetables.includes(veg));

//     // Get the names of these vegetables
//     const urgentVegetableNames = urgentVegetables.map(veg => veg.name);
//     const secondaryVegetableNames = secondaryVegetables.map(veg => veg.name);

//     // Find recipes that use these vegetables
//     // Priority recipes use multiple urgent vegetables
//     const highPriorityRecipes = recipes.filter(recipe => {
//       const usedUrgentVegetables = recipe.vegetables.filter(veg => 
//         urgentVegetableNames.includes(veg)
//       );
//       return usedUrgentVegetables.length >= 2 && recipe.usesPoorQuality;
//     });

//     // Secondary recipes use at least one urgent vegetable
//     const mediumPriorityRecipes = recipes.filter(recipe => {
//       const usedUrgentVegetables = recipe.vegetables.filter(veg => 
//         urgentVegetableNames.includes(veg)
//       );
//       const usedSecondaryVegetables = recipe.vegetables.filter(veg => 
//         secondaryVegetableNames.includes(veg)
//       );
      
//       return (usedUrgentVegetables.length === 1 && recipe.usesPoorQuality) || 
//              (usedSecondaryVegetables.length >= 2 && recipe.usesPoorQuality);
//     }).filter(recipe => !highPriorityRecipes.includes(recipe));

//     // Set the recommendations
//     setUrgentRecommendations(highPriorityRecipes);
//     setSecondaryRecommendations(mediumPriorityRecipes);
//     setRecommendations([...highPriorityRecipes, ...mediumPriorityRecipes]);
//   }, [vegetables]);

//   // Get matched vegetables from inventory
//   const getMatchedVegetables = (recipe, vegetables) => {
//     if (!vegetables || vegetables.length === 0) return [];
    
//     return recipe.vegetables
//       .map(recipeName => {
//         const matchedVeg = vegetables.find(veg => veg.name === recipeName);
//         return matchedVeg ? {
//           name: matchedVeg.name,
//           quantity: matchedVeg.quantity,
//           quality: matchedVeg.quality,
//           isLowStock: matchedVeg.quantity <= STOCK_LOW,
//           isPoorQuality: matchedVeg.quality === POOR_QUALITY || matchedVeg.quality === FAIR_QUALITY
//         } : null;
//       })
//       .filter(Boolean);
//   };

//   // Calculate the number of at-risk vegetables in a recipe
//   const getAtRiskVegetableCount = (recipe, vegetables) => {
//     const matchedVegetables = getMatchedVegetables(recipe, vegetables);
//     return matchedVegetables.filter(veg => veg.isLowStock || veg.isPoorQuality).length;
//   };

//   // If no recommendations, show nothing
//   if (recommendations.length === 0) {
//     return null;
//   }

//   return (
//     <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
//       {/* Header */}
//       <div 
//         className="flex justify-between items-center p-4 bg-orange-50 border-b border-orange-100 cursor-pointer"
//         onClick={toggleSection}
//       >
//         <div className="flex items-center">
//           <AlertCircle size={20} className="text-orange-600 mr-2" />
//           <h2 className="text-lg font-semibold text-orange-800">
//             Food Waste Reduction Recommendations
//             {urgentRecommendations.length > 0 && (
//               <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
//                 {urgentRecommendations.length} Urgent
//               </span>
//             )}
//           </h2>
//         </div>
//         {openSection ? <ChevronUp size={20} className="text-orange-600" /> : <ChevronDown size={20} className="text-orange-600" />}
//       </div>

//       {/* Content */}
//       {openSection && (
//         <div className="p-4">
//           <p className="text-gray-600 mb-4">
//             Based on your current inventory, we recommend the following dishes to help reduce food waste 
//             and maximize profit for items close to expiration or with lower quality.
//           </p>

//           {/* Recommendations list */}
//           <div className="space-y-4">
//             {recommendations.map((recipe) => {
//               const isUrgent = urgentRecommendations.includes(recipe);
//               const matchedVegetables = getMatchedVegetables(recipe, vegetables);
//               const atRiskCount = getAtRiskVegetableCount(recipe, vegetables);
              
//               return (
//                 <div 
//                   key={recipe.id} 
//                   className={`border rounded-lg overflow-hidden ${
//                     isUrgent ? 'border-red-200' : 'border-yellow-200'
//                   }`}
//                 >
//                   {/* Recipe header */}
//                   <div 
//                     className={`p-4 flex justify-between items-center cursor-pointer ${
//                       isUrgent ? 'bg-red-50' : 'bg-yellow-50'
//                     }`}
//                     onClick={() => toggleDetails(recipe.id)}
//                   >
//                     <div>
//                       <div className="flex items-center">
//                         <h3 className="text-lg font-medium">{recipe.name}</h3>
//                         <span className={`ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                           getPriorityBadgeColor(isUrgent)
//                         }`}>
//                           {isUrgent ? 'High Priority' : 'Medium Priority'}
//                         </span>
//                         {recipe.recommendedDiscount > 0 && (
//                           <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
//                             {recipe.recommendedDiscount}% Discount Suggested
//                           </span>
//                         )}
//                       </div>
//                       <p className="text-sm text-gray-600 mt-1">
//                         Uses {atRiskCount} at-risk ingredients 
//                       </p>
//                     </div>
//                     {showDetails[recipe.id] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//                   </div>

//                   {/* Recipe details */}
//                   {showDetails[recipe.id] && (
//                     <div className="p-4 bg-white">
//                       <p className="text-gray-700 mb-4">{recipe.description}</p>
                      
//                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//                         <div>
//                           <h4 className="font-medium text-gray-700">Preparation Time</h4>
//                           <p>{recipe.preparationTime}</p>
//                         </div>
//                         <div>
//                           <h4 className="font-medium text-gray-700">Cost Efficiency</h4>
//                           <p>{recipe.costEfficiency}</p>
//                         </div>
//                         <div>
//                           <h4 className="font-medium text-gray-700">Recommended Discount</h4>
//                           <p className="font-semibold text-green-600">{recipe.recommendedDiscount}%</p>
//                         </div>
//                       </div>

//                       <div className="mb-4">
//                         <h4 className="font-medium text-gray-700 mb-2">Required Vegetables</h4>
//                         <div className="bg-gray-50 rounded-lg p-3">
//                           <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//                             {matchedVegetables.map((veg, index) => (
//                               <div key={index} className="flex items-center">
//                                 <span className={`w-2 h-2 rounded-full mr-2 ${
//                                   veg.isPoorQuality && veg.isLowStock ? 'bg-red-500' :
//                                   veg.isPoorQuality || veg.isLowStock ? 'bg-yellow-500' : 'bg-green-500'
//                                 }`}></span>
//                                 <span className="text-sm">
//                                   {veg.name} 
//                                   <span className="text-gray-500 ml-1">
//                                     ({veg.quantity} kg, {veg.quality})
//                                   </span>
//                                 </span>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       </div>

//                       <div className="mt-4 flex justify-end">
//                         <button className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50">
//                           Add to Daily Specials
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>

//           {/* Summary */}
//           <div className="mt-6 p-4 bg-gray-50 rounded-lg">
//             <h3 className="font-medium text-gray-800 mb-2">Summary</h3>
//             <p className="text-gray-600">
//               You have {urgentRecommendations.length + secondaryRecommendations.length} recipe recommendations 
//               to help reduce waste of inventory items that are low in stock or lower in quality. 
//               Adding these as daily specials with the suggested discounts can help minimize waste 
//               while maximizing profits.
//             </p>
//           </div>

//         </div>
//       )}
//     </div>
//   );
// }



import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, AlertCircle, InfoIcon } from 'lucide-react';

// Sample recipe database
const recipes = [
  {
    id: 1,
    name: 'Mixed Vegetable Soup',
    vegetables: ['Tomatoes', 'Carrots', 'Spinach', 'Cabbage', 'Onions'],
    usesPoorQuality: true,
    description: 'A hearty soup thats perfect for using vegetables that are past their prime.',
    recommendedDiscount: 15,
    preparationTime: '30 mins',
    costEfficiency: 'High'
  },
  {
    id: 2,
    name: 'Vegetable Stir Fry',
    vegetables: ['Bell Peppers', 'Carrots', 'Mushrooms', 'Onions', 'Broccoli'],
    usesPoorQuality: true,
    description: 'Quick-cooking at high heat makes this ideal for vegetables that need to be used quickly.',
    recommendedDiscount: 10,
    preparationTime: '20 mins',
    costEfficiency: 'Medium'
  },
  {
    id: 3,
    name: 'Garden Pasta',
    vegetables: ['Tomatoes', 'Spinach', 'Zucchini', 'Eggplant', 'Garlic'],
    usesPoorQuality: true,
    description: 'The sauce cooking process makes this perfect for softening vegetables past their prime.',
    recommendedDiscount: 20,
    preparationTime: '25 mins',
    costEfficiency: 'High'
  },
  {
    id: 4,
    name: 'Vegetable Curry',
    vegetables: ['Potatoes', 'Cauliflower', 'Spinach', 'Tomatoes', 'Onions'],
    usesPoorQuality: true,
    description: 'Spices and slow cooking make this perfect for vegetables that need flavor enhancement.',
    recommendedDiscount: 15,
    preparationTime: '40 mins',
    costEfficiency: 'High'
  },
  {
    id: 5,
    name: 'Roasted Vegetable Medley',
    vegetables: ['Sweet Potatoes', 'Bell Peppers', 'Zucchini', 'Eggplant', 'Onions'],
    usesPoorQuality: false,
    description: 'Roasting brings out natural sweetness in vegetables.',
    recommendedDiscount: 10,
    preparationTime: '35 mins',
    costEfficiency: 'Medium'
  },
  {
    id: 6,
    name: 'Vegetable Stock',
    vegetables: ['Carrots', 'Onions', 'Celery', 'Garlic', 'Mushrooms'],
    usesPoorQuality: true,
    description: 'Perfect use for vegetable trimmings and those past their prime.',
    recommendedDiscount: 0,
    preparationTime: '60 mins',
    costEfficiency: 'Very High'
  },
  {
    id: 7,
    name: 'Tomato & Kale Salad',
    vegetables: ['Tomatoes', 'Kale', 'Onions', 'Radishes', 'Cucumbers'],
    usesPoorQuality: false,
    description: 'Fresh, vibrant salad featuring seasonal vegetables.',
    recommendedDiscount: 0,
    preparationTime: '15 mins',
    costEfficiency: 'Low'
  },
  {
    id: 8,
    name: 'Grilled Vegetable Plate',
    vegetables: ['Eggplant', 'Zucchini', 'Bell Peppers', 'Mushrooms', 'Asparagus'],
    usesPoorQuality: false,
    description: 'Showcase your freshest vegetables with simple grilling.',
    recommendedDiscount: 0,
    preparationTime: '25 mins',
    costEfficiency: 'Low'
  },
  {
    id: 9,
    name: 'Vegetable Fritters',
    vegetables: ['Zucchini', 'Carrots', 'Onions', 'Potatoes', 'Broccoli'],
    usesPoorQuality: true,
    description: 'Crispy fritters that can use up vegetables that are softening.',
    recommendedDiscount: 15,
    preparationTime: '30 mins',
    costEfficiency: 'Medium'
  },
  {
    id: 10,
    name: 'Pickled Vegetables',
    vegetables: ['Cucumbers', 'Carrots', 'Radishes', 'Cauliflower', 'Bell Peppers'],
    usesPoorQuality: true,
    description: 'Extend the life of vegetables by pickling them.',
    recommendedDiscount: 0,
    preparationTime: '20 mins + 2 days',
    costEfficiency: 'High'
  }
];

// Constants for low stock and poor quality
const STOCK_LOW = 10;
const POOR_QUALITY = 'Poor';
const FAIR_QUALITY = 'Fair';

export default function FoodRecommendation({ vegetables }) {
  const [showDetails, setShowDetails] = useState({});
  const [openSection, setOpenSection] = useState(true);
  const [recommendations, setRecommendations] = useState([]);
  const [urgentRecommendations, setUrgentRecommendations] = useState([]);
  const [secondaryRecommendations, setSecondaryRecommendations] = useState([]);
  const [hasVegetables, setHasVegetables] = useState(false);

  // Toggle section visibility
  const toggleSection = () => {
    setOpenSection(!openSection);
  };

  // Toggle recipe details
  const toggleDetails = (recipeId) => {
    setShowDetails({
      ...showDetails,
      [recipeId]: !showDetails[recipeId]
    });
  };

  // Get badge color based on priority
  const getPriorityBadgeColor = (isPrimary) => {
    return isPrimary 
      ? 'bg-red-100 text-red-800 border border-red-200' 
      : 'bg-yellow-100 text-yellow-800 border border-yellow-200';
  };

  // Identify vegetables in poor condition
  useEffect(() => {
    // Check if vegetables data exists
    setHasVegetables(vegetables && vegetables.length > 0);
    
    if (!vegetables || vegetables.length === 0) return;

    // Find vegetables with low stock and poor/fair quality
    const urgentVegetables = vegetables.filter(
      veg => (veg.quantity <= STOCK_LOW && (veg.quality === POOR_QUALITY || veg.quality === FAIR_QUALITY))
    );
    
    // Find vegetables with either low stock or poor quality
    const secondaryVegetables = vegetables.filter(
      veg => (veg.quantity <= STOCK_LOW || veg.quality === POOR_QUALITY || veg.quality === FAIR_QUALITY)
    ).filter(veg => !urgentVegetables.includes(veg));

    // Get the names of these vegetables
    const urgentVegetableNames = urgentVegetables.map(veg => veg.name);
    const secondaryVegetableNames = secondaryVegetables.map(veg => veg.name);

    // Find recipes that use these vegetables
    // Priority recipes use multiple urgent vegetables
    const highPriorityRecipes = recipes.filter(recipe => {
      const usedUrgentVegetables = recipe.vegetables.filter(veg => 
        urgentVegetableNames.includes(veg)
      );
      return usedUrgentVegetables.length >= 2 && recipe.usesPoorQuality;
    });

    // Secondary recipes use at least one urgent vegetable
    const mediumPriorityRecipes = recipes.filter(recipe => {
      const usedUrgentVegetables = recipe.vegetables.filter(veg => 
        urgentVegetableNames.includes(veg)
      );
      const usedSecondaryVegetables = recipe.vegetables.filter(veg => 
        secondaryVegetableNames.includes(veg)
      );
      
      return (usedUrgentVegetables.length === 1 && recipe.usesPoorQuality) || 
             (usedSecondaryVegetables.length >= 2 && recipe.usesPoorQuality);
    }).filter(recipe => !highPriorityRecipes.includes(recipe));

    // Set the recommendations
    setUrgentRecommendations(highPriorityRecipes);
    setSecondaryRecommendations(mediumPriorityRecipes);
    setRecommendations([...highPriorityRecipes, ...mediumPriorityRecipes]);
  }, [vegetables]);

  // Get matched vegetables from inventory
  const getMatchedVegetables = (recipe, vegetables) => {
    if (!vegetables || vegetables.length === 0) return [];
    
    return recipe.vegetables
      .map(recipeName => {
        const matchedVeg = vegetables.find(veg => veg.name === recipeName);
        return matchedVeg ? {
          name: matchedVeg.name,
          quantity: matchedVeg.quantity,
          quality: matchedVeg.quality,
          isLowStock: matchedVeg.quantity <= STOCK_LOW,
          isPoorQuality: matchedVeg.quality === POOR_QUALITY || matchedVeg.quality === FAIR_QUALITY
        } : null;
      })
      .filter(Boolean);
  };

  // Calculate the number of at-risk vegetables in a recipe
  const getAtRiskVegetableCount = (recipe, vegetables) => {
    const matchedVegetables = getMatchedVegetables(recipe, vegetables);
    return matchedVegetables.filter(veg => veg.isLowStock || veg.isPoorQuality).length;
  };

  // Render no data state
  if (!hasVegetables) {
    return (
      <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
        {/* Header */}
        <div 
          className="flex justify-between items-center p-4 bg-blue-50 border-b border-blue-100 cursor-pointer"
          onClick={toggleSection}
        >
          <div className="flex items-center">
            <InfoIcon size={20} className="text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold text-blue-800">
              Inventory Data Required
            </h2>
          </div>
          {openSection ? <ChevronUp size={20} className="text-blue-600" /> : <ChevronDown size={20} className="text-blue-600" />}
        </div>

        {/* Content */}
        {openSection && (
          <div className="p-6">
            <div className="text-center py-6">
              <svg 
                className="w-16 h-16 mx-auto text-blue-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No Inventory Data Available</h3>
              <p className="mt-2 text-gray-600 max-w-md mx-auto">
                Please update your inventory data to receive food waste reduction recommendations. We'll analyze your vegetable stock levels and quality to suggest appropriate recipes.
              </p>
              <div className="mt-6">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                  Update Inventory
                </button>
              </div>
            </div>

            <div className="mt-6 border-t border-gray-200 pt-6">
              <h4 className="font-medium text-gray-800 mb-2">Why this matters</h4>
              <p className="text-gray-600 mb-4">
                Our food waste reduction system helps you:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-green-500 mr-2">✓</span>
                  <span>Identify vegetables at risk of spoilage</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-green-500 mr-2">✓</span>
                  <span>Get recipe recommendations based on what needs to be used first</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-green-500 mr-2">✓</span>
                  <span>Reduce food waste and increase profit margins</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-green-500 mr-2">✓</span>
                  <span>Receive discount recommendations to optimize sales</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  }

  // If no recommendations (but has vegetables data), show no matches message
  if (recommendations.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
        {/* Header */}
        <div 
          className="flex justify-between items-center p-4 bg-green-50 border-b border-green-100 cursor-pointer"
          onClick={toggleSection}
        >
          <div className="flex items-center">
            <InfoIcon size={20} className="text-green-600 mr-2" />
            <h2 className="text-lg font-semibold text-green-800">
              Inventory Status
            </h2>
          </div>
          {openSection ? <ChevronUp size={20} className="text-green-600" /> : <ChevronDown size={20} className="text-green-600" />}
        </div>

        {/* Content */}
        {openSection && (
          <div className="p-6">
            <div className="text-center py-4">
              <svg 
                className="w-16 h-16 mx-auto text-green-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">All Vegetables in Good Condition</h3>
              <p className="mt-2 text-gray-600 max-w-md mx-auto">
                Your current inventory looks great! No vegetables are at risk of spoilage or in need of immediate use.
              </p>
            </div>
            
            <div className="mt-6 bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-2">Inventory Summary</h4>
              <p className="text-gray-600">
                All vegetables in your inventory have sufficient stock levels and quality. 
                Continue to monitor daily and check back here for recommendations as needed.
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Regular view with recommendations
  return (
    <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
      {/* Header */}
      <div 
        className="flex justify-between items-center p-4 bg-orange-50 border-b border-orange-100 cursor-pointer"
        onClick={toggleSection}
      >
        <div className="flex items-center">
          <AlertCircle size={20} className="text-orange-600 mr-2" />
          <h2 className="text-lg font-semibold text-orange-800">
            Food Waste Reduction Recommendations
            {urgentRecommendations.length > 0 && (
              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                {urgentRecommendations.length} Urgent
              </span>
            )}
          </h2>
        </div>
        {openSection ? <ChevronUp size={20} className="text-orange-600" /> : <ChevronDown size={20} className="text-orange-600" />}
      </div>

      {/* Content */}
      {openSection && (
        <div className="p-4">
          <p className="text-gray-600 mb-4">
            Based on your current inventory, we recommend the following dishes to help reduce food waste 
            and maximize profit for items close to expiration or with lower quality.
          </p>

          {/* Recommendations list */}
          <div className="space-y-4">
            {recommendations.map((recipe) => {
              const isUrgent = urgentRecommendations.includes(recipe);
              const matchedVegetables = getMatchedVegetables(recipe, vegetables);
              const atRiskCount = getAtRiskVegetableCount(recipe, vegetables);
              
              return (
                <div 
                  key={recipe.id} 
                  className={`border rounded-lg overflow-hidden ${
                    isUrgent ? 'border-red-200' : 'border-yellow-200'
                  }`}
                >
                  {/* Recipe header */}
                  <div 
                    className={`p-4 flex justify-between items-center cursor-pointer ${
                      isUrgent ? 'bg-red-50' : 'bg-yellow-50'
                    }`}
                    onClick={() => toggleDetails(recipe.id)}
                  >
                    <div>
                      <div className="flex items-center">
                        <h3 className="text-lg font-medium">{recipe.name}</h3>
                        <span className={`ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          getPriorityBadgeColor(isUrgent)
                        }`}>
                          {isUrgent ? 'High Priority' : 'Medium Priority'}
                        </span>
                        {recipe.recommendedDiscount > 0 && (
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                            {recipe.recommendedDiscount}% Discount Suggested
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Uses {atRiskCount} at-risk ingredients 
                      </p>
                    </div>
                    {showDetails[recipe.id] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>

                  {/* Recipe details */}
                  {showDetails[recipe.id] && (
                    <div className="p-4 bg-white">
                      <p className="text-gray-700 mb-4">{recipe.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <h4 className="font-medium text-gray-700">Preparation Time</h4>
                          <p>{recipe.preparationTime}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-700">Cost Efficiency</h4>
                          <p>{recipe.costEfficiency}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-700">Recommended Discount</h4>
                          <p className="font-semibold text-green-600">{recipe.recommendedDiscount}%</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-medium text-gray-700 mb-2">Required Vegetables</h4>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {matchedVegetables.map((veg, index) => (
                              <div key={index} className="flex items-center">
                                <span className={`w-2 h-2 rounded-full mr-2 ${
                                  veg.isPoorQuality && veg.isLowStock ? 'bg-red-500' :
                                  veg.isPoorQuality || veg.isLowStock ? 'bg-yellow-500' : 'bg-green-500'
                                }`}></span>
                                <span className="text-sm">
                                  {veg.name} 
                                  <span className="text-gray-500 ml-1">
                                    ({veg.quantity} kg, {veg.quality})
                                  </span>
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex justify-end">
                        <button className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50">
                          Add to Daily Specials
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-800 mb-2">Summary</h3>
            <p className="text-gray-600">
              You have {urgentRecommendations.length + secondaryRecommendations.length} recipe recommendations 
              to help reduce waste of inventory items that are low in stock or lower in quality. 
              Adding these as daily specials with the suggested discounts can help minimize waste 
              while maximizing profits.
            </p>
          </div>

        </div>
      )}
    </div>
  );
}