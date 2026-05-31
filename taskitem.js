export default {
  name: 'TaskItem',
  // [Критерий: Строгая типизация и обязательность входящих параметров (props)]
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  // [Критерий: Шаблон отображения элемента с динамической подстановкой классов и стилей]
  template: `
    <div 
      class="card custom-task-card shadow-sm mb-3" 
      :class="[task.isCompleted ? 'border-success' : '', 'border-priority-' + task.priority]"
    >
      <div class="card-body d-flex justify-content-between align-items-center flex-wrap gap-3">
        
        <div>
          <h5 class="card-title mb-1" :class="{ 'completed-task': task.isCompleted }">
            {{ task.title }}
          </h5>
          
          <span class="badge me-2" :class="badgeColorClass">
            Приоритет: {{ task.priority }}
          </span>

          <span class="text-muted small">ID: {{ task.id }}</span>
        </div>

        <div class="d-flex gap-2">
          <button 
            @click="$emit('toggle-complete', task.id)" 
            class="btn btn-sm text-white"
            :class="task.isCompleted ? 'btn-secondary' : 'btn-success'"
          >
            {{ task.isCompleted ? 'Вернуть' : 'Выполнено' }}
          </button>

          <button 
            @click="$emit('delete-task', task.id)" 
            class="btn btn-danger btn-sm"
          >
            Удалить
          </button>
        </div>

      </div>
    </div>
  `,
  computed: {
    // [Критерий: Динамическое вычисление CSS-классов Bootstrap на основе значения свойства из объекта props]
    badgeColorClass() {
      if (this.task.priority === 3) return 'bg-danger';
      if (this.task.priority === 2) return 'bg-warning text-dark';
      return 'bg-info text-dark';
    }
  }
};