import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const FullstackQuiz3 = () => {
  const [questions, setQuestions] = useState([
    {
        id: '1',
        question: 'What is the primary advantage of using Server-Side Rendering (SSR) with React?',
        options: [
          'Improved SEO and faster initial page load time',
          'Faster client-side rendering',
          'Less server load',
          'No need for JavaScript to run on the client side'
        ],
        correctAnswer: 'Improved SEO and faster initial page load time',
        explanation: 'SSR improves SEO and provides a faster initial page load because the HTML is rendered on the server before being sent to the client.'
      },
      {
        id: '2',
        question: 'What is the difference between an "Index" and a "Foreign Key" in SQL databases?',
        options: [
          'An Index speeds up query performance, while a Foreign Key enforces relationships between tables',
          'An Index is a type of Foreign Key',
          'A Foreign Key is used for querying, while an Index is used for updating data',
          'Foreign Key is used to create tables while Index is used to alter them'
        ],
        correctAnswer: 'An Index speeds up query performance, while a Foreign Key enforces relationships between tables',
        explanation: 'An Index improves query performance, while a Foreign Key enforces referential integrity between two tables.'
      },
      {
        id: '3',
        question: 'In Node.js, what is the role of the "Event Loop"?',
        options: [
          'Handles synchronous operations',
          'Manages all asynchronous callbacks',
          'Executes the JavaScript code line-by-line',
          'Monitors server requests'
        ],
        correctAnswer: 'Manages all asynchronous callbacks',
        explanation: 'The Event Loop is responsible for handling asynchronous callbacks in Node.js and ensuring non-blocking I/O operations.'
      },
      {
        id: '4',
        question: 'Which of the following optimizations can significantly improve the performance of a React application?',
        options: [
          'Using useMemo and React.PureComponent to prevent unnecessary re-renders',
          'Avoiding the use of Hooks entirely',
          'Only using functional components and avoiding class components',
          'Reducing the number of API calls'
        ],
        correctAnswer: 'Using useMemo and React.PureComponent to prevent unnecessary re-renders',
        explanation: 'Using React.PureComponent and useMemo helps optimize performance by preventing unnecessary re-renders when props or state have not changed.'
      },
      {
        id: '5',
        question: 'In MongoDB, what is the purpose of the "Aggregation Framework"?',
        options: [
          'To perform complex queries like filtering and sorting documents',
          'To create multiple indexes on collections',
          'To manage authentication and authorization for different users',
          'To track and manage database transactions'
        ],
        correctAnswer: 'To perform complex queries like filtering and sorting documents',
        explanation: 'The Aggregation Framework allows you to perform advanced queries such as filtering, sorting, and grouping data within MongoDB.'
      },
      {
        id: '6',
        question: 'What is the primary difference between a GET and POST request in REST APIs?',
        options: [
          'GET is used for retrieving data, while POST is used for sending data to be processed',
          'GET can send data in the request body, while POST cannot',
          'GET requests are always faster than POST requests',
          'POST requests are stateless, while GET requests are stateful'
        ],
        correctAnswer: 'GET is used for retrieving data, while POST is used for sending data to be processed',
        explanation: 'GET requests are used to fetch data, while POST is used to send data (like creating a resource) to the server for processing.'
      },
      {
        id: '7',
        question: 'What is the main advantage of using WebSockets over HTTP for real-time applications?',
        options: [
          'WebSockets provide a persistent connection for bidirectional communication, while HTTP is request-response based',
          'WebSockets are easier to implement than HTTP',
          'WebSockets can only be used for authentication purposes',
          'WebSockets have better performance than HTTP for static content delivery'
        ],
        correctAnswer: 'WebSockets provide a persistent connection for bidirectional communication, while HTTP is request-response based',
        explanation: 'WebSockets allow persistent, bidirectional communication between client and server, which is ideal for real-time applications, unlike HTTP’s request-response model.'
      },
      {
        id: '8',
        question: 'Which of the following best describes the role of middleware in Express.js?',
        options: [
          'Middleware is used to handle HTTP requests and responses before they are processed by routes',
          'Middleware is used for error handling only',
          'Middleware is used to directly connect the client to the server',
          'Middleware is responsible for managing database connections'
        ],
        correctAnswer: 'Middleware is used to handle HTTP requests and responses before they are processed by routes',
        explanation: 'In Express.js, middleware functions are executed in the order they are defined and can modify requests and responses before they reach the route handlers.'
      },
      {
        id: '9',
        question: 'Which of the following best describes the process of Component Composition in React?',
        options: [
          'Creating components that interact with each other by passing data through props',
          'Making components that are reusable across multiple pages',
          'Building components that are connected to the server directly',
          'Writing components that handle global state using Redux'
        ],
        correctAnswer: 'Creating components that interact with each other by passing data through props',
        explanation: 'Component Composition in React refers to building components that communicate with each other by passing data through props, which allows for reusability and modularization.'
      },
      {
        id: '10',
        question: 'What is the purpose of a CI/CD pipeline in software development?',
        options: [
          'To automate testing, building, and deployment processes',
          'To improve security by scanning code for vulnerabilities',
          'To enable multiple developers to work on the same codebase without conflicts',
          'To manage code versioning and branching'
        ],
        correctAnswer: 'To automate testing, building, and deployment processes',
        explanation: 'CI/CD pipelines automate the process of integrating code changes, testing, building, and deploying applications, improving development speed and quality.'
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
          <Text style={styles.header}>Full-Stack Hard-Level Quiz</Text>
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

export default FullstackQuiz3;
