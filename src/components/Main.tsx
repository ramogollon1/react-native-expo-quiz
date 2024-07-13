import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import quizList from "../../lib/questions.json";

import Quiz from "./Quiz";
import { useState } from "react";
import Logo from "./Logo";
import Score from "./Score";

export default function Main() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < quizList.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsQuizCompleted(true);
    }
  };

  const handleOnReset = () => {
    setCurrentQuestionIndex(0);
    setIsQuizCompleted(false);
    setScore(0);
  };

  if (quizList.length === 0) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <Logo style={styles.logo} />
      {!isQuizCompleted ? (
        <>
          <Text style={styles.counterText}>
            {`${currentQuestionIndex + 1} / ${quizList.length}`}
          </Text>
          <Quiz {...quizList[currentQuestionIndex]} onAnswer={handleAnswer} />
        </>
      ) : (
        <Score score={score} total={quizList.length} onReset={handleOnReset} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  counterText: {
    color: "#fff",
    fontSize: 20,
    marginBottom: 12,
  },
});
