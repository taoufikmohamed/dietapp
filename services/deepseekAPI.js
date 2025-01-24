const API_KEY = 'sk-92be99eee832402cb770d833cb0922ce'; //for example
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

export const getMealSuggestions = async (calories, macros, filters = {}) => {
  const {
    dietaryPreference = 'any', // vegetarian, vegan, pescatarian
    allergies = [],
    mealType = 'all', // breakfast, lunch, dinner, snacks
    cuisine = 'any'
  } = filters;

  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: "You are a professional nutritionist creating meal plans."
          },
          {
            role: "user",
            content: `Create a ${dietaryPreference} meal plan for ${mealType} with ${calories} calories.
                     Macros: Protein ${macros.protein}g, Carbs ${macros.carbs}g, Fat ${macros.fat}g.
                     Exclude: ${allergies.join(', ')}.
                     Cuisine preference: ${cuisine}`
          }
        ]
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error fetching meal suggestions:', error);
    throw new Error('Failed to get meal suggestions');
  }
};