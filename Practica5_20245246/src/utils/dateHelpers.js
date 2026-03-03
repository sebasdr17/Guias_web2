import { 
  format, 
  formatDistanceToNow, 
  isPast, 
  isToday, 
  isTomorrow 
} from 'date-fns';
import { es } from 'date-fns/locale';

// Formatear fecha en formato dd/MM/yyyy
export const formatDate = (date) => {
  if (!date) return '';
  const dateObj = date instanceof Date ? date : new Date(date);
  return format(dateObj, 'dd/MM/yyyy', { locale: es });
};

// Formatear fecha y hora en formato dd/MM/yyyy HH:mm
export const formatDateTime = (date) => {
  if (!date) return '';
  const dateObj = date instanceof Date ? date : new Date(date);
  return format(dateObj, 'dd/MM/yyyy HH:mm', { locale: es });
};

// Obtener tiempo relativo (ej: "hace 2 horas")
export const getRelativeTime = (date) => {
  if (!date) return '';
  const dateObj = date instanceof Date ? date : new Date(date);
  return formatDistanceToNow(dateObj, { addSuffix: true, locale: es });
};

// Verificar si una tarea está vencida
export const isOverdue = (dueDate, completed) => {
  if (!dueDate || completed) return false;
  const dateObj = dueDate instanceof Date ? dueDate : new Date(dueDate);
  return isPast(dateObj) && !isToday(dateObj);
};

// Obtener etiqueta de fecha de vencimiento
export const getDueDateLabel = (dueDate) => {
  if (!dueDate) return '';
  const dateObj = dueDate instanceof Date ? dueDate : new Date(dueDate);
  
  if (isToday(dateObj)) {
    return 'Hoy';
  } else if (isTomorrow(dateObj)) {
    return 'Mañana';
  } else if (isPast(dateObj)) {
    return 'Vencida';
  } else {
    return formatDate(dateObj);
  }
};
