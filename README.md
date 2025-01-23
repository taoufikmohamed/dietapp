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
DEEPSEEK_API_KEY=your_api_key_here # LLM model API_KEY  example of Deepseek model

## BMR
A BMR Calculator is a tool that calculates your Basal Metabolic Rate (BMR), which is the number of calories your body needs to perform basic functions (like breathing, circulation, and cell production) at rest. In other words, it’s the number of calories you’d burn if you stayed in bed all day.

BMR is a key component in determining your Total Daily Energy Expenditure (TDEE), which is the total number of calories you burn in a day, including physical activity. Knowing your BMR is essential for creating a personalized diet plan, especially for weight loss, weight gain, or weight maintenance.

How BMR is Calculated
BMR is calculated using formulas that take into account factors like:

Age

Gender

Weight

Height

The two most commonly used formulas are:

1. Mifflin-St Jeor Equation
This is the most accurate formula for most people.

For Men:


BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5
For Women:


BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161
2. Harris-Benedict Equation
This is an older formula but is still widely used.

For Men:

BMR = 88.362 + (13.397 × weight in kg) + (4.799 × height in cm) - (5.677 × age in years)
For Women:

BMR = 447.593 + (9.247 × weight in kg) + (3.098 × height in cm) - (4.330 × age in years)
How to Use BMR for Weight Loss
Calculate Your BMR:

Use one of the formulas above to calculate your BMR.

Calculate Your TDEE:

Multiply your BMR by an activity factor to estimate your TDEE:

Sedentary (little or no exercise): BMR × 1.2

Lightly active (light exercise 1–3 days/week): BMR × 1.375

Moderately active (moderate exercise 3–5 days/week): BMR × 1.55

Very active (hard exercise 6–7 days/week): BMR × 1.725

Extra active (very hard exercise + physical job): BMR × 1.9

Set Your Calorie Goal:

To lose weight, consume fewer calories than your TDEE (e.g., 500 calories less per day to lose ~0.5 kg per week).

To gain weight, consume more calories than your TDEE.
