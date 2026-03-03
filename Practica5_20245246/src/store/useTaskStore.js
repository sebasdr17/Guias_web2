import { create } from 'zustand'
import { getTasks, createTask, updateTask, deleteTask } from '../services/taskService'

export const useTaskStore = create((set, get) => ({
  tasks: [],
  loading: false,
  error: null,

  fetchTasks: async (userId) => {
    set({ loading: true, error: null })
    try {
      const data = await getTasks(userId)
      set({ tasks: data, loading: false })
    } catch (err) {
      set({ error: err.message, loading: false })
    }
  },

  addTask: async (task) => {
    try {
      const newTask = await createTask(task)
      set({ tasks: [newTask, ...get().tasks] })
    } catch (err) {
      set({ error: err.message })
    }
  },

  editTask: async (id, updates) => {
    try {
      const updatedTask = await updateTask(id, updates)
      set({
        tasks: get().tasks.map(task =>
          task.id === id ? updatedTask : task
        )
      })
    } catch (err) {
      set({ error: err.message })
    }
  },

  removeTask: async (id) => {
    try {
      await deleteTask(id)
      set({
        tasks: get().tasks.filter(task => task.id !== id)
      })
    } catch (err) {
      set({ error: err.message })
    }
  }
}))