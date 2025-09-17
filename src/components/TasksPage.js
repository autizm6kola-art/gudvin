// import React, { useEffect, useState } from 'react';
// import BackButton from './BackButton';
// import ProgressBar from './ProgressBar';
// import Task from './Task';
// import { isTaskCorrect, saveCorrectAnswer, getTaskKey, clearAnswersByIds } from '../utils/storage';
// import '../styles/tasksPage.css';

// function TasksPage({ tasks, goBack }) {
//   const [correctTaskIds, setCorrectTaskIds] = useState([]);

//   // Загружаем решённые задачи при первом рендере
//   useEffect(() => {
//     const correctIds = tasks
//       .filter(task => isTaskCorrect(task.id))
//       .map(task => task.id);
//     setCorrectTaskIds(correctIds);
//   }, [tasks]);

//   const handleCorrectAnswer = (taskId) => {
//     if (!correctTaskIds.includes(taskId)) {
//       saveCorrectAnswer(taskId);
//       setCorrectTaskIds(prev => [...prev, taskId]);
//     }
//   };

//   if (!tasks || tasks.length === 0) {
//     return <div>Нет вопросов</div>;
//   }

//   const taskIds = tasks.map((t) => t.id);
//   const start = Math.min(...taskIds);
//   const end = Math.max(...taskIds);

//   return (
//     <div className="task-container">
//       <BackButton />

//       <button
//         onClick={goBack}
//         className="back-link task-back-button"
//       >
//         ← Назад к выбору
//       </button>

//       <h1 className="task-heading">
//         Гудвин - задания {start}–{end}
//       </h1>

//       <ProgressBar correct={correctTaskIds.length} total={tasks.length} />

//       <p>
//         <strong>
//           Правильных ответов: {correctTaskIds.length} из {tasks.length}
//         </strong>
//       </p>
//       <hr />

//       <div className="task-grid">
//         {tasks.map((task) => (
//           <div className="task-item" key={task.id}>
//             <Task
//               task={task}
//               onCorrect={handleCorrectAnswer}
//               alreadyCorrect={correctTaskIds.includes(task.id)}
//             />
//           </div>
//         ))}
//       </div>

//       <div className="reset-button-contaner">
//         <button
//           onClick={() => {
//             const ids = tasks.map((t) => t.id);
//             clearAnswersByIds(ids);
//             window.location.reload(); // или можно обновить состояние вручную
//           }}
//           className="reset-button"
//         >
//           Сбросить ответы на этой странице
//         </button>
//       </div>
//     </div>
//   );
// }

// export default TasksPage;


import React, { useEffect, useState } from 'react';
import BackButton from './BackButton';
import ProgressBar from './ProgressBar';
import Task from './Task';
import { isTaskCorrect, saveCorrectAnswer, clearAnswersByIds } from '../utils/storage';
import '../styles/tasksPage.css';

function TasksPage({ tasks, goBack }) {
  const [correctTaskIds, setCorrectTaskIds] = useState([]);

  useEffect(() => {
    // Загружаем решения из storage (тут уже sync версия, если твой storage async — надо будет поправить)
    const correctIds = tasks
      .filter(task => isTaskCorrect(task.id))
      .map(task => task.id);
    setCorrectTaskIds(correctIds);
  }, [tasks]);

  const handleCorrectAnswer = (taskId) => {
    if (!correctTaskIds.includes(taskId)) {
      saveCorrectAnswer(taskId);
      setCorrectTaskIds(prev => [...prev, taskId]);
    }
  };

  if (!tasks || tasks.length === 0) {
    return <div>Нет вопросов</div>;
  }

  const taskIds = tasks.map(t => t.id);
  const start = Math.min(...taskIds);
  const end = Math.max(...taskIds);

  return (
    <div className="task-container">
      <BackButton />
      <button onClick={goBack} className="back-link task-back-button">
        ← Назад к выбору
      </button>

      <h1 className="task-heading">
        Упражнения {start}–{end}
      </h1>

      <ProgressBar correct={correctTaskIds.length} total={tasks.length} />

      <p>
        <strong>
          Правильных ответов: {correctTaskIds.length} из {tasks.length}
        </strong>
      </p>
      <hr />

      <div className="task-grid">
        {tasks.map(task => (
          <Task
            key={task.id}
            task={task}
            onCorrect={handleCorrectAnswer}
            alreadyCorrect={correctTaskIds.includes(task.id)}
          />
        ))}
      </div>

      <div className="reset-button-contaner">
        <button
          onClick={() => {
            const ids = tasks.map(t => t.id);
            clearAnswersByIds(ids);
            setCorrectTaskIds([]);
          }}
          className="reset-button"
        >
          Сбросить ответы на этой странице
        </button>
      </div>
    </div>
  );
}

export default TasksPage;
