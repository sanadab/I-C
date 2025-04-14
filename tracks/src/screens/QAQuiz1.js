import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const QAQuiz1 = () => {
  const [questions, setQuestions] = useState([
    {
      id: '1',
      question: 'What is the primary purpose of unit testing?',
      options: [
        'To verify individual components or functions work as expected',
        'To test the entire system as a whole',
        'To test the interaction between multiple systems',
        'To verify that the system meets business requirements'
      ],
      correctAnswer: 'To verify individual components or functions work as expected',
      explanation: 'Unit testing focuses on validating the correctness of individual components or functions.'
    },
    {
      id: '2',
      question: 'What is a regression test?',
      options: ['A test to validate new features', 'A test to check if existing functionality is still working after changes', 'A test to check if the software is usable', 'A test to verify system performance'],
      correctAnswer: 'A test to check if existing functionality is still working after changes',
      explanation: 'Regression testing ensures that new changes do not negatively impact the existing functionality of the software.'
    },
    {
      id: '3',
      question: 'Which testing method is used to test the system as a whole?',
      options: ['Unit Testing', 'Integration Testing', 'System Testing', 'Acceptance Testing'],
      correctAnswer: 'System Testing',
      explanation: 'System testing involves testing the complete system to ensure it works as intended in an integrated environment.'
    },
    {
      id: '4',
      question: 'What does the term "bug" refer to in software development?',
      options: ['A feature that is yet to be implemented', 'An error or flaw in the software that causes incorrect behavior', 'A change request', 'A test case'],
      correctAnswer: 'An error or flaw in the software that causes incorrect behavior',
      explanation: 'A bug is a defect or flaw in the software that causes unexpected or incorrect behavior.'
    },
    {
      id: '5',
      question: 'Which of the following tools is commonly used for automation testing?',
      options: ['Jira', 'Selenium', 'MySQL', 'Postman'],
      correctAnswer: 'Selenium',
      explanation: 'Selenium is widely used for automating web browsers and is commonly employed in test automation.'
    },
    {
      id: '6',
      question: 'What is the difference between black-box testing and white-box testing?',
      options: [
        'Black-box testing tests the internal workings, while white-box testing focuses on user requirements.',
        'Black-box testing focuses on testing external functionality without knowledge of internal code, while white-box testing examines the internal logic of the software.',
        'Black-box testing is used for system testing, and white-box testing is for unit testing.',
        'There is no difference between them.'
      ],
      correctAnswer: 'Black-box testing focuses on testing external functionality without knowledge of internal code, while white-box testing examines the internal logic of the software.',
      explanation: 'Black-box testing tests the functionality based on user requirements, whereas white-box testing looks at the internal logic of the software.'
    },
    {
      id: '7',
      question: 'What is an example of a non-functional requirement?',
      options: ['A feature that displays user data', 'The speed at which the system processes data', 'The login screen design', 'The system’s ability to handle user input'],
      correctAnswer: 'The speed at which the system processes data',
      explanation: 'Non-functional requirements refer to how the system performs under specific conditions, such as performance, scalability, and reliability.'
    },
    {
      id: '8',
      question: 'Which of the following is used to track and manage test cases?',
      options: ['Jenkins', 'GitHub', 'Jira', 'Visual Studio'],
      correctAnswer: 'Jira',
      explanation: 'Jira is a popular project management tool that is often used to manage and track test cases in QA processes.'
    },
    {
      id: '9',
      question: 'Which of the following is an example of a performance test?',
      options: ['Unit testing', 'Load testing', 'User acceptance testing', 'Security testing'],
      correctAnswer: 'Load testing',
      explanation: 'Load testing is performed to evaluate the system’s performance under heavy loads or stress.'
    },
    {
      id: '10',
      question: 'What is the purpose of test case execution?',
      options: [
        'To document the code',
        'To run the tests and identify defects',
        'To write the system design',
        'To plan test strategies'
      ],
      correctAnswer: 'To run the tests and identify defects',
      explanation: 'Test case execution involves running tests to ensure the system behaves as expected and identifying defects in the process.'
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
          <Text style={styles.header}>QA Low-Level Quiz</Text>
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

export default QAQuiz1;
