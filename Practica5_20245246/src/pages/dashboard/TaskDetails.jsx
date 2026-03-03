import { useParams, useNavigate } from 'react-router-dom'
import { useTaskStore } from '../../store/useTaskStore'

const TaskDetails = () => {
  const { id } = useParams()
  const { tasks, editTask } = useTaskStore()
  const navigate = useNavigate()

  const task = tasks.find(t => t.id === id)

  if (!task) return <p>Tarea no encontrada</p>

  const toggleComplete = () => {
    editTask(task.id, { completed: !task.completed })
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">{task.title}</h2>
      <p>{task.description}</p>
      <p>Estado: {task.completed ? 'Completada' : 'Pendiente'}</p>

      <button className="btn-primary mt-4" onClick={toggleComplete}>
        Cambiar estado
      </button>

      <button className="btn-secondary mt-4 ml-2" onClick={() => navigate(-1)}>
        Volver
      </button>
    </div>
  )
}

export default TaskDetails