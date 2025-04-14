import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const QAQuiz3 = () => {
  const [questions, setQuestions] = useState([
    {
        id: '1',
        question: 'Which of the following strategies can be used to identify race conditions in multithreaded applications during testing?',
        options: [
          'Stress testing with high user loads',
          'Thread synchronization testing',
          'Performance profiling',
          'Manual code reviews'
        ],
        correctAnswer: 'Thread synchronization testing',
        explanation: 'Race conditions occur when multiple threads access shared resources simultaneously, leading to unexpected behaviors. Thread synchronization testing helps identify and resolve these issues.'
      },
      {
        id: '2',
        question: 'What is the purpose of a test double in test automation?',
        options: ['To mock external services', 'To replace real components with simplified versions for testing', 'To simulate network failures', 'To automate UI testing'],
        correctAnswer: 'To replace real components with simplified versions for testing',
        explanation: 'Test doubles (e.g., mocks, stubs) are used to isolate components in tests, providing simplified versions of real objects to control behavior and focus on specific parts of the system.'
      },
      {
        id: '3',
        question: 'What is a common challenge when automating acceptance testing for microservices architectures?',
        options: [
          'Maintaining test environments for each microservice',
          'Simulating inter-service communication and dependencies',
          'Testing each microservice in isolation',
          'Automating manual user acceptance tests'
        ],
        correctAnswer: 'Simulating inter-service communication and dependencies',
        explanation: 'Microservices often communicate with each other via APIs, making it difficult to simulate realistic interactions between services for automated acceptance testing.'
      },
      {
        id: '4',
        question: 'Which approach is used to test software for its ability to handle concurrent users and perform under heavy load?',
        options: [
          'Unit Testing',
          'Load Testing',
          'Integration Testing',
          'Regression Testing'
        ],
        correctAnswer: 'Load Testing',
        explanation: 'Load testing involves simulating heavy user traffic or requests to ensure that the software can handle the expected number of users or transactions without performance degradation.'
      },
      {
        id: '5',
        question: 'What is the significance of the Test-Driven Development (TDD) cycle of Red-Green-Refactor in ensuring code quality?',
        options: [
          'It ensures that tests are written before any code is developed, which helps in designing better code from the outset',
          'It tests the system after the development phase to catch bugs',
          'It speeds up the testing process by skipping some steps',
          'It emphasizes automated tests to replace manual testing'
        ],
        correctAnswer: 'It ensures that tests are written before any code is developed, which helps in designing better code from the outset',
        explanation: 'The Red-Green-Refactor cycle in TDD encourages writing tests before code, ensuring that each new feature or change is tested before being implemented, leading to more reliable and maintainable code.'
      },
      {
        id: '6',
        question: 'In Continuous Integration (CI), what is the role of automated tests during the build pipeline?',
        options: ['To verify that the system functions as expected after every code change', 'To ensure the code is optimized for performance', 'To reduce the time taken for manual regression testing', 'To simulate user interactions for UI testing'],
        correctAnswer: 'To verify that the system functions as expected after every code change',
        explanation: 'Automated tests are integrated into CI pipelines to automatically run tests after each code change, ensuring that new changes do not introduce bugs or break existing functionality.'
      },
      {
        id: '7',
        question: 'Which type of testing focuses on evaluating the security vulnerabilities in software by attempting to exploit weaknesses?',
        options: ['Penetration Testing', 'Unit Testing', 'Integration Testing', 'Regression Testing'],
        correctAnswer: 'Penetration Testing',
        explanation: 'Penetration testing, or ethical hacking, is used to identify security vulnerabilities by simulating real-world attacks to find and fix weaknesses before they can be exploited by malicious users.'
      },
      {
        id: '8',
        question: 'In the context of automated UI testing, what is the primary challenge when interacting with dynamic content in web applications?',
        options: ['Handling AJAX requests and dynamic elements', 'Managing multiple test environments', 'Test execution speed', 'Memory management during test execution'],
        correctAnswer: 'Handling AJAX requests and dynamic elements',
        explanation: 'Dynamic content, such as AJAX requests or elements that load asynchronously, can cause timing issues and make automated testing more complex, requiring synchronization strategies like waits or explicit waits.'
      },
      {
        id: '9',
        question: 'What is the key advantage of using Selenium Grid in automated testing?',
        options: ['It allows parallel test execution across multiple machines and browsers', 'It can simulate user input for regression tests', 'It integrates with Postman for API testing', 'It speeds up the development process of tests'],
        correctAnswer: 'It allows parallel test execution across multiple machines and browsers',
        explanation: 'Selenium Grid enables parallel execution of tests across different machines and browsers, improving the efficiency and scalability of automated testing across multiple platforms.'
      },
      {
        id: '10',
        question: 'What is the concept of "test flakiness" in test automation, and how can it be addressed?',
        options: [
          'The occurrence of intermittent test failures due to inconsistent test environments, which can be mitigated by stabilizing test setups',
          'The phenomenon where tests fail when the application is overloaded, which can be prevented by reducing the load',
          'The situation where tests are redundant and should be removed from the test suite',
          'The failure of tests due to network issues, which can be avoided by using local test servers'
        ],
        correctAnswer: 'The occurrence of intermittent test failures due to inconsistent test environments, which can be mitigated by stabilizing test setups',
        explanation: 'Test flakiness occurs when tests intermittently fail without apparent cause, often due to environmental issues such as network instability or configuration changes. Stabilizing the test environment and ensuring consistent setups helps mitigate flakiness.'
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
          <Text style={styles.header}>QA Hard-Level Quiz</Text>
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

export default QAQuiz3;
