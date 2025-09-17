// import React, { useEffect } from "react";
// import '../styles/taskItem.css';

// function Task({ task, onCorrect, alreadyCorrect }) {
//   const [answer, setAnswer] = React.useState('');
//   const [isCorrect, setIsCorrect] = React.useState(null);

//   useEffect(() => {
//     if (alreadyCorrect) {
//       setIsCorrect(true);
//     }
//   }, [alreadyCorrect]);

//   const handleChange = (e) => {
//     setAnswer(e.target.value);
//     setIsCorrect(null);
//   };

//   const checkAnswer = () => {
//     if (answer.trim().toLowerCase() === task.correctAnswer.toLowerCase()) {
//       if (!isCorrect) {
//         setIsCorrect(true);
//         onCorrect(task.id);
//       }
//     } else {
//       setIsCorrect(false);
//     }
//   };

//   return (
//     <div className="task-item" style={{ marginBottom: '20px' }}>
//       <p><strong>{task.id}</strong></p>
  
//     </div>
//   );
// }

// export default Task;

import React, { useEffect, useState } from "react";
import '../styles/taskItem.css';

function Task({ task, onCorrect, alreadyCorrect }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null); // индекс выбранного варианта
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    if (alreadyCorrect) {
      setSelectedAnswer(task.answer); // показываем правильный ответ
      setIsCorrect(true);
    }
  }, [alreadyCorrect, task.answer]);

  const handleClick = (index) => {
    if (isCorrect !== null) return; // уже ответили, блокируем

    const correct = index === task.answer;
    setSelectedAnswer(index);
    setIsCorrect(correct);

    if (correct) {
      onCorrect(task.id);
    }
  };

  return (
    <div className="task-item" style={{ marginBottom: '20px' }}>
      <p><strong>{task.id}</strong></p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {task.options.map((option, index) => {
          let className = "option-button";
          if (selectedAnswer === index) {
            className += isCorrect ? " correct" : " incorrect";
          } else if (alreadyCorrect && index === task.answer) {
            // если уже правильно отвечено, подсветим правильный ответ
            className += " correct";
          }
          return (
            <button
              key={index}
              disabled={isCorrect !== null}
              onClick={() => handleClick(index)}
              className={className}
              style={{ textAlign: 'left', padding: '10px' }}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Task;
