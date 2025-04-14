import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

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
          <Text style={styles.header}>Frontend Mid-Level Quiz</Text>
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

export default FrontendQuiz2;
