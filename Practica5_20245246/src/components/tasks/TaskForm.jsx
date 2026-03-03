import { useState } from 'react'
import { useTaskStore } from '../../store/useTaskStore'
import { getCurrentUser } from '../../services/authService'

const TaskForm = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const { addTask } = useTaskStore()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const user = await getCurrentUser()

    if (!user) return

    await addTask({
      title,
      description,
      completed: false,
      user_id: user.id
    })

    setTitle('')
    setDescription('')
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-4 mb-4">
      <h3 className="text-xl font-bold">Nueva tarea</h3>

      <input
        type="text"
        placeholder="Título"
        className="input-field"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Descripción"
        className="input-field"
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
      />

      <button className="btn-primary">Agregar</button>
    </form>
  )
}

export default TaskForm