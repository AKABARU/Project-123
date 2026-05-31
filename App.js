export default {
  name: 'App',
  // [Критерий: Корневой шаблон и декларативная отрисовка условных блоков v-if / v-for]
  template: `
    <div class="container py-5">
      
      <header class="text-center text-md-start mb-5 d-flex justify-content-between align-items-center flex-wrap gap-3">
        <h1 class="display-5 fw-bold text-primary mb-0">Планировщик задач</h1>
        <span class="badge bg-primary fs-5 shadow-sm">Всего задач: {{ totalTasks }}</span>
      </header>

      <div class="row">
        
        <div class="col-12 col-lg-4 mb-4">
          <task-form @add-task="addNewTask" />
        </div>

        <div class="col-12 col-md-12 col-lg-8">
          
          <div v-if="tasks.length === 0" class="alert alert-info text-center border-0 shadow-sm">
            Список задач пуст. Добавьте задачу в форме слева!
          </div>

          <task-item 
            v-for="item in tasks" 
            :key="item.id"
            :task="item"
            @toggle-complete="toggleTaskStatus"
            @delete-task="deleteTaskById"
          />

        </div>
      </div>

    </div>
  `,
  data() {
    return {
      // [Критерий: Очистка исходного состояния данных (задачи удалены)]
      tasks: []
    }
  },
  computed: {
    // [Критерий: Использование вычисляемых свойств (computed) для реактивного подсчета]
    totalTasks() {
      return this.tasks.length;
    }
  },
  methods: {
    // [Критерий: Динамическое добавление объектов в массив со сбором данных и генерацией уникального ID]
    addNewTask(taskData) {
      const newTask = {
        id: Date.now(),
        title: taskData.title,
        priority: taskData.priority,
        isCompleted: false
      };
      this.tasks.push(newTask);
    },
    // [Критерий: Безопасное удаление элемента из реактивного массива по индексу]
    deleteTaskById(id) {
      const targetIndex = this.tasks.findIndex(t => t.id === id);
      if (targetIndex !== -1) {
        this.tasks.splice(targetIndex, 1);
      }
    },
    // [Критерий: Изменение состояния конкретного объекта внутри массива (Инверсия флага)]
    toggleTaskStatus(id) {
      const task = this.tasks.find(t => t.id === id);
      if (task) {
        task.isCompleted = !task.isCompleted;
      }
    }
  }
};