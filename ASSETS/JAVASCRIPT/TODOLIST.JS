document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById("todo-input");
    const addTodoBtn = document.getElementById("add-todo-btn");
    const todoList = document.getElementById("todo-list");
    const clearAllBtn = document.getElementById("clear-all-btn");
    const categorySelect = document.getElementById("category-select");
    const filterSelect = document.getElementById("filter-select");

    // Carrega tarefas do armazenamento local
    const loadTodos = () => {
        const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
        savedTodos.forEach(({ task, category }) => createTodoItem(task, category));
    };

    // Salva tarefas no armazenamento local
    const saveTodos = () => {
        const tasks = Array.from(todoList.children).map((li) => {
            const task = li.querySelector(".task-text").textContent;
            const category = li.querySelector(".category-label").textContent;
            return { task, category };
        });
        localStorage.setItem("todos", JSON.stringify(tasks));
    };

    // Cria um item de tarefa
    const createTodoItem = (task, category) => {
        const li = document.createElement("li");
        const taskText = document.createElement("span");
        taskText.textContent = task;
        taskText.classList.add("task-text", "editable");
        taskText.contentEditable = true;

        // Salva a tarefa editada automaticamente
        taskText.addEventListener("blur", saveTodos);

        const categoryLabel = document.createElement("span");
        categoryLabel.textContent = category;
        categoryLabel.classList.add("category-label");

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.classList.add("delete-btn");

        // Animação e exclusão de tarefa
        deleteBtn.addEventListener("click", () => {
            li.classList.add("todo-fade-out");
            li.addEventListener("transitionend", () => {
                todoList.removeChild(li);
                saveTodos(); // Atualiza o armazenamento local
            });
        });

        // Adiciona elementos à tarefa
        li.appendChild(taskText);
        li.appendChild(categoryLabel);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    };

    // Adiciona uma nova tarefa
    const addTodo = () => {
        const task = todoInput.value.trim();
        const category = categorySelect.value;
        if (!task) return;

        createTodoItem(task, category);
        saveTodos(); // Salva no armazenamento local
        todoInput.value = ""; // Limpa o input
    };

    // Limpar todas as tarefas
    const clearAll = () => {
        todoList.innerHTML = "";
        saveTodos(); // Remove do armazenamento local
    };

    // Filtrar tarefas por categoria
    const filterTodos = () => {
        const filter = filterSelect.value;
        Array.from(todoList.children).forEach((li) => {
            const category = li.querySelector(".category-label").textContent;
            if (filter === "Todas" || category === filter) {
                li.style.display = "";
            } else {
                li.style.display = "none";
            }
        });
    };

    // Event listeners
    addTodoBtn.addEventListener("click", addTodo);
    clearAllBtn.addEventListener("click", clearAll);
    filterSelect.addEventListener("change", filterTodos);
    todoInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") addTodo();
    });

    // Carregar tarefas na inicialização
    loadTodos();
});