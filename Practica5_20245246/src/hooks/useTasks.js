import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { useTaskStore } from '../store/taskStore';
import { subscribeToTasks } from '../services/taskService';

export const useTasks = () => {
  const user = useAuthStore((state) => state.user);
  const setTasks = useTaskStore((state) => state.setTasks);
  const setLoading = useTaskStore((state) => state.setLoading);
  const setError = useTaskStore((state) => state.setError);
  
  useEffect(() => {
    if (!user) {
      setTasks([]);
      return;
    }
    
    setLoading(true);
    
    const unsubscribe = subscribeToTasks(user.uid, (tasks) => {
      setTasks(tasks);
      setLoading(false);
      setError(null);
    });
    
    // Cleanup: desuscribirse cuando el componente se desmonte
    return () => unsubscribe();
  }, [user, setTasks, setLoading, setError]);
};
