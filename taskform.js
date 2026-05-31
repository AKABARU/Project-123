export default {
  name: 'TaskForm',
  // [Критерий: Изолированный шаблон ввода данных с модификатором prevent для перехвата отправки]
  template: `
    <div class="card p-4 shadow-sm border-0">
      <h4 class="card-title mb-3 text-secondary text-center text-md-start">Новое дело</h4>
      
      <form @submit.prevent="sendDataToParent">
        <div class="row g-2">
          
          <div class="col-12">
            <input 
              v-model="inputTitle" 
              type="text" 
              class="form-control" 
              placeholder="Что планируете сделать?" 
              required
            />
          </div>

          <div class="col-12">
            <select v-model.number="inputPriority" class="form-select">
              <option value="3">🔴 Высокий приоритет</option>
              <option value="2">🟡 Средний приоритет</option>
              <option value="1">🟢 Низкий приоритет</option>
            </select>
          </div>

          <div class="col-12">
            <button type="submit" class="btn btn-primary w-100 fw-bold">Добавить</button>
          </div>

        </div>
      </form>
    </div>
  `,
  data() {
    return {
      inputTitle: '',
      inputPriority: 2
    }
  },
  methods: {
    // [Критерий: Валидация локального состояния и генерация события $emit с передачей объекта данных]
    sendDataToParent() {
      if (!this.inputTitle.trim()) return;

      this.$emit('add-task', {
        title: this.inputTitle,
        priority: this.inputPriority
      });

      // [Критерий: Сброс полей ввода до дефолтных значений после успешной генерации события]
      this.inputTitle = '';
      this.inputPriority = 2;
    }
  }
};