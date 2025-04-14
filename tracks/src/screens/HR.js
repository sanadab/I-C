import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const HR = () => {
  const [questions, setQuestions] = useState([
    {
        id: '1',
        question: 'What is your greatest strength?',
        options: ['Teamwork', 'Leadership', 'Creativity', 'Time Management'],
        correctAnswer: 'Leadership'
    },
    {
        id: '2',
        question: 'How do you handle stress?',
        options: ['Exercise', 'Meditation', 'Planning ahead', 'Avoiding tasks'],
        correctAnswer: 'Planning ahead'
    },
    {
        id: '3',
        question: 'What motivates you to work?',
        options: ['Money', 'Recognition', 'Personal Growth', 'Team Success'],
        correctAnswer: 'Personal Growth'
    },
    {
        id: '4',
        question: 'What is the most important factor in a team?',
        options: ['Communication', 'Collaboration', 'Skills', 'Experience'],
        correctAnswer: 'Communication'
    },
    {
        id: '5',
        question: 'What do you consider a professional weakness?',
        options: ['Lack of Skills', 'Perfectionism', 'Overcommitment', 'Time Management Issues'],
        correctAnswer: 'Perfectionism'
    },
    {
        id: '6',
        question: 'How do you prioritize tasks?',
        options: ['Urgency and Importance', 'Deadline Only', 'Randomly', 'Based on Preference'],
        correctAnswer: 'Urgency and Importance'
    },
    {
        id: '7',
        question: 'What would you do if you made a mistake at work?',
        options: ['Hide it', 'Admit and Learn', 'Blame Others', 'Ignore It'],
        correctAnswer: 'Admit and Learn'
    },
    {
        id: '8',
        question: 'How do you handle feedback?',
        options: ['Accept and Improve', 'Defend Your Actions', 'Ignore It', 'Get Defensive'],
        correctAnswer: 'Accept and Improve'
    },
    {
        id: '9',
        question: 'What is the best approach to conflict resolution?',
        options: ['Avoid It', 'Open Discussion', 'Confront Aggressively', 'Ignore the Issue'],
        correctAnswer: 'Open Discussion'
    },
    {
        id: '10',
        question: 'What quality do you value most in a leader?',
        options: ['Vision', 'Empathy', 'Decisiveness', 'Authority'],
        correctAnswer: 'Empathy'
    }
  ]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [resultData, setResultData] = useState([]);
  const [finalGrade, setFinalGrade] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60); // Set 1 minute timer for each question

  useEffect(() => {
    if (timeLeft > 0 && !showResults) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !showResults) {
      handleNextQuestion(); // Move to the next question when the timer reaches 0
    }
  }, [timeLeft, showResults]);

  const handleSelectAnswer = (answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questions[currentQuestionIndex].id]: answer,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(60); // Reset the timer to 1 minute for the next question
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    let score = 0;
    let results = questions.map((q) => {
      const userAnswer = selectedAnswers[q.id];
      const isCorrect = userAnswer === q.correctAnswer;
      if (isCorrect) {
        score += 10;
      }

      return {
        question: q.question,
        userAnswer: userAnswer || 'No answer',
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        isCorrect,
      };
    });

    setShowResults(true);
    setResultData(results);
    setFinalGrade(score);
  };

  return (
    <View style={styles.container}>
      {!showResults && (
        <>
          <Text style={styles.header}>IT Low-Level Quiz</Text>
          <Text style={styles.timer}>Time Left: {timeLeft}s</Text>
        </>
      )}

      {showResults ? (
        <View style={styles.resultsContainer}>
          <Text style={styles.gradeText}>Final Score: {finalGrade} / {questions.length * 10}</Text>
          <FlatList
            data={resultData}
            renderItem={({ item }) => (
              <View style={styles.resultItem}>
                <Text style={styles.questionText}>{item.question}</Text>
                <Text
                  style={[styles.answerText, item.isCorrect ? { color: 'green' } : { color: 'red' }]}>{`Your Answer: ${item.userAnswer}`}</Text>
                <Text style={styles.answerText}>Correct Answer: {item.correctAnswer}</Text>
                <Text style={styles.explanationText}>Explanation: {item.explanation}</Text>
              </View>
            )}
            keyExtractor={(item) => item.question}
          />
        </View>
      ) : (
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{questions[currentQuestionIndex].question}</Text>
          {questions[currentQuestionIndex].options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.optionButton, selectedAnswers[questions[currentQuestionIndex].id] === option && { backgroundColor: '#4CAF50' }]}
              onPress={() => handleSelectAnswer(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {!showResults && (
        <TouchableOpacity style={styles.buttonStyle} onPress={handleNextQuestion}>
          <Text style={styles.buttonTextStyle}>
            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Submit'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    color: '#0d47a1',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
    fontSize: 28,
  },
  timer: {
    fontSize: 18,
    color: '#e53935',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  resultsContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  gradeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0d47a1',
    marginBottom: 20,
  },
  questionContainer: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  questionText: {
    fontSize: 20,
    color: '#333',
    fontWeight: '500',
    marginBottom: 15,
  },
  optionButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: '#555',
  },
  buttonStyle: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: '#0d47a1',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextStyle: {
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
  },
  resultItem: {
    marginBottom: 20,
  },
  answerText: {
    fontSize: 16,
    marginBottom: 5,
  },
  explanationText: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
});

export default HR;
