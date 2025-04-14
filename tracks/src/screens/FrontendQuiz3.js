import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const FrontendQuiz3 = () => {
  const [questions, setQuestions] = useState([
    {
        id: '1',
        question: 'What is the purpose of the "React.memo" function?',
        options: [
          'To memoize the entire component to avoid unnecessary re-renders',
          'To optimize the performance of function components by memoizing the return value',
          'To optimize event handling in class components',
          'To replace the use of useEffect for side effects'
        ],
        correctAnswer: 'To optimize the performance of function components by memoizing the return value',
        explanation: 'React.memo is a higher-order component used to memoize function components and prevent unnecessary re-renders when props have not changed.'
      },
      {
        id: '2',
        question: 'What is a "closure" in JavaScript?',
        options: [
          'A function that can access variables from its outer function even after the outer function has finished execution',
          'A function that executes a block of code asynchronously',
          'A way to store functions in objects',
          'A mechanism to allow function overloading in JavaScript'
        ],
        correctAnswer: 'A function that can access variables from its outer function even after the outer function has finished execution',
        explanation: 'Closures allow a function to remember and access its lexical scope, even when the function is executing outside that scope.'
      },
      {
        id: '3',
        question: 'What does the "React Suspense" API allow you to do?',
        options: [
          'It allows you to handle asynchronous rendering by showing fallback content while waiting for a resource to load',
          'It enables lazy loading of components based on user interactions',
          'It prevents the browser from making too many HTTP requests in parallel',
          'It controls the order in which components are rendered in React'
        ],
        correctAnswer: 'It allows you to handle asynchronous rendering by showing fallback content while waiting for a resource to load',
        explanation: 'React Suspense is a feature that allows components to suspend rendering until some asynchronous task, like data fetching, is completed, showing fallback content meanwhile.'
      },
      {
        id: '4',
        question: 'What is the primary difference between a "shallow" comparison and a "deep" comparison of objects in JavaScript?',
        options: [
          'Shallow comparison compares the references of objects, while deep comparison checks the equality of values recursively',
          'Shallow comparison compares the prototype chain of objects, while deep comparison checks the methods of the objects',
          'Shallow comparison compares the internal memory addresses, while deep comparison checks object types',
          'There is no difference between shallow and deep comparisons in JavaScript'
        ],
        correctAnswer: 'Shallow comparison compares the references of objects, while deep comparison checks the equality of values recursively',
        explanation: 'Shallow comparison checks if two references point to the same object in memory, while deep comparison recursively checks if all the nested values of the objects are equal.'
      },
      {
        id: '5',
        question: 'How does React handle "state" in class components versus function components?',
        options: [
          'State can be set directly in function components, while it needs to be managed through the constructor in class components',
          'State can only be used in class components, while function components cannot have state',
          'State is managed using hooks in function components, and in class components, it’s set using setState()',
          'State is managed differently in React depending on whether you use Redux or Context API'
        ],
        correctAnswer: 'State is managed using hooks in function components, and in class components, it’s set using setState()',
        explanation: 'In class components, state is managed using the setState() method, while in function components, state is managed using hooks like useState().'
      },
      {
        id: '6',
        question: 'What is the purpose of the "CSS Grid" layout system?',
        options: [
          'To arrange elements into a grid of rows and columns for complex layouts',
          'To handle text alignment and padding in container elements',
          'To create responsive layouts with flexible box alignment',
          'To create elements that automatically adjust their height to match content'
        ],
        correctAnswer: 'To arrange elements into a grid of rows and columns for complex layouts',
        explanation: 'CSS Grid is a two-dimensional layout system that allows you to place items into rows and columns, enabling complex and responsive layouts with ease.'
      },
      {
        id: '7',
        question: 'What is the main advantage of using "webpack" in modern frontend development?',
        options: [
          'It compiles all JavaScript code into a single file for better performance',
          'It bundles multiple files together and optimizes them for faster loading',
          'It manages the HTTP requests to the server for faster content delivery',
          'It enables the use of multiple server-side rendering techniques'
        ],
        correctAnswer: 'It bundles multiple files together and optimizes them for faster loading',
        explanation: 'Webpack is a module bundler that optimizes JavaScript, CSS, images, and other assets into bundles that can be loaded efficiently in the browser.'
      },
      {
        id: '8',
        question: 'What is the concept of "Event Delegation" in JavaScript?',
        options: [
          'Attaching a single event listener to a parent element that handles events for all child elements',
          'Assigning event listeners to each child element individually',
          'Using a flag to toggle event listeners between different elements',
          'Using promises to delegate event handling to other threads'
        ],
        correctAnswer: 'Attaching a single event listener to a parent element that handles events for all child elements',
        explanation: 'Event delegation allows you to manage events more efficiently by attaching a single event listener to a parent element, which will handle events for all its child elements.'
      },
      {
        id: '9',
        question: 'What is the purpose of the "React Context API"?',
        options: [
          'To allow data to be passed between components without the need for prop drilling',
          'To manage state in large applications across many components',
          'To allow components to subscribe to specific updates without rendering the entire tree',
          'To allow React components to interact with the browser history API'
        ],
        correctAnswer: 'To allow data to be passed between components without the need for prop drilling',
        explanation: 'The Context API allows you to share data between components without having to pass props manually at every level of the component tree.'
      },
      {
        id: '10',
        question: 'What is the key difference between "localStorage" and "sessionStorage" in JavaScript?',
        options: [
          'localStorage persists data until explicitly deleted, while sessionStorage is cleared when the page session ends',
          'sessionStorage persists data across sessions, while localStorage is only available for the current session',
          'localStorage can only store strings, while sessionStorage can store objects',
          'sessionStorage allows data to be shared across different browser tabs, while localStorage does not'
        ],
        correctAnswer: 'localStorage persists data until explicitly deleted, while sessionStorage is cleared when the page session ends',
        explanation: 'localStorage stores data persistently, whereas sessionStorage only persists data for the duration of the page session and is cleared when the tab or browser is closed.'
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
          <Text style={styles.header}>Frontend Hard-Level Quiz</Text>
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

export default FrontendQuiz3;
