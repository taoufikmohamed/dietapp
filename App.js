import React, { useState } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { Provider as PaperProvider, Button, TextInput, Text, Card, RadioButton, Divider } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { MealSuggestionsModal } from './components/MealSuggestionsModal';
import { getMealSuggestions } from './services/deepseekAPI';
import { Ionicons } from '@expo/vector-icons';

function MainApp() {
  const [weight, setWeight] = useState('');
  const [targetWeight, setTargetWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [activityLevel, setActivityLevel] = useState('sedentary');
  const [dietPlan, setDietPlan] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [suggestions, setSuggestions] = useState('');
  const [loading, setLoading] = useState(false);

  const calculateDietPlan = () => {
    if (!weight || !targetWeight || !height || !age) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    const bmr = gender === 'male'
      ? 88.362 + (13.397 * parseFloat(weight)) + (4.799 * parseFloat(height)) - (5.677 * parseFloat(age))
      : 447.593 + (9.247 * parseFloat(weight)) + (3.098 * parseFloat(height)) - (4.330 * parseFloat(age));

    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725
    };

    const maintenanceCalories = bmr * activityMultipliers[activityLevel];
    const weightDiff = parseFloat(weight) - parseFloat(targetWeight);
    const dailyCalories = weightDiff > 0 
      ? maintenanceCalories - 500 
      : maintenanceCalories + 500;

    setDietPlan({
      dailyCalories: Math.round(dailyCalories),
      weeklyWeightChange: weightDiff > 0 ? -0.5 : 0.5,
      macros: {
        protein: Math.round(parseFloat(weight) * (weightDiff > 0 ? 2.2 : 2.0)),
        carbs: Math.round((dailyCalories * 0.4) / 4),
        fat: Math.round((dailyCalories * 0.3) / 9)
      }
    });
  };

  const handleGetSuggestions = async () => {
    if (!dietPlan) return;
    
    setLoading(true);
    setModalVisible(true);
    
    const result = await getMealSuggestions(
      dietPlan.dailyCalories,
      dietPlan.macros
    );
    
    setSuggestions(result);
    setLoading(false);
  };

  const handleReset = () => {
    setWeight('');
    setTargetWeight('');
    setHeight('');
    setAge('');
    setGender('male');
    setActivityLevel('sedentary');
    setDietPlan(null);
    setSuggestions('');
    setLoading(false);
  };

  const renderMealSuggestions = () => {
    if (!suggestions) return null;
  
    return (
      <View style={styles.resultContainer}>
        <LinearGradient
          colors={['#43cea2', '#185a9d']}
          style={styles.gradientHeader}
        >
          <Text style={styles.resultTitle}>Your Personalized Meal Plan</Text>
          <Text style={styles.resultSubtitle}>Daily Calories: {dietPlan.dailyCalories} kcal</Text>
        </LinearGradient>
  
        <Card style={styles.mealCard}>
          <View style={styles.mealSection}>
            <View style={styles.mealHeader}>
              <Ionicons name="sunny" size={28} color="#FFA726" />
              <Text style={styles.mealTime}>Breakfast (8:00 AM)</Text>
            </View>
            <Text style={styles.mealContent}>{suggestions.breakfast}</Text>
          </View>
  
          <Divider style={styles.divider} />
  
          <View style={styles.mealSection}>
            <View style={styles.mealHeader}>
              <Ionicons name="restaurant" size={28} color="#4CAF50" />
              <Text style={styles.mealTime}>Lunch (1:00 PM)</Text>
            </View>
            <Text style={styles.mealContent}>{suggestions.lunch}</Text>
          </View>
  
          <Divider style={styles.divider} />
  
          <View style={styles.mealSection}>
            <View style={styles.mealHeader}>
              <Ionicons name="moon" size={28} color="#5C6BC0" />
              <Text style={styles.mealTime}>Dinner (7:00 PM)</Text>
            </View>
            <Text style={styles.mealContent}>{suggestions.dinner}</Text>
          </View>
  
          <Card style={styles.macrosCard}>
            <Text style={styles.macrosTitle}>Daily Macronutrients</Text>
            <View style={styles.macrosGrid}>
              <View style={styles.macroItem}>
                <Text style={styles.macroValue}>{dietPlan.macros.protein}g</Text>
                <Text style={styles.macroLabel}>Protein</Text>
              </View>
              <View style={styles.macroItem}>
                <Text style={styles.macroValue}>{dietPlan.macros.carbs}g</Text>
                <Text style={styles.macroLabel}>Carbs</Text>
              </View>
              <View style={styles.macroItem}>
                <Text style={styles.macroValue}>{dietPlan.macros.fat}g</Text>
                <Text style={styles.macroLabel}>Fat</Text>
              </View>
            </View>
          </Card>
        </Card>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.gradient}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.title}>Diet Planner</Text>
          
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.sectionTitle}>Personal Information</Text>
              <TextInput
                label="Current Weight (kg)"
                mode="outlined"
                keyboardType="numeric"
                value={weight}
                onChangeText={setWeight}
                style={styles.input}
              />
              <TextInput
                label="Target Weight (kg)"
                mode="outlined"
                keyboardType="numeric"
                value={targetWeight}
                onChangeText={setTargetWeight}
                style={styles.input}
              />
              <TextInput
                label="Height (cm)"
                mode="outlined"
                keyboardType="numeric"
                value={height}
                onChangeText={setHeight}
                style={styles.input}
              />
              <TextInput
                label="Age"
                mode="outlined"
                keyboardType="numeric"
                value={age}
                onChangeText={setAge}
                style={styles.input}
              />

              <Text style={styles.label}>Gender</Text>
              <RadioButton.Group onValueChange={value => setGender(value)} value={gender}>
                <RadioButton.Item label="Male" value="male" />
                <RadioButton.Item label="Female" value="female" />
              </RadioButton.Group>

              <Text style={styles.label}>Activity Level</Text>
              <RadioButton.Group onValueChange={value => setActivityLevel(value)} value={activityLevel}>
                <RadioButton.Item label="Sedentary" value="sedentary" />
                <RadioButton.Item label="Light Exercise" value="light" />
                <RadioButton.Item label="Moderate Exercise" value="moderate" />
                <RadioButton.Item label="Active" value="active" />
              </RadioButton.Group>
            </Card.Content>
          </Card>

          <View style={styles.buttonContainer}>
            <Button 
              mode="contained"
              onPress={calculateDietPlan}
              style={styles.calculateButton}
              labelStyle={styles.calculateButtonText}
              loading={loading}
            >
              CALCULATE MY PLAN
            </Button>
            <Button 
              mode="outlined"
              onPress={handleReset}
              style={styles.resetButton}
              labelStyle={styles.resetButtonText}
            >
              RESET
            </Button>
          </View>

          {dietPlan && (
            <Card style={styles.resultCard}>
              <Card.Content>
                <Text style={styles.resultTitle}>Your Diet Plan</Text>
                <Text style={styles.resultText}>Daily Calories: {dietPlan.dailyCalories} kcal</Text>
                <Text style={styles.resultText}>Weekly Weight Change: {dietPlan.weeklyWeightChange} kg</Text>
                
                <View style={styles.macrosContainer}>
                  <Text style={styles.macroTitle}>Recommended Macros</Text>
                  <View style={styles.macroItem}>
                    <Text style={styles.macroLabel}>Protein</Text>
                    <Text style={styles.macroValue}>{dietPlan.macros.protein}g</Text>
                    <Text style={styles.macroPercent}>
                      {Math.round((dietPlan.macros.protein * 4 / dietPlan.dailyCalories) * 100)}%
                    </Text>
                  </View>
                  <View style={styles.macroItem}>
                    <Text style={styles.macroLabel}>Carbs</Text>
                    <Text style={styles.macroValue}>{dietPlan.macros.carbs}g</Text>
                    <Text style={styles.macroPercent}>
                      {Math.round((dietPlan.macros.carbs * 4 / dietPlan.dailyCalories) * 100)}%
                    </Text>
                  </View>
                  <View style={styles.macroItem}>
                    <Text style={styles.macroLabel}>Fat</Text>
                    <Text style={styles.macroValue}>{dietPlan.macros.fat}g</Text>
                    <Text style={styles.macroPercent}>
                      {Math.round((dietPlan.macros.fat * 9 / dietPlan.dailyCalories) * 100)}%
                    </Text>
                  </View>
                </View>
              </Card.Content>
            </Card>
          )}

          {dietPlan && (
            <Button 
              mode="contained"
              onPress={handleGetSuggestions}
              style={styles.suggestionButton}
              labelStyle={styles.suggestionButtonText}
              loading={loading}
              icon={({size, color}) => (
                <Ionicons name="restaurant" size={24} color={color} />
              )}
            >
              GET MEAL SUGGESTIONS
            </Button>
          )}

          {renderMealSuggestions()}
        </ScrollView>
      </LinearGradient>

      <MealSuggestionsModal
        visible={modalVisible}
        hideModal={() => setModalVisible(false)}
        suggestions={suggestions}
        loading={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 20,
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    padding: 20,
  },
  title: {
    fontSize: 24, // Increased font size
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  card: {
    margin: 16,
  },
  input: {
    marginBottom: 12,
    fontSize: 18, // Increased font size
  },
  label: {
    fontSize: 20, // Increased font size
    marginTop: 12,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 10,
  },
  calculateButton: {
    flex: 2,
    backgroundColor: '#2196F3',
    padding: 8,
    elevation: 4,
  },
  calculateButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 1,
  },
  resetButton: {
    flex: 1,
    borderColor: '#FF5252',
    borderWidth: 2,
  },
  resetButtonText: {
    fontSize: 16,
    color: '#FF5252',
    fontWeight: 'bold',
  },
  button: {
    marginTop: 16,
    padding: 8,
  },
  loader: {
    marginTop: 20,
  },
  error: {
    color: 'red',
    marginTop: 10,
    fontSize: 18, // Increased font size
  },
  results: {
    marginTop: 20,
    fontSize: 18, // Increased font size
  },
  sectionTitle: {
    fontSize: 22, // Increased font size
    fontWeight: 'bold',
    marginBottom: 15,
  },
  resultCard: {
    marginTop: 20,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  resultText: {
    fontSize: 16,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  macrosContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    elevation: 2,
  },
  macroTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
    textAlign: 'center',
  },
  macroItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  macroLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#495057',
    flex: 1,
  },
  macroValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginHorizontal: 10,
  },
  macroPercent: {
    fontSize: 16,
    color: '#6c757d',
    width: 50,
    textAlign: 'right',
  },
  suggestionButton: {
    marginTop: 20,
    marginBottom: 10,
    padding: 12,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  suggestionButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: 'white',
    textTransform: 'uppercase',
  },
  suggestionsCard: {
    marginTop: 20,
    marginHorizontal: 16,
    borderRadius: 12,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  mealSection: {
    marginVertical: 12,
  },
  mealTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  mealContent: {
    fontSize: 18,
    lineHeight: 24,
    marginLeft: 32,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 12,
  },
  nutritionCard: {
    marginTop: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  nutritionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1565C0',
    marginBottom: 8,
  },
  nutritionText: {
    fontSize: 18,
    marginVertical: 4,
    color: '#424242',
  },
  resultContainer: {
    margin: 16,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: 'white',
    elevation: 5,
  },
  gradientHeader: {
    padding: 20,
    alignItems: 'center',
  },
  resultSubtitle: {
    fontSize: 18,
    color: 'white',
    opacity: 0.9,
  },
  mealCard: {
    padding: 16,
    backgroundColor: 'white',
  },
  mealHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  mealTime: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#424242',
  },
  macrosCard: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
  },
  macrosTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
    marginBottom: 16,
  },
  macrosGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  macroValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1565C0',
  },
  macroLabel: {
    fontSize: 16,
    color: '#757575',
    marginTop: 4,
  }
});

export default function App() {
  return (
    <PaperProvider>
      <MainApp />
    </PaperProvider>
  );
}