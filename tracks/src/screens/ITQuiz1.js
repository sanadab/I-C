import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const ITQuiz1 = () => {
  const [questions, setQuestions] = useState([
    {
      id: '1',
      question: 'What is the primary function of the OSI model?',
      options: [
        'To define the layers of a network',
        'To route packets across networks',
        'To secure the network data',
        'To configure network hardware'
      ],
      correctAnswer: 'To define the layers of a network',
      explanation: 'The OSI model defines seven layers that describe how data moves across a network, from physical transmission to application-level communication.'
    },
    {
      id: '2',
      question: 'What does the IP address 192.168.0.1 typically represent?',
      options: ['A public IP address', 'A reserved private IP address', 'A DNS server', 'An IPv6 address'],
      correctAnswer: 'A reserved private IP address',
      explanation: '192.168.0.1 is commonly used as a default gateway IP address in many private home networks and is part of the private IP address range.'
    },
    {
      id: '3',
      question: 'Which of the following is used to define a static IP address for a device?',
      options: [
        'DHCP (Dynamic Host Configuration Protocol)',
        'DNS (Domain Name System)',
        'Subnet mask',
        'Manual configuration on the device'
      ],
      correctAnswer: 'Manual configuration on the device',
      explanation: 'A static IP address is manually set on a device and does not change over time, unlike a dynamic IP address assigned by DHCP.'
    },
    {
      id: '4',
      question: 'Which command is used to check the IP configuration on a Windows machine?',
      options: ['ping', 'tracert', 'ipconfig', 'netstat'],
      correctAnswer: 'ipconfig',
      explanation: 'The "ipconfig" command is used to display the current network configuration, including the IP address, subnet mask, and gateway.'
    },
    {
      id: '5',
      question: 'Which protocol is used to securely access remote servers over the internet?',
      options: ['FTP', 'HTTP', 'SSH', 'Telnet'],
      correctAnswer: 'SSH',
      explanation: 'SSH (Secure Shell) is a protocol that allows secure remote access to a server by encrypting communication between the client and the server.'
    },
    {
      id: '6',
      question: 'What does DNS stand for?',
      options: ['Domain Network System', 'Domain Name Service', 'Dynamic Network Service', 'Domain Name System'],
      correctAnswer: 'Domain Name System',
      explanation: 'The Domain Name System (DNS) is a hierarchical system that translates human-readable domain names (like google.com) into IP addresses.'
    },
    {
      id: '7',
      question: 'What is a subnet mask used for?',
      options: [
        'To configure the network interface card',
        'To mask the IP address',
        'To define the range of IP addresses in a subnet',
        'To encrypt network traffic'
      ],
      correctAnswer: 'To define the range of IP addresses in a subnet',
      explanation: 'A subnet mask is used to divide an IP address into network and host portions, allowing devices to communicate within the same subnet.'
    },
    {
      id: '8',
      question: 'Which of the following commands is used to display active network connections on a Windows machine?',
      options: ['ipconfig', 'netstat', 'ping', 'tracert'],
      correctAnswer: 'netstat',
      explanation: 'The "netstat" command shows active network connections and network statistics on a computer.'
    },
    {
      id: '9',
      question: 'Which protocol is commonly used for sending email?',
      options: ['FTP', 'SMTP', 'IMAP', 'HTTP'],
      correctAnswer: 'SMTP',
      explanation: 'SMTP (Simple Mail Transfer Protocol) is used for sending emails between servers.'
    },
    {
      id: '10',
      question: 'Which of the following is the main purpose of RAID?',
      options: [
        'To increase the storage capacity of a single disk',
        'To speed up network traffic',
        'To enhance data redundancy and performance',
        'To create multiple partitions on a hard drive'
      ],
      correctAnswer: 'To enhance data redundancy and performance',
      explanation: 'RAID (Redundant Array of Independent Disks) combines multiple disks to increase performance, reliability, or both.'
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
          <Text style={styles.header}>IT Low-Level Quiz</Text>
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

export default ITQuiz1;
