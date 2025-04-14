import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const HRQuiz3 = () => {
  const [questions, setQuestions] = useState([
    {
        id: '1',
        question: 'Describe a time when you had to make a high-stakes decision with limited data. What was your thought process and how did you handle the uncertainty?',
        options: ['Followed gut instinct', 'Consulted with peers for insights', 'Relied on data-driven decision-making', 'Postponed the decision until more information was available'],
        correctAnswer: 'Consulted with peers for insights',
      },
      {
        id: '2',
        question: 'How do you approach resolving conflicts between team members when both parties are equally at fault?',
        options: ['Mediated a compromise between them', 'Escalated the issue to upper management', 'Took a neutral stance and refrained from involvement', 'Evaluated each person’s contribution and made a final judgment'],
        correctAnswer: 'Mediated a compromise between them',
      },
      {
        id: '3',
        question: 'In your previous role, how did you handle a situation where there was a significant misalignment between your department’s objectives and the company’s strategic goals?',
        options: ['Adjusted team goals to align with company strategy', 'Escalated the issue to management', 'Continued with the department’s goals regardless', 'Ignored the misalignment and focused on daily tasks'],
        correctAnswer: 'Adjusted team goals to align with company strategy',
      },
      {
        id: '4',
        question: 'Tell us about a time when you had to manage a project with unclear requirements. How did you ensure the project’s success?',
        options: ['Started working and clarified requirements as I went', 'Consulted with stakeholders to refine the project scope', 'Followed the initial vague instructions and hoped for the best', 'Postponed the project until all requirements were clearly defined'],
        correctAnswer: 'Consulted with stakeholders to refine the project scope',
      },
      {
        id: '5',
        question: 'Can you provide an example of how you’ve led a team through a major organizational change, and what steps did you take to ensure a smooth transition?',
        options: ['Focused on maintaining morale while allowing time for adaptation', 'Enforced the change without much discussion', 'Avoided addressing the change directly to avoid disruption', 'Promised short-term benefits to gain buy-in from the team'],
        correctAnswer: 'Focused on maintaining morale while allowing time for adaptation',
      },
      {
        id: '6',
        question: 'How do you handle making unpopular decisions when the majority of your team disagrees with your approach?',
        options: ['Fought to enforce the decision regardless', 'Engaged the team in open discussions to explain the rationale', 'Backed down and changed my decision to avoid conflict', 'Ignored the dissent and proceeded with the decision in isolation'],
        correctAnswer: 'Engaged the team in open discussions to explain the rationale',
      },
      {
        id: '7',
        question: 'What strategy do you employ when managing multiple stakeholders with conflicting interests in a project?',
        options: ['Prioritize the most influential stakeholders and disregard others', 'Negotiate compromises and keep communication open with all parties', 'Allow stakeholders to resolve conflicts among themselves', 'Select the option that aligns with the company’s immediate goals'],
        correctAnswer: 'Negotiate compromises and keep communication open with all parties',
      },
      {
        id: '8',
        question: 'Describe a challenging ethical dilemma you faced in your professional life. How did you navigate it while maintaining integrity?',
        options: ['Followed company policies without question', 'Took a utilitarian approach to justify my decision', 'Consulted a mentor for advice and then made the decision', 'Avoided the situation to prevent personal risk'],
        correctAnswer: 'Consulted a mentor for advice and then made the decision',
      },
      {
        id: '9',
        question: 'How do you assess and manage risks when implementing a new business strategy that has uncertain outcomes?',
        options: ['Relied on past experiences to guide the decision', 'Conducted thorough risk assessments and contingency planning', 'Postponed implementation until the risk could be minimized', 'Relied heavily on the recommendations of external consultants'],
        correctAnswer: 'Conducted thorough risk assessments and contingency planning',
      },
      {
        id: '10',
        question: 'In a leadership role, how would you handle a scenario where a project deadline is missed due to unforeseen circumstances, but the client is unhappy with the delay?',
        options: ['Communicated openly with the client and worked on a revised timeline', 'Blamed the team for the delay and ensured the client was satisfied', 'Accepted responsibility but avoided offering any solutions', 'Proposed a new deadline without addressing the cause of the delay'],
        correctAnswer: 'Communicated openly with the client and worked on a revised timeline',
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

export default HRQuiz3;
