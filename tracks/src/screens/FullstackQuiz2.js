import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const FullstackQuiz2 = () => {
  const [questions, setQuestions] = useState([
    {
        id: '1',
        question: 'In React, what is the purpose of the "useMemo" hook?',
        options: [
          'To memoize expensive calculations and prevent unnecessary re-renders',
          'To handle side effects like data fetching',
          'To manage local component state',
          'To set up component lifecycle methods',
        ],
        correctAnswer: 'To memoize expensive calculations and prevent unnecessary re-renders',
        explanation: 'The "useMemo" hook is used to memoize the result of expensive calculations to prevent them from being recalculated on every render.'
      },
      {
        id: '2',
        question: 'What is the difference between "null" and "undefined" in JavaScript?',
        options: [
          'Both are used to represent the absence of a value but in different ways',
          'Null is a data type, and undefined is not',
          'Undefined is used for objects, and null for primitive types',
          'There is no difference between null and undefined',
        ],
        correctAnswer: 'Both are used to represent the absence of a value but in different ways',
        explanation: 'Null represents an intentional absence of a value, while undefined means a variable has been declared but not assigned a value.'
      },
      {
        id: '3',
        question: 'What is the main difference between REST and GraphQL APIs?',
        options: [
          'REST uses fixed endpoints, while GraphQL allows for dynamic queries on a single endpoint',
          'GraphQL requires a database connection, but REST does not',
          'REST is faster than GraphQL',
          'REST APIs can return more data than GraphQL APIs',
        ],
        correctAnswer: 'REST uses fixed endpoints, while GraphQL allows for dynamic queries on a single endpoint',
        explanation: 'In REST, endpoints are fixed and return predefined data. In GraphQL, clients can query exactly the data they need from a single endpoint.'
      },
      {
        id: '4',
        question: 'How does the "this" keyword work in JavaScript arrow functions?',
        options: [
          'The value of "this" is lexically inherited from the outer function scope',
          'The value of "this" is dynamically determined based on how the function is called',
          'The value of "this" is always undefined inside arrow functions',
          'Arrow functions do not support the "this" keyword',
        ],
        correctAnswer: 'The value of "this" is lexically inherited from the outer function scope',
        explanation: 'In arrow functions, the value of "this" is lexically inherited from the surrounding context, unlike regular functions where "this" is dynamically determined.'
      },
      {
        id: '5',
        question: 'Which of the following is true about SQL Joins?',
        options: [
          'INNER JOIN returns rows when there is a match in both tables',
          'LEFT JOIN returns only the rows from the right table',
          'RIGHT JOIN returns only the rows from the left table',
          'JOIN always results in a cartesian product of the tables',
        ],
        correctAnswer: 'INNER JOIN returns rows when there is a match in both tables',
        explanation: 'The "INNER JOIN" returns only the rows where there is a match in both tables, excluding unmatched rows.'
      },
      {
        id: '6',
        question: 'In Node.js, how do you handle errors in asynchronous functions?',
        options: [
          'By using try-catch blocks around asynchronous code',
          'By passing an error as the first argument in the callback function',
          'By using promises with .then() and .catch() methods',
          'All of the above',
        ],
        correctAnswer: 'All of the above',
        explanation: 'In Node.js, errors in asynchronous code can be handled by using try-catch, passing errors in callbacks, or using promises with .then() and .catch() methods.'
      },
      {
        id: '7',
        question: 'Which of the following is true about JWT (JSON Web Tokens)?',
        options: [
          'JWT is used for authentication and securely transmitting information between parties',
          'JWT is encrypted by default',
          'JWT is only used for database transactions',
          'JWT can only be used for authorization purposes',
        ],
        correctAnswer: 'JWT is used for authentication and securely transmitting information between parties',
        explanation: 'JWT is a compact, URL-safe token format that is used for securely transmitting information between parties, primarily for authentication and authorization.'
      },
      {
        id: '8',
        question: 'What does "CORS" stand for in web development?',
        options: [
          'Cross-Origin Resource Sharing',
          'Cross-Origin Request Security',
          'Create Online Resource Sharing',
          'Cross-Origin Request Sharing',
        ],
        correctAnswer: 'Cross-Origin Resource Sharing',
        explanation: 'CORS (Cross-Origin Resource Sharing) is a mechanism that allows web browsers to make requests to domains other than the origin domain, securing cross-origin requests.'
      },
      {
        id: '9',
        question: 'What is the purpose of a WebSocket in modern web development?',
        options: [
          'To provide a persistent, real-time, two-way communication channel between client and server',
          'To store data in the browser cache',
          'To manage HTTP headers',
          'To improve performance by compressing HTTP requests',
        ],
        correctAnswer: 'To provide a persistent, real-time, two-way communication channel between client and server',
        explanation: 'WebSockets allow for persistent, real-time, two-way communication between the client and server, unlike the request-response model of HTTP.'
      },
      {
        id: '10',
        question: 'What is the primary purpose of Redux in React applications?',
        options: [
          'To handle side effects like data fetching',
          'To manage the global state of the application',
          'To improve the performance of React components',
          'To handle routing between different views',
        ],
        correctAnswer: 'To manage the global state of the application',
        explanation: 'Redux is a state management library that helps manage the global state of a React application, making it easier to handle and share data between components.'
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
          <Text style={styles.header}>Full-Stack Mid-Level Quiz</Text>
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

export default FullstackQuiz2;
