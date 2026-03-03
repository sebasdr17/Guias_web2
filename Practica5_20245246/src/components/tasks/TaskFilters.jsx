import { useTaskStore } from '../../store/taskStore';
import { FILTERS, CATEGORIES } from '../../utils/constants';

export const TaskFilters = () => {
  const { currentFilter, currentCategory, searchQuery, setFilter, setCategory, setSearchQuery } = useTaskStore();
  
  return (
    <div className="card mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Filtros</h3>
      
      <div className="space-y-4">
        {/* Búsqueda por texto */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            Buscar por título o descripción
          </label>
          <input
            id="search"
            type="text"
            placeholder="Buscar tareas..."
            className="input-field"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Filtro por estado */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Estado
          </label>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setFilter(filter.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentFilter === filter.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Filtro por categoría */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Categoría
          </label>
          <select
            id="category"
            className="input-field"
            value={currentCategory}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">Todas las categorías</option>
            {CATEGORIES.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
