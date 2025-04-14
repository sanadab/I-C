import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const FrontendQuiz1 = () => {
  const [questions, setQuestions] = useState([
    {
      id: '1',
      question: 'What does the CSS property "display: block" do?',
      options: ['Makes the element a block-level element', 'Makes the element an inline element', 'Makes the element disappear', 'Aligns the element to the right'],
      correctAnswer: 'Makes the element a block-level element',
      explanation: 'The "display: block" property makes an element a block-level element, meaning it takes up the full width of its container.'
    },
    {
      id: '2',
      question: 'Which of the following is used to define a class in CSS?',
      options: ['#classname', '.classname', '<classname>', 'classname'],
      correctAnswer: '.classname',
      explanation: 'In CSS, classes are defined using a dot (.) followed by the class name, like .classname.'
    },
    {
      id: '3',
      question: 'What is the purpose of the "useState" hook in React?',
      options: [
        'To define state variables in functional components',
        'To fetch data from an API',
        'To handle routing between pages',
        'To manage side effects'
      ],
      correctAnswer: 'To define state variables in functional components',
      explanation: 'The "useState" hook allows you to add state variables to functional components in React.'
    },
    {
      id: '4',
      question: 'What is the default value of the "position" property in CSS?',
      options: ['static', 'relative', 'absolute', 'fixed'],
      correctAnswer: 'static',
      explanation: 'By default, the "position" property in CSS is set to "static," which means elements are positioned according to the normal document flow.'
    },
    {
      id: '5',
      question: 'Which of the following is a correct way to write a comment in JavaScript?',
      options: [
        '/* This is a comment */',
        '// This is a comment',
        '# This is a comment',
        '/* This is a comment'
      ],
      correctAnswer: '// This is a comment',
      explanation: 'In JavaScript, comments are written using "//" for single-line comments or "/*" for multi-line comments.'
    },
    {
      id: '6',
      question: 'Which HTML tag is used to display images?',
      options: ['<img>', '<image>', '<src>', '<picture>'],
      correctAnswer: '<img>',
      explanation: 'The <img> tag is used to display images in an HTML document.'
    },
    {
      id: '7',
      question: 'What does the "box-sizing" property in CSS do?',
      options: [
        'Includes padding and border in the element’s total width and height',
        'Changes the size of the font',
        'Sets the width of the content box only',
        'Applies a border to the element'
      ],
      correctAnswer: 'Includes padding and border in the element’s total width and height',
      explanation: 'The "box-sizing" property controls how the total width and height of an element is calculated, including padding and border.'
    },
    {
      id: '8',
      question: 'Which method is used to select an element with a specific id in JavaScript?',
      options: ['getElementById()', 'getElementByClass()', 'querySelector()', 'getElementsByTagName()'],
      correctAnswer: 'getElementById()',
      explanation: 'The getElementById() method is used to select an element by its id in JavaScript.'
    },
    {
      id: '9',
      question: 'In React, what is the purpose of JSX?',
      options: [
        'To define functions and methods',
        'To declare state variables',
        'To render HTML-like code in JavaScript',
        'To create event handlers'
      ],
      correctAnswer: 'To render HTML-like code in JavaScript',
      explanation: 'JSX is a syntax extension for JavaScript that allows you to write HTML-like code within JavaScript, which React can render.'
    },
    {
      id: '10',
      question: 'What is the purpose of the "key" prop in React lists?',
      options: [
        'To uniquely identify elements in a list',
        'To set the background color of list items',
        'To handle events in list items',
        'To sort the list items'
      ],
      correctAnswer: 'To uniquely identify elements in a list',
      explanation: 'The "key" prop in React lists helps React identify which items have changed, are added, or are removed, improving performance.'
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
          <Text style={styles.header}>Frontend Low-Level Quiz</Text>
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

export default FrontendQuiz1;
