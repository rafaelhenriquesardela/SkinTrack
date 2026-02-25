import React, { useState } from 'react';
import './TaskItem.css';

function TaskItem({ task, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
  });

  const getPriorityLabel = (priority) => {
    const labels = {
      low: 'Baixa',
      medium: 'Média',
      high: 'Alta',
    };
    return labels[priority] || priority;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: '#4caf50',
      medium: '#ff9800',
      high: '#f44336',
    };
    return colors[priority] || '#999';
  };

  const handleToggleComplete = () => {
    onUpdate(task._id, { completed: !task.completed });
  };

  const handleEdit = () => {
    if (isEditing) {
      onUpdate(task._id, {
        title: editData.title,
        description: editData.description,
        priority: editData.priority,
      });
    }
    setIsEditing(!isEditing);
  };

  const handleDelete = () => {
    if (window.confirm('Tem certeza que deseja deletar esta tarefa?')) {
      onDelete(task._id);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  if (isEditing) {
    return (
      <div className="task-item editing">
        <div className="task-edit-form">
          <input
            type="text"
            name="title"
            value={editData.title}
            onChange={handleInputChange}
            className="edit-input"
          />
          <textarea
            name="description"
            value={editData.description}
            onChange={handleInputChange}
            className="edit-textarea"
            rows="2"
          />
          <select
            name="priority"
            value={editData.priority}
            onChange={handleInputChange}
            className="edit-select"
          >
            <option value="low">Baixa Prioridade</option>
            <option value="medium">Média Prioridade</option>
            <option value="high">Alta Prioridade</option>
          </select>
          <div className="edit-actions">
            <button onClick={handleEdit} className="btn-save">
              💾 Salvar
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="btn-cancel"
            >
              ❌ Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-checkbox">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggleComplete}
          className="checkbox"
        />
      </div>

      <div className="task-content">
        <h3 className="task-title">{task.title}</h3>
        {task.description && <p className="task-description">{task.description}</p>}
        <div className="task-meta">
          <span
            className="priority-badge"
            style={{ backgroundColor: getPriorityColor(task.priority) }}
          >
            {getPriorityLabel(task.priority)}
          </span>
          {task.dueDate && (
            <span className="due-date">📅 {formatDate(task.dueDate)}</span>
          )}
        </div>
      </div>

      <div className="task-actions">
        <button
          onClick={handleEdit}
          className="btn-edit"
          title="Editar tarefa"
        >
          ✏️
        </button>
        <button
          onClick={handleDelete}
          className="btn-delete"
          title="Deletar tarefa"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
