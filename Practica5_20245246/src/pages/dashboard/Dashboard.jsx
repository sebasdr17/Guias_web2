import { useEffect } from 'react'
import { useTaskStore } from '../../store/useTaskStore'
import { getCurrentUser } from '../../services/authService'
import Navbar from '../../components/layout/Navbar'
import TaskForm from '../../components/tasks/TaskForm'
import TaskCard from '../../components/tasks/TaskCard'

const Dashboard = () => {
  const { tasks, fetchTasks, removeTask } = useTaskStore()

  useEffect(() => {
    const loadTasks = async () => {
      const user = await getCurrentUser()
      if (user) {
        fetchTasks(user.id)
      }
    }
    loadTasks()
  }, [])

  return (
    <div>
      <Navbar />

      <div className="p-6 max-w-3xl mx-auto">
        <TaskForm />

        <div className="grid gap-4">
          {tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={removeTask}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard