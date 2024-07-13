import React, { useEffect, useState } from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import { Question } from "models/quiz";
import { Audio } from "expo-av";
import wrongSong from "../../assets/sounds/wrong.mp3";
import correctSong from "../../assets/sounds/correct.mp3";

type QuizProps = Question & {
  onAnswer: (isCorrect: boolean) => void;
};

export default function Quiz({
  question,
  options,
  answer,
  onAnswer,
}: QuizProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const handleAnswer = (selectedOption: string) => {
    const isCorrect = selectedOption === answer;
    if (!isCorrect) {
      playIncorrectSound();
    } else {
      playCorrectSound();
    }
    setSelectedOption(selectedOption);
    setTimeout(() => {
      setSelectedOption(null);
      onAnswer(isCorrect);
    }, 2000);
  };

  const playIncorrectSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(wrongSong);
      setSound(sound);
      await sound.playAsync();
    } catch (error) {
      console.log("Error al reproducir el sonido:", error);
    }
  };

  const playCorrectSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(correctSong);
      setSound(sound);
      await sound.playAsync();
    } catch (error) {
      console.log("Error al reproducir el sonido:", error);
    }
  };

  return (
    <>
      <Text style={styles.question}>{question}</Text>
      {options.map((option, index) => (
        <Pressable
          style={[
            styles.wrapperOption,
            selectedOption === option &&
              (selectedOption !== answer ? styles.correct : styles.incorrect),
          ]}
          key={index}
          onPress={() => handleAnswer(option)}
        >
          <Text style={styles.titleOption}>{option}</Text>
        </Pressable>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  question: {
    fontSize: 18,
    marginBottom: 12,
    textAlign: "center",
    color: "#fff",
  },
  feedback: {
    marginTop: 20,
    fontSize: 20,
    color: "#fff",
  },
  wrapperOption: {
    marginTop: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 12,
    width: "100%",
    color: "#fff",
  },
  titleOption: {
    color: "#fff",
    fontSize: 16,
  },
  correct: {
    borderColor: "red",
  },
  incorrect: {
    borderColor: "green",
  },
});
