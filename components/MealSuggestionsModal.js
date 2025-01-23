import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Modal, Portal, Card, Text, ActivityIndicator, Button } from 'react-native-paper';

export const MealSuggestionsModal = ({ visible, hideModal, suggestions, loading }) => {
  return (
    <Portal>
      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
        <Card>
          <Card.Content>
            <Text style={styles.title}>Personalized Meal Suggestions</Text>
            {loading ? (
              <ActivityIndicator size="large" style={styles.loader} />
            ) : (
              <ScrollView style={styles.content}>
                <Text style={styles.suggestions}>{suggestions}</Text>
              </ScrollView>
            )}
            <Button mode="contained" onPress={hideModal} style={styles.button}>
              Close
            </Button>
          </Card.Content>
        </Card>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    maxHeight: '80%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  content: {
    marginVertical: 15,
  },
  suggestions: {
    fontSize: 16,
    lineHeight: 24,
  },
  loader: {
    marginVertical: 20,
  },
  button: {
    marginTop: 20,
  }
});