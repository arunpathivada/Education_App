import React, { useState } from 'react';
import styled from 'styled-components';

const QuizContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Question = styled.div`
  margin-bottom: 30px;

`;

const OptionsList = styled.div`
  display: flex;
  flex-direction: column;
`;

const Option = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  cursor: pointer;
  border-radius: 5px;

  
  ${({ isSelected, isCorrect }) =>
    isSelected
      ? `background-color: ${isCorrect ? 'lightgreen' : '#ffcccc'};`
      : ''}
`;
const QuestionText = styled.p`
  font-size: 20px;
  font-weight:400;
  margin-bottom: 5px;
`

const Quiz = ({ questions }) => {
  const [selectedOptions, setSelectedOptions] = useState(Array(questions.length).fill(null));

  const handleOptionClick = (questionIndex, optionIndex, correctOption) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[questionIndex] = optionIndex;
    setSelectedOptions(newSelectedOptions);
  };
  console.log(selectedOptions);

  return (
    <QuizContainer>
      { questions && questions.map((question, questionIndex) => (
        <Question key={questionIndex}>
          <QuestionText>{question.question}</QuestionText>
          <OptionsList>
            {question.options.map((option, optionIndex) => (
              <Option
                key={optionIndex}
                isSelected={selectedOptions[questionIndex] === optionIndex}
                isCorrect={question.correctOption-1 === optionIndex}
                onClick={() => handleOptionClick(questionIndex, optionIndex, question.correctOption)}
              >
                {option}
              </Option>
            ))}
          </OptionsList>
        </Question>
      ))}
    </QuizContainer>
  );
};

export default Quiz;
