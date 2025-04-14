import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const BackendQuiz1= () => {
  const [questions, setQuestions] = useState([
    {
        id: '1',
        question: 'What is the time complexity of searching an element in a balanced binary search tree?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        correctAnswer: 'O(log n)',
        explanation: 'In a balanced binary search tree, the time complexity of searching is O(log n), as it halves the search space with each step.'
      },
      {
        id: '2',
        question: 'Which of the following is NOT a NoSQL database?',
        options: ['MongoDB', 'Redis', 'MySQL', 'Cassandra'],
        correctAnswer: 'MySQL',
        explanation: 'MySQL is a relational database, not a NoSQL database. NoSQL databases are typically schema-less and scale horizontally.'
      },
      {
        id: '3',
        question: 'What does ACID stand for in database transactions?',
        options: [
          'Atomicity, Consistency, Isolation, Durability',
          'Automation, Consistency, Integrity, Dependability',
          'Availability, Consistency, Isolation, Durability',
          'Atomicity, Concurrency, Isolation, Dependability'
        ],
        correctAnswer: 'Atomicity, Consistency, Isolation, Durability',
        explanation: 'ACID stands for Atomicity, Consistency, Isolation, and Durability, which are properties that ensure reliable database transactions.'
      },
      {
        id: '4',
        question: 'Which HTTP method is idempotent?',
        options: ['GET', 'POST', 'PATCH', 'DELETE'],
        correctAnswer: 'GET',
        explanation: 'GET is an idempotent HTTP method, meaning that repeated requests to the same resource do not change the state of the resource.'
      },
      {
        id: '5',
        question: 'What is the main difference between a process and a thread?',
        options: [
          'Threads share memory; processes do not',
          'Processes are faster than threads',
          'Threads are independent; processes are dependent',
          'Processes share memory; threads do not'
        ],
        correctAnswer: 'Threads share memory; processes do not',
        explanation: 'Threads within the same process share memory, whereas processes have their own memory space.'
      },
      {
        id: '6',
        question: 'Which protocol is used to ensure secure communication between a client and a server?',
        options: ['HTTP', 'FTP', 'HTTPS', 'SMTP'],
        correctAnswer: 'HTTPS',
        explanation: 'HTTPS (HyperText Transfer Protocol Secure) is used for secure communication between a client and a server, encrypting data using SSL/TLS.'
      },
      {
        id: '7',
        question: 'Which of the following is used to prevent SQL injection attacks?',
        options: [
          'Using raw SQL queries',
          'Parameterized queries',
          'Disabling authentication',
          'Using GET instead of POST'
        ],
        correctAnswer: 'Parameterized queries',
        explanation: 'Parameterized queries prevent SQL injection attacks by separating SQL logic from user inputs, ensuring that inputs cannot alter the query structure.'
      },
      {
        id: '8',
        question: 'Which caching strategy is commonly used to reduce database load?',
        options: ['Write-through', 'Write-back', 'Lazy loading', 'All of the above'],
        correctAnswer: 'All of the above',
        explanation: 'Write-through, write-back, and lazy loading are common caching strategies used to reduce database load by managing how data is stored and retrieved.'
      },
      {
        id: '9',
        question: 'What does the term “event loop” refer to in Node.js?',
        options: [
          'A loop that handles async operations',
          'A method for iterating over arrays',
          'A way to define functions',
          'A function to delay execution'
        ],
        correctAnswer: 'A loop that handles async operations',
        explanation: 'The event loop in Node.js is responsible for handling asynchronous operations, ensuring non-blocking execution of code.'
      },
      {
        id: '10',
        question: 'Which database indexing technique is most efficient for searching large datasets?',
        options: ['Full table scan', 'B-Tree index', 'Linear search', 'Bubble sort'],
        correctAnswer: 'B-Tree index',
        explanation: 'B-Tree indexing is efficient for large datasets as it allows fast searching and retrieval of data in a sorted manner.'
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
          <Text style={styles.header}>Backend Low-Level Quiz</Text>
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
                  style={[styles.answerText, item.isCorrect ? { color: 'green' } : { color: 'red' }]}>
                  Your Answer: {item.userAnswer}
                </Text>
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
              style={[
                styles.optionButton,
                selectedAnswers[questions[currentQuestionIndex].id] === option && {
                  backgroundColor: '#4CAF50',
                },
              ]}
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

export default BackendQuiz1;