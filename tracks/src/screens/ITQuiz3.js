import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const ITQuiz3 = () => {
  const [questions, setQuestions] = useState([
    {
        id: '1',
        question: 'Which of the following protocols is used for the encryption of data at the transport layer in SSL/TLS?',
        options: [
          'AES',
          'RSA',
          '3DES',
          'ECC'
        ],
        correctAnswer: 'AES',
        explanation: 'AES (Advanced Encryption Standard) is commonly used in SSL/TLS for encrypting data at the transport layer. RSA is used for key exchange, while AES provides the actual encryption.'
      },
      {
        id: '2',
        question: 'Which type of attack exploits the trust relationship between a user and a web application through the use of malicious scripts?',
        options: ['SQL Injection', 'Cross-Site Scripting (XSS)', 'Man-in-the-Middle', 'Denial of Service'],
        correctAnswer: 'Cross-Site Scripting (XSS)',
        explanation: 'XSS attacks exploit vulnerabilities in web applications by injecting malicious scripts into web pages, which are then executed in the browser of users.'
      },
      {
        id: '3',
        question: 'What is the key difference between a Stateful and Stateless firewall?',
        options: [
          'A Stateful firewall only inspects incoming traffic, while Stateless inspects both incoming and outgoing',
          'A Stateful firewall maintains a session table for each connection, while Stateless does not',
          'A Stateless firewall is more secure than a Stateful firewall',
          'A Stateful firewall cannot filter traffic based on port numbers'
        ],
        correctAnswer: 'A Stateful firewall maintains a session table for each connection, while Stateless does not',
        explanation: 'Stateful firewalls track the state of active connections and make decisions based on the context of the traffic, while Stateless firewalls inspect packets independently without context.'
      },
      {
        id: '4',
        question: 'Which of the following best describes a Zero-Day vulnerability?',
        options: ['A known vulnerability with a patch available', 'A vulnerability unknown to the vendor and the public', 'A vulnerability that is disclosed to the vendor before being discovered publicly', 'A vulnerability that is used to attack after the vendor releases a patch'],
        correctAnswer: 'A vulnerability unknown to the vendor and the public',
        explanation: 'A Zero-Day vulnerability is a security flaw that is not yet known by the software vendor or the public, making it highly dangerous until a patch is released.'
      },
      {
        id: '5',
        question: 'Which protocol is primarily used for secure file transfer over a network?',
        options: ['FTP', 'SSH', 'SFTP', 'HTTP'],
        correctAnswer: 'SFTP',
        explanation: 'SFTP (Secure File Transfer Protocol) is used to securely transfer files over a network by using SSH encryption, unlike FTP which does not provide secure encryption.'
      },
      {
        id: '6',
        question: 'What is the primary purpose of BGP (Border Gateway Protocol) in Internet routing?',
        options: ['To define the route between different autonomous systems', 'To provide routing within a local network', 'To prevent IP address conflicts', 'To prioritize traffic between different websites'],
        correctAnswer: 'To define the route between different autonomous systems',
        explanation: 'BGP is used for routing between different autonomous systems on the Internet and is responsible for determining the best path for data based on policies.'
      },
      {
        id: '7',
        question: 'Which of the following best describes an IPv6 address structure?',
        options: [
          'A 32-bit address divided into four octets',
          'A 128-bit address written in hexadecimal format and separated by colons',
          'A 64-bit address separated by dots',
          'A 64-bit address written in binary format'
        ],
        correctAnswer: 'A 128-bit address written in hexadecimal format and separated by colons',
        explanation: 'IPv6 addresses are 128 bits long and are written in hexadecimal format, with each group of four hexadecimal digits separated by a colon.'
      },
      {
        id: '8',
        question: 'Which of the following is a type of attack that uses multiple compromised systems to flood a target with traffic?',
        options: ['Phishing', 'Man-in-the-Middle', 'Distributed Denial of Service (DDoS)', 'Cross-Site Scripting'],
        correctAnswer: 'Distributed Denial of Service (DDoS)',
        explanation: 'DDoS attacks involve multiple compromised systems sending overwhelming traffic to a target, causing network or service disruption.'
      },
      {
        id: '9',
        question: 'Which of the following techniques is used to mitigate the effects of a Buffer Overflow vulnerability?',
        options: ['Address Space Layout Randomization (ASLR)', 'SSL/TLS Encryption', 'Virtual Private Networks (VPNs)', 'Network Segmentation'],
        correctAnswer: 'Address Space Layout Randomization (ASLR)',
        explanation: 'ASLR is a security technique that randomizes memory addresses used by programs, making it harder for attackers to exploit buffer overflow vulnerabilities.'
      },
      {
        id: '10',
        question: 'What is the primary function of a DNS resolver in a DNS query?',
        options: [
          'To translate domain names to IP addresses',
          'To resolve domain name conflicts',
          'To cache DNS records for future use',
          'To route traffic between devices based on IP addresses'
        ],
        correctAnswer: 'To translate domain names to IP addresses',
        explanation: 'A DNS resolver is responsible for querying DNS servers and translating domain names like google.com into their corresponding IP addresses.'
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
          <Text style={styles.header}>IT Hard-Level Quiz</Text>
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

export default ITQuiz3;
