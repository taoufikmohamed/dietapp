const API_KEY = 'sk-xxxxxxxxxxxxxxxxxxxxxxxxx0922ce'; //for example
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

export const getMealSuggestions = async (calories, macros) => {
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
            content: `Create a detailed meal plan for ${calories} calories with:
              Protein: ${macros.protein}g
              Carbs: ${macros.carbs}g
              Fat: ${macros.fat}g`
          }
        ]
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('API Error:', error);
    return 'Unable to generate meal suggestions at this time.';
  }
};