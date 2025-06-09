import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Spacer from '../components/Spacer';

const FrontendQuiz2 = () => {
  const [questions, setQuestions] = useState([
    {
        id: '1',
        question: 'What is the purpose of the "useEffect" hook in React?',
        options: [
          'To define state variables in functional components',
          'To perform side effects in functional components',
          'To handle form inputs',
          'To update the DOM directly'
        ],
        correctAnswer: 'To perform side effects in functional components',
        explanation: 'The "useEffect" hook is used to perform side effects like fetching data or manipulating the DOM in functional components.'
      },
      {
        id: '2',
        question: 'Which of the following methods is used to create a deep copy of an object in JavaScript?',
        options: ['Object.assign()', 'JSON.parse(JSON.stringify())', 'Object.clone()', 'spread operator'],
        correctAnswer: 'JSON.parse(JSON.stringify())',
        explanation: 'Using "JSON.parse(JSON.stringify())" is a common way to create a deep copy of an object in JavaScript.'
      },
      {
        id: '3',
        question: 'What is the difference between "null" and "undefined" in JavaScript?',
        options: [
          'Null is a type, while undefined is a value',
          'Undefined is a type, while null is a value',
          'Both represent the same thing',
          'Null is used for uninitialized variables, while undefined is used for non-existing variables'
        ],
        correctAnswer: 'Undefined is a type, while null is a value',
        explanation: 'In JavaScript, "undefined" is a type and is assigned to variables that are declared but not yet assigned a value, whereas "null" is a value that represents the intentional absence of any object value.'
      },
      {
        id: '4',
        question: 'What is the primary purpose of the "virtual DOM" in React?',
        options: [
          'To improve the performance of updates by minimizing direct DOM manipulation',
          'To handle event delegation',
          'To store the actual data of components',
          'To provide a way to render UI on the server side'
        ],
        correctAnswer: 'To improve the performance of updates by minimizing direct DOM manipulation',
        explanation: 'The virtual DOM is a lightweight copy of the real DOM that React uses to optimize rendering and minimize direct DOM manipulation.'
      },
      {
        id: '5',
        question: 'Which of the following best describes a "higher-order component" in React?',
        options: [
          'A component that receives a component as a prop and returns a new component',
          'A component that renders other components in a specific order',
          'A component that controls state management',
          'A component that handles form validation'
        ],
        correctAnswer: 'A component that receives a component as a prop and returns a new component',
        explanation: 'A higher-order component (HOC) is a pattern in React that allows you to reuse component logic by accepting a component as an argument and returning a new component.'
      },
      {
        id: '6',
        question: 'In CSS, what does the "z-index" property control?',
        options: [
          'The stacking order of elements on the page',
          'The font size of text',
          'The visibility of elements',
          'The alignment of elements'
        ],
        correctAnswer: 'The stacking order of elements on the page',
        explanation: 'The "z-index" property in CSS controls the stacking order of elements, allowing you to position elements in front of or behind other elements.'
      },
      {
        id: '7',
        question: 'Which method can be used to prevent event propagation in JavaScript?',
        options: [
          'event.preventDefault()',
          'event.stopPropagation()',
          'event.stopImmediatePropagation()',
          'Both event.stopPropagation() and event.preventDefault()'
        ],
        correctAnswer: 'event.stopPropagation()',
        explanation: 'The "event.stopPropagation()" method prevents further propagation of an event in the capturing and bubbling phases.'
      },
      {
        id: '8',
        question: 'What is the difference between "let" and "var" in JavaScript?',
        options: [
          'Let is block-scoped, while var is function-scoped',
          'Var is block-scoped, while let is function-scoped',
          'Let is used for constants, while var is used for variables',
          'There is no difference between let and var'
        ],
        correctAnswer: 'Let is block-scoped, while var is function-scoped',
        explanation: 'In JavaScript, "let" has block-level scope, whereas "var" has function-level scope.'
      },
      {
        id: '9',
        question: 'What does the "async/await" syntax provide in JavaScript?',
        options: [
          'A way to handle promises asynchronously',
          'A way to handle error handling in promises',
          'A way to make asynchronous code behave synchronously',
          'A way to delay the execution of code'
        ],
        correctAnswer: 'A way to make asynchronous code behave synchronously',
        explanation: 'The "async/await" syntax makes it easier to work with asynchronous code by allowing it to look and behave like synchronous code.'
      },
      {
        id: '10',
        question: 'Which of the following methods is used to apply styles to React components?',
        options: [
          'inline styles',
          'CSS classes',
          'CSS-in-JS libraries',
          'All of the above'
        ],
        correctAnswer: 'All of the above',
        explanation: 'In React, styles can be applied using inline styles, external CSS classes, or CSS-in-JS libraries like styled-components.'
      }
  ]);

 const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [resultData, setResultData] = useState([]);
  const [finalGrade, setFinalGrade] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (timeLeft > 0 && !showResults) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !showResults) {
      handleNextQuestion();
    }
  }, [timeLeft, showResults]);

  const handleSelectAnswer = (answer) => {
    setSelectedAnswers({ ...selectedAnswers, [questions[currentQuestionIndex].id]: answer });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(60);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    let score = 0;
    const results = questions.map((q) => {
      const userAnswer = selectedAnswers[q.id];
      const isCorrect = userAnswer === q.correctAnswer;
      if (isCorrect) score += 10;
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
    <>
      <Spacer />
            <Spacer />
      <Spacer />

      <ScrollView contentContainerStyle={styles.container}>
        {!showResults && (
          <>
            <Text style={styles.title}>Frontend Mid-Level Quiz</Text>
            <Text style={styles.timer}>⏱️ {timeLeft}s</Text>
            <View style={styles.card}>
              <Text style={styles.question}>{questions[currentQuestionIndex].question}</Text>
              {questions[currentQuestionIndex].options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    selectedAnswers[questions[currentQuestionIndex].id] === option && styles.selectedOption,
                  ]}
                  onPress={() => handleSelectAnswer(option)}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.button} onPress={handleNextQuestion}>
              <Text style={styles.buttonText}>
                {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Submit'}
              </Text>
            </TouchableOpacity>
          </>
        )}

        {showResults && (
          <>
            <Text style={styles.resultHeader}>Final Score: {finalGrade} / {questions.length * 10}</Text>
            {resultData.map((item, index) => (
              <View key={index} style={styles.resultCard}>
                <View style={styles.cardHeader}>
                  <Icon name={item.isCorrect ? 'check-circle' : 'x-circle'} size={18} color={item.isCorrect ? '#2e7d32' : '#c62828'} />
                  <Text style={styles.resultQuestion}>{item.question}</Text>
                </View>
                <Text style={[styles.answerText, { color: item.isCorrect ? '#2e7d32' : '#c62828' }]}>
                  Your Answer: {item.userAnswer}
                </Text>
                <Text style={styles.correctAnswer}>Correct: {item.correctAnswer}</Text>
                <Text style={styles.explanation}>Explanation: {item.explanation}</Text>
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1c1c1e',
    textAlign: 'center',
    marginBottom: 10,
  },
  timer: {
    fontSize: 18,
    fontWeight: '600',
    color: '#e53935',
    textAlign: 'center',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  optionButton: {
    padding: 12,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: '#cce5ff',
    borderColor: '#004085',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#034694',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  resultHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0d47a1',
    textAlign: 'center',
    marginBottom: 25,
  },
  resultCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  resultQuestion: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    color: '#1c1c1e',
  },
  answerText: {
    fontSize: 15,
    marginBottom: 5,
  },
  correctAnswer: {
    fontSize: 15,
    color: '#333',
  },
  explanation: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
});

export default FrontendQuiz2;
