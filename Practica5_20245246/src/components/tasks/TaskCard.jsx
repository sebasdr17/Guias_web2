import { Link } from 'react-router-dom'

const TaskCard = ({ task, onDelete }) => {
  return (
    <div className="card">
      <h3 className="text-xl font-semibold">{task.title}</h3>
      <p>{task.description}</p>

      <div className="flex justify-between mt-2">
        <Link to={`/task/${task.id}`} className="text-blue-600">Ver</Link>
        <button onClick={() => onDelete(task.id)} className="text-red-600">
          Eliminar
        </button>
      </div>
    </div>
  )
}

export default TaskCard