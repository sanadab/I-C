import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const FullstackQuiz1 = () => {
  const [questions, setQuestions] = useState([
    {
        id: '1',
        question: 'What does the "const" keyword do in JavaScript?',
        options: ['Declares a variable that cannot be reassigned', 'Declares a variable that can be reassigned', 'Defines a function', 'None of the above'],
        correctAnswer: 'Declares a variable that cannot be reassigned',
        explanation: 'The "const" keyword in JavaScript is used to declare a variable whose value cannot be reassigned after initialization.'
      },
      {
        id: '2',
        question: 'Which HTTP method is used to update a resource on the server?',
        options: ['GET', 'POST', 'PUT', 'DELETE'],
        correctAnswer: 'PUT',
        explanation: 'The "PUT" HTTP method is used to update or replace a resource on the server.'
      },
      {
        id: '3',
        question: 'What is the purpose of the "useEffect" hook in React?',
        options: [
          'To manage state in a functional component',
          'To handle side effects like fetching data or subscribing to services',
          'To define a component’s lifecycle methods',
          'To render JSX'
        ],
        correctAnswer: 'To handle side effects like fetching data or subscribing to services',
        explanation: 'The "useEffect" hook allows you to perform side effects such as data fetching, subscriptions, or manually updating the DOM in React functional components.'
      },
      {
        id: '4',
        question: 'What is a RESTful API?',
        options: ['A database management system', 'A software development framework', 'An architectural style for designing networked applications', 'A front-end JavaScript framework'],
        correctAnswer: 'An architectural style for designing networked applications',
        explanation: 'REST (Representational State Transfer) is an architectural style for designing networked applications, often used in web services for communication between clients and servers.'
      },
      {
        id: '5',
        question: 'Which SQL command is used to delete records from a table?',
        options: ['DROP', 'DELETE', 'REMOVE', 'TRUNCATE'],
        correctAnswer: 'DELETE',
        explanation: 'The "DELETE" command is used in SQL to remove records from a table based on a condition.'
      },
      {
        id: '6',
        question: 'What is the purpose of a foreign key in a relational database?',
        options: ['To uniquely identify each record in a table', 'To create a relationship between two tables', 'To store large binary data', 'To index a column'],
        correctAnswer: 'To create a relationship between two tables',
        explanation: 'A foreign key in a relational database is used to establish and enforce a link between the data in two tables.'
      },
      {
        id: '7',
        question: 'Which HTTP status code indicates that a request was successful?',
        options: ['200', '400', '404', '500'],
        correctAnswer: '200',
        explanation: 'The "200 OK" status code indicates that a request has been successfully processed by the server.'
      },
      {
        id: '8',
        question: 'Which of the following is a NoSQL database?',
        options: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQLite'],
        correctAnswer: 'MongoDB',
        explanation: 'MongoDB is a NoSQL database, meaning it stores data in a non-relational format, often used for flexible and scalable applications.'
      },
      {
        id: '9',
        question: 'In Node.js, which module is used to handle HTTP requests?',
        options: ['http', 'express', 'url', 'fs'],
        correctAnswer: 'http',
        explanation: 'In Node.js, the "http" module is used to create servers and handle HTTP requests and responses.'
      },
      {
        id: '10',
        question: 'What is the purpose of a session in web development?',
        options: [
          'To store temporary data about a user between requests',
          'To load data from a database',
          'To manage server-side routing',
          'To handle database transactions'
        ],
        correctAnswer: 'To store temporary data about a user between requests',
        explanation: 'A session in web development is used to store temporary information about a user, such as login status, across multiple HTTP requests.'
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
          <Text style={styles.header}>Full-Stack Low-Level Quiz</Text>
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

export default FullstackQuiz1;
