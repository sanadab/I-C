import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const BackendQuiz3 = () => {
  const [questions, setQuestions] = useState([
    {
        id: '1',
        question: 'Which of the following is a limitation of the CAP theorem in real-world distributed systems?',
        options: [
            'Systems can always achieve Consistency and Availability simultaneously',
            'Systems with partition tolerance can never achieve consistency',
            'Systems are forced to choose between consistency and availability under network partitions',
            'Partition tolerance is a myth in large-scale distributed systems'
        ],
        correctAnswer: 'Systems are forced to choose between consistency and availability under network partitions',
        explanation: 'According to the CAP theorem, during network partitions, a system must sacrifice either consistency or availability to maintain partition tolerance.'
    },
    {
        id: '2',
        question: 'Which technique is most suitable for handling distributed transactions in a microservices architecture?',
        options: ['Two-Phase Commit', 'Eventual Consistency with Saga Pattern', 'Paxos Algorithm', 'Quorum-based Replication'],
        correctAnswer: 'Eventual Consistency with Saga Pattern',
        explanation: 'The Saga pattern is used to ensure eventual consistency in microservices by breaking down transactions into smaller steps that can each be completed independently, with compensating actions for failures.'
    },
    {
        id: '3',
        question: 'Which strategy is best suited for scaling a database to handle extremely high write throughput?',
        options: ['Master-Slave Replication', 'Sharding', 'Read-Replica Scaling', 'Database Clustering'],
        correctAnswer: 'Sharding',
        explanation: 'Sharding involves breaking the database into smaller, manageable parts, distributing them across multiple servers to increase write throughput and ensure scalability.'
    },
    {
        id: '4',
        question: 'Which of the following is a risk when using the Write-back cache strategy in distributed systems?',
        options: [
            'Stale data may be served to the client until the cache is updated',
            'Data loss can occur if the cache fails before writing to the database',
            'Increased load on the database as every read request hits the database',
            'Inconsistent data states when multiple caches are used across nodes'
        ],
        correctAnswer: 'Data loss can occur if the cache fails before writing to the database',
        explanation: 'In a write-back cache, if the cache fails before writing the data to the database, the changes may be lost, leading to data inconsistency.'
    },
    {
        id: '5',
        question: 'In a distributed system, what is the primary concern when implementing eventual consistency?',
        options: [
            'It guarantees that all nodes will have identical copies of data at all times',
            'It ensures that data will eventually be consistent across all nodes despite temporary network failures',
            'It prioritizes speed of reads over accuracy of data',
            'It forces synchronization of data between all nodes immediately after any change'
        ],
        correctAnswer: 'It ensures that data will eventually be consistent across all nodes despite temporary network failures',
        explanation: 'Eventual consistency ensures that while temporary inconsistencies may occur due to network partitions, data will converge to a consistent state over time.'
    },
    {
        id: '6',
        question: 'Which of the following techniques is most commonly used to ensure that database transactions are ACID-compliant in a distributed system?',
        options: ['Paxos Consensus', 'Two-Phase Commit', 'CAP Theorem', 'Quorum-based Replication'],
        correctAnswer: 'Two-Phase Commit',
        explanation: 'The Two-Phase Commit (2PC) protocol ensures that database transactions across distributed systems maintain Atomicity, Consistency, Isolation, and Durability (ACID).'
    },
    {
        id: '7',
        question: 'When implementing a microservices architecture, what is the primary challenge with database transactions?',
        options: [
            'Ensuring transactions are ACID-compliant across distributed services',
            'Synchronizing data access patterns between services',
            'Handling long-running transactions and compensating actions',
            'Ensuring eventual consistency without data duplication'
        ],
        correctAnswer: 'Ensuring transactions are ACID-compliant across distributed services',
        explanation: 'Microservices often use separate databases, making it challenging to maintain ACID-compliance across multiple services, leading to potential consistency issues.'
    },
    {
        id: '8',
        question: 'In the context of distributed systems, which of the following algorithms ensures that a majority of replicas agree on the system’s state?',
        options: ['Paxos', 'Raft', 'Zab', 'MapReduce'],
        correctAnswer: 'Raft',
        explanation: 'Raft is a consensus algorithm used to manage a replicated log across multiple nodes in a distributed system, ensuring that a majority of replicas agree on the state of the system.'
    },
    {
        id: '9',
        question: 'Which design pattern is best suited for decoupling a producer and consumer in a high-volume, fault-tolerant system?',
        options: ['Observer Pattern', 'Chain of Responsibility', 'Message Queue', 'Singleton Pattern'],
        correctAnswer: 'Message Queue',
        explanation: 'A Message Queue, such as RabbitMQ or Kafka, allows asynchronous communication between decoupled producer and consumer components, ensuring fault tolerance and high throughput.'
    },
    {
        id: '10',
        question: 'Which of the following strategies is recommended to prevent service downtime during a schema migration in a live production environment?',
        options: [
            'Rolling updates with backward compatibility',
            'Database sharding with synchronous replication',
            'Event sourcing with event replay',
            'Eventual consistency with distributed transactions'
        ],
        correctAnswer: 'Rolling updates with backward compatibility',
        explanation: 'Rolling updates ensure that schema changes are applied incrementally to avoid service downtime, with backward compatibility maintaining service functionality during the migration.'
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
          <Text style={styles.header}>Backend Hard-Level Quiz</Text>
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

export default BackendQuiz3;