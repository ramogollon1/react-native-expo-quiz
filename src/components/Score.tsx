import React from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";

type ScoreProps = {
  score: number;
  total: number;
  onReset: () => void;
};

export default function Score({ score, total, onReset }: ScoreProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>¡Felicidades!</Text>
      <Text style={styles.text}>Has completado el quiz.</Text>
      <Text style={styles.text}>
        Tu puntaje es: {score} de {total}
      </Text>
      <TouchableHighlight style={styles.resetButton} onPress={onReset}>
        <Text style={styles.resetText}>Reiniciar Quiz</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 16,
  },
  resetButton: {
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#fff",
    borderRadius: 4,
    marginTop: 24,
    padding: 14,
  },
  resetText: {
    color: "#000",
    fontSize: 18,
  },
});
