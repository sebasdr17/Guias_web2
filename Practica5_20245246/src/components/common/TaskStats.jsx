import { useTaskStore } from '../../store/taskStore';
import { isOverdue } from '../../utils/dateHelpers';

export const TaskStats = () => {
  const tasks = useTaskStore((state) => state.tasks);
  
  // Calcular estadísticas
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.filter(task => !task.completed).length;
  const overdueTasks = tasks.filter(task => 
    isOverdue(task.dueDate, task.completed)
  ).length;
  
  // Calcular porcentaje de completitud
  const completionPercentage = totalTasks > 0 
    ? Math.round((completedTasks / totalTasks) * 100) 
    : 0;
  
  const stats = [
    { 
      label: 'Total de Tareas', 
      value: totalTasks, 
      color: 'blue',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600' 
    },
    { 
      label: 'Completadas', 
      value: completedTasks, 
      color: 'green',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600' 
    },
    { 
      label: 'Pendientes', 
      value: pendingTasks, 
      color: 'yellow',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600' 
    },
    { 
      label: 'Vencidas', 
      value: overdueTasks, 
      color: 'red',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600' 
    }
  ];
  
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Estadísticas</h2>
      
      {/* Grid de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <div 
            key={stat.label} 
            className={`${stat.bgColor} rounded-lg p-6 shadow-sm`}
          >
            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.textColor}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>
      
      {/* Barra de progreso */}
      <div className="card">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Progreso de Completitud
          </span>
          <span className="text-sm font-bold text-blue-600">
            {completionPercentage}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div 
            className="bg-blue-600 h-4 rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
