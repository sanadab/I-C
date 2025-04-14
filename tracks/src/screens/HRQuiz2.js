import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const HRQuiz2 = () => {
  const [questions, setQuestions] = useState([
    {
      id: '1',
      question: 'How do you prioritize multiple tasks with tight deadlines?',
      options: ['Delegate', 'Focus on one task at a time', 'Use a task management tool', 'Seek guidance from management'],
      correctAnswer: 'Use a task management tool',
    },
    {
      id: '2',
      question: 'Tell us about a time you had to deal with a difficult coworker. How did you handle it?',
      options: ['Avoid confrontation', 'Directly address the issue', 'Seek help from HR', 'Ignore the issue'],
      correctAnswer: 'Directly address the issue',
    },
    {
      id: '3',
      question: 'How do you ensure a balance between innovation and consistency in your work?',
      options: ['Follow strict processes', 'Focus on creative problem-solving', 'Incorporate best practices while innovating', 'Adopt new methods constantly'],
      correctAnswer: 'Incorporate best practices while innovating',
    },
    {
      id: '4',
      question: 'Describe a situation where you had to work with a cross-functional team. How did you ensure collaboration?',
      options: ['Followed instructions from leadership', 'Maintained open communication and aligned goals', 'Worked independently to meet deadlines', 'Let others take the lead'],
      correctAnswer: 'Maintained open communication and aligned goals',
    },
    {
      id: '5',
      question: 'Can you describe a project where you had to deal with ambiguity? How did you proceed?',
      options: ['Waited for clearer instructions', 'Took initiative to clarify the scope', 'Requested a detailed plan from management', 'Focused on what was certain and proceeded with it'],
      correctAnswer: 'Took initiative to clarify the scope',
    },
    {
      id: '6',
      question: 'How do you keep yourself motivated when you face challenges or setbacks at work?',
      options: ['Seek external rewards', 'Focus on long-term goals and growth', 'Consult with others for advice', 'Move on to a new task'],
      correctAnswer: 'Focus on long-term goals and growth',
    },
    {
      id: '7',
      question: 'How do you handle situations when your work gets criticized? Can you give an example?',
      options: ['Take it personally', 'Understand the feedback and improve', 'Ignore the criticism', 'Get defensive'],
      correctAnswer: 'Understand the feedback and improve',
    },
    {
      id: '8',
      question: 'Describe a time when you had to make a decision without all the necessary information. What was your approach?',
      options: ['Made a quick decision based on assumptions', 'Took time to research and gather more information', 'Consulted others for their opinions', 'Followed company guidelines strictly'],
      correctAnswer: 'Took time to research and gather more information',
    },
    {
      id: '9',
      question: 'How do you stay organized and ensure that your work is always on track?',
      options: ['Use a calendar and reminders', 'Follow a rigid daily schedule', 'Adapt as I go along', 'Rely on my memory'],
      correctAnswer: 'Use a calendar and reminders',
    },
    {
      id: '10',
      question: 'Tell me about a time when you had to lead a team through a difficult situation. How did you manage it?',
      options: ['Took charge and provided clear directions', 'Empowered the team to handle the situation independently', 'Focused on maintaining morale', 'Avoided getting involved and let the team figure it out'],
      correctAnswer: 'Took charge and provided clear directions',
    },
  ]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [resultData, setResultData] = useState([]);
  const [finalGrade, setFinalGrade] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60); // Set 1-minute timer for each question

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
          <Text style={styles.header}>HR Mid-Level Quiz</Text>
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

export default HRQuiz2;
