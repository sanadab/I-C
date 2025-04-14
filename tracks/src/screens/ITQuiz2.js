import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const ITQuiz2 = () => {
  const [questions, setQuestions] = useState([
    {
        id: '1',
        question: 'Which of the following is used to prevent unauthorized access to a network?',
        options: [
          'Router',
          'Firewall',
          'Hub',
          'Switch'
        ],
        correctAnswer: 'Firewall',
        explanation: 'A firewall is used to monitor and control incoming and outgoing network traffic, allowing or blocking data based on security rules.'
      },
      {
        id: '2',
        question: 'In an IPv6 address, how many bits are allocated to the network prefix?',
        options: ['64 bits', '128 bits', '48 bits', '32 bits'],
        correctAnswer: '64 bits',
        explanation: 'In IPv6, the network prefix is allocated 64 bits, leaving the remaining 64 bits for the host portion of the address.'
      },
      {
        id: '3',
        question: 'What is the primary difference between TCP and UDP?',
        options: [
          'TCP is connectionless, while UDP is connection-oriented',
          'TCP ensures reliable delivery, while UDP does not',
          'TCP is faster than UDP',
          'UDP guarantees data integrity, while TCP does not'
        ],
        correctAnswer: 'TCP ensures reliable delivery, while UDP does not',
        explanation: 'TCP is a connection-oriented protocol that ensures reliable delivery of data, while UDP is connectionless and does not guarantee delivery.'
      },
      {
        id: '4',
        question: 'What is the main purpose of NAT (Network Address Translation)?',
        options: ['To translate domain names to IP addresses', 'To map private IP addresses to public IP addresses', 'To route traffic between networks', 'To manage DHCP leases'],
        correctAnswer: 'To map private IP addresses to public IP addresses',
        explanation: 'NAT allows devices on a private network to access the internet by mapping their private IP addresses to a public IP address.'
      },
      {
        id: '5',
        question: 'Which of the following protocols is used for encrypting communication over a VPN?',
        options: ['PPTP', 'IPSec', 'HTTP', 'FTP'],
        correctAnswer: 'IPSec',
        explanation: 'IPSec (Internet Protocol Security) is commonly used to secure VPN connections by encrypting the data between devices.'
      },
      {
        id: '6',
        question: 'Which of the following is a common method for detecting DDoS attacks?',
        options: ['Deep packet inspection', 'Network segmentation', 'Port forwarding', 'IP whitelisting'],
        correctAnswer: 'Deep packet inspection',
        explanation: 'Deep packet inspection analyzes the data packets for malicious content and can help detect and prevent Distributed Denial of Service (DDoS) attacks.'
      },
      {
        id: '7',
        question: 'What is the purpose of an ARP table in a network?',
        options: [
          'To resolve domain names to IP addresses',
          'To store a mapping of MAC addresses to IP addresses',
          'To track the status of network devices',
          'To assign IP addresses dynamically'
        ],
        correctAnswer: 'To store a mapping of MAC addresses to IP addresses',
        explanation: 'An ARP (Address Resolution Protocol) table stores mappings of MAC addresses to their corresponding IP addresses, which is used for local network communication.'
      },
      {
        id: '8',
        question: 'Which of the following is a key benefit of using a load balancer?',
        options: ['Increased network security', 'Improved data compression', 'Distribution of traffic across multiple servers', 'Faster packet delivery'],
        correctAnswer: 'Distribution of traffic across multiple servers',
        explanation: 'A load balancer distributes network traffic across multiple servers to ensure no single server becomes overwhelmed and improve overall system performance.'
      },
      {
        id: '9',
        question: 'Which command in Linux is used to view the routing table?',
        options: ['netstat', 'route', 'ping', 'traceroute'],
        correctAnswer: 'route',
        explanation: 'The "route" command in Linux is used to view or modify the routing table of the system, which controls how packets are directed to different networks.'
      },
      {
        id: '10',
        question: 'What is the main function of a DNS server?',
        options: [
          'To cache DNS queries for faster access',
          'To route data between devices on a network',
          'To resolve domain names to IP addresses',
          'To manage network IP address assignments'
        ],
        correctAnswer: 'To resolve domain names to IP addresses',
        explanation: 'The DNS (Domain Name System) server translates human-readable domain names (like google.com) into IP addresses that computers can understand.'
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
          <Text style={styles.header}>IT Mid-Level Quiz</Text>
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

export default ITQuiz2;
