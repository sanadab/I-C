import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const QAQuiz2 = () => {
  const [questions, setQuestions] = useState([
    {
        id: '1',
        question: 'What is the purpose of a Continuous Integration (CI) pipeline in test automation?',
        options: [
          'To deploy the application after every code change',
          'To automate the execution of tests and catch integration issues early',
          'To monitor user activity in production',
          'To automatically deploy test environments for every test'
        ],
        correctAnswer: 'To automate the execution of tests and catch integration issues early',
        explanation: 'CI pipelines are essential for running automated tests on new changes to catch errors quickly and ensure the software works as expected after updates.'
      },
      {
        id: '2',
        question: 'Which of the following tools is used for API testing?',
        options: ['Jest', 'Postman', 'Jira', 'Selenium'],
        correctAnswer: 'Postman',
        explanation: 'Postman is a popular tool used for testing APIs by making requests and validating responses.'
      },
      {
        id: '3',
        question: 'What is the purpose of load testing?',
        options: [
          'To check if the system meets functional requirements',
          'To evaluate the system’s behavior under expected and stress conditions',
          'To test the user interface for responsiveness',
          'To evaluate code quality'
        ],
        correctAnswer: 'To evaluate the system’s behavior under expected and stress conditions',
        explanation: 'Load testing evaluates how the system performs under varying levels of load, helping identify bottlenecks and performance issues.'
      },
      {
        id: '4',
        question: 'What is a common method for handling test data in automation testing?',
        options: [
          'Manually entering data during each test run',
          'Using mock data and stubbing external API calls',
          'Writing test data in hardcoded scripts',
          'Using production data for tests'
        ],
        correctAnswer: 'Using mock data and stubbing external API calls',
        explanation: 'Mock data and stubbing are used to simulate real-world conditions while ensuring tests are isolated and reliable.'
      },
      {
        id: '5',
        question: 'What is the key difference between black-box testing and gray-box testing?',
        options: [
          'Gray-box testing tests only the UI, black-box testing tests only the backend',
          'Black-box testing focuses on external functionality, while gray-box testing combines internal knowledge with external testing',
          'There is no difference',
          'Gray-box testing is manual, while black-box testing is automated'
        ],
        correctAnswer: 'Black-box testing focuses on external functionality, while gray-box testing combines internal knowledge with external testing',
        explanation: 'Gray-box testing allows testers to have some knowledge of the internal workings of the application, while black-box testing focuses solely on the external behavior.'
      },
      {
        id: '6',
        question: 'Which testing strategy is used to assess the performance of the system under extreme conditions?',
        options: ['Stress Testing', 'Unit Testing', 'Integration Testing', 'Security Testing'],
        correctAnswer: 'Stress Testing',
        explanation: 'Stress testing helps identify the system’s limits by subjecting it to extreme or unusual conditions, such as high user traffic.'
      },
      {
        id: '7',
        question: 'In Selenium WebDriver, which of the following is used to interact with the DOM elements?',
        options: ['JUnit', 'TestNG', 'WebDriver methods', 'Cucumber'],
        correctAnswer: 'WebDriver methods',
        explanation: 'WebDriver provides methods to interact with the DOM elements like clicking, typing, and extracting text from the web page.'
      },
      {
        id: '8',
        question: 'What does the term "test coverage" refer to in software testing?',
        options: ['The percentage of code covered by tests', 'The number of tests written for a project', 'The amount of time spent on testing', 'The number of users who have tested the software'],
        correctAnswer: 'The percentage of code covered by tests',
        explanation: 'Test coverage refers to the extent to which the codebase is covered by automated tests, typically measured by the percentage of lines or branches tested.'
      },
      {
        id: '9',
        question: 'What is the primary objective of acceptance testing?',
        options: [
          'To ensure the system meets performance standards',
          'To verify if the software meets the client’s requirements and is ready for release',
          'To find bugs in the system',
          'To test the system’s scalability'
        ],
        correctAnswer: 'To verify if the software meets the client’s requirements and is ready for release',
        explanation: 'Acceptance testing is performed to validate whether the software satisfies the business requirements and is ready for production.'
      },
      {
        id: '10',
        question: 'What is a test strategy document?',
        options: [
          'A document detailing the project’s budget and timeline',
          'A high-level document outlining the testing approach and objectives',
          'A tool for automating test execution',
          'A detailed document for every individual test case'
        ],
        correctAnswer: 'A high-level document outlining the testing approach and objectives',
        explanation: 'A test strategy document provides an overview of the testing objectives, scope, resources, and techniques used in the testing process.'
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
          <Text style={styles.header}>QA Mid-Level Quiz</Text>
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

export default QAQuiz2;
