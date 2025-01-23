# Diet Planner App

A React Native application for personalized meal planning and diet tracking.

## Features
- BMR Calculator
- Daily Calorie Requirements
- Personalized Meal Suggestions
- Macro Nutrient Tracking

## Project Structure

weightloss-app/
├── src/
│   ├── components/
│   │   ├── ProgressIndicator.js     # Progress bar and steps
│   │   ├── MealSuggestionsModal.js  # Modal for meal plan display
│   │   └── DietPlanForm.js         # Input form for user data
│   ├── services/
│   │   └── deepseekAPI.js          # API integration
│   ├── styles/
│   │   └── globalStyles.js         # Shared styles
│   ├── utils/
│   │   └── calculations.js         # Diet calculations
│   └── App.js                      # Main component
├── assets/
│   ├── icon.png
│   ├── splash.png
│   └── favicon.png
├── app.json                        # Expo configuration
├── babel.config.js                 # Babel configuration
├── package.json                    # Dependencies
└── .env                           # Environment variables

## Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Create `.env` file with required API keys
4. Run the app: `npx expo start`

## Environment Variables
Create a `.env` file with:
```env
DEEPSEEK_API_KEY=your_api_key_here