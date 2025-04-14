import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const BackendQuiz2 = () => {
  const [questions, setQuestions] = useState([
    {
        id: '1',
        question: 'What is the purpose of the CAP theorem in distributed systems?',
        options: [
            'Defines the maximum storage of a database',
            'Explains the trade-off between Consistency, Availability, and Partition Tolerance',
            'Optimizes query execution speed',
            'Ensures high security in APIs'
        ],
        correctAnswer: 'Explains the trade-off between Consistency, Availability, and Partition Tolerance',
        explanation: 'The CAP theorem states that a distributed system can only guarantee two of three: Consistency, Availability, or Partition Tolerance.'
    },
    {
        id: '2',
        question: 'Which of the following improves database performance by reducing disk I/O operations?',
        options: ['Sharding', 'Indexing', 'Replication', 'ACID compliance'],
        correctAnswer: 'Indexing',
        explanation: 'Indexes improve database performance by enabling faster lookups and reducing the number of disk reads.'
    },
    {
        id: '3',
        question: 'What does eventual consistency mean in a distributed database?',
        options: [
            'Data is always consistent across all nodes',
            'Data will become consistent over time given no new updates',
            'All transactions are immediately visible',
            'Replication is disabled for performance'
        ],
        correctAnswer: 'Data will become consistent over time given no new updates',
        explanation: 'Eventual consistency allows temporary inconsistencies but ensures all replicas converge to the same state over time.'
    },
    {
        id: '4',
        question: 'Which caching strategy writes data to the cache only when it is updated in the database?',
        options: ['Write-through', 'Write-back', 'Lazy loading', 'Read-through'],
        correctAnswer: 'Write-through',
        explanation: 'In a write-through cache, data is written to both the cache and the database to maintain consistency.'
    },
    {
        id: '5',
        question: 'What is the primary role of a reverse proxy in backend architecture?',
        options: [
            'Manage server logs',
            'Distribute client requests across multiple backend servers',
            'Encrypt database queries',
            'Reduce API latency by pre-fetching data'
        ],
        correctAnswer: 'Distribute client requests across multiple backend servers',
        explanation: 'A reverse proxy helps load balancing, caching, and security by managing client requests before they reach backend servers.'
    },
    {
        id: '6',
        question: 'Which scenario best describes when to use a message queue like RabbitMQ or Kafka?',
        options: [
            'For low-latency, real-time applications',
            'To handle high-throughput asynchronous tasks',
            'To execute SQL queries faster',
            'To store temporary session data'
        ],
        correctAnswer: 'To handle high-throughput asynchronous tasks',
        explanation: 'Message queues help decouple services and process large volumes of asynchronous messages efficiently.'
    },
    {
        id: '7',
        question: 'What is the main advantage of using a connection pool for database connections?',
        options: [
            'Increases the number of concurrent queries beyond server limits',
            'Reduces the overhead of creating and closing database connections repeatedly',
            'Eliminates the need for authentication in database queries',
            'Speeds up query execution by caching results'
        ],
        correctAnswer: 'Reduces the overhead of creating and closing database connections repeatedly',
        explanation: 'A connection pool maintains reusable connections, reducing the cost of establishing new connections frequently.'
    },
    {
        id: '8',
        question: 'Which HTTP status code indicates that a request was rate-limited?',
        options: ['200', '403', '429', '503'],
        correctAnswer: '429',
        explanation: 'A 429 status code is returned when too many requests are sent within a short time, triggering rate limiting.'
    },
    {
        id: '9',
        question: 'Which database architecture is best suited for handling highly relational data with complex queries?',
        options: ['Document-based', 'Graph-based', 'Columnar', 'Key-value store'],
        correctAnswer: 'Graph-based',
        explanation: 'Graph databases like Neo4j are optimized for relationships and complex queries using nodes and edges.'
    },
    {
        id: '10',
        question: 'Which technique helps prevent deadlocks in a multi-threaded application?',
        options: [
            'Using non-blocking I/O',
            'Always acquiring locks in a consistent order',
            'Increasing the number of database connections',
            'Disabling transactions'
        ],
        correctAnswer: 'Always acquiring locks in a consistent order',
        explanation: 'Ensuring that locks are acquired in a predefined order prevents circular wait conditions that lead to deadlocks.'
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
          <Text style={styles.header}>Backend Mid-Level Quiz</Text>
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

export default BackendQuiz2;