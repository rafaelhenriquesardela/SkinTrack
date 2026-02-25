import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

function TaskList({ tasks, onUpdateTask, onDeleteTask }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">✨</div>
        <h2>Nenhuma tarefa ainda</h2>
        <p>Crie sua primeira tarefa usando o formulário acima</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      <div className="task-list-header">
        <h2>Tarefas ({tasks.length})</h2>
      </div>
      <div className="tasks-container">
        {tasks.map(task => (
          <TaskItem
            key={task._id}
            task={task}
            onUpdate={onUpdateTask}
            onDelete={onDeleteTask}
          />
        ))}
      </div>
    </div>
  );
}

export default TaskList;
