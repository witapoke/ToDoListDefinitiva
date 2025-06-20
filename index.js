document.addEventListener('DOMContentLoaded', () => {
  const taskContainer = document.getElementById('task-container')
  const taskInput = document.getElementById('task-input')
  const addTaskBtn = document.getElementById('add-task-btn')
  const taskList = document.getElementById('task-list')

  const quantityItem = document.createElement('p')
  quantityItem.id = 'quantity-item'

  function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }

  function updateTasks() {
    var currentTasks = []
    taskList
      .querySelectorAll('li')
      .forEach((task) => currentTasks.push(task.children[0].textContent))
    saveTasks(currentTasks)
  }

  function loadTasks() {
    const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks'))
    tasksFromLocalStorage?.forEach((task) => addTask(task))
  }

  function addTask(taskText) {
    const listItem = document.createElement('li')
    const p = document.createElement('p')
    const span = document.createElement('span')
    const editBtn = document.createElement('button')
    const deleteBtn = document.createElement('button')
    const quantityItem = document.createElement('p')

    listItem.id = 'list-item'
    editBtn.id = 'edit-btn'
    deleteBtn.id = 'delete-btn'
    editBtn.textContent = 'Editar'
    deleteBtn.textContent = 'Eliminar'
    p.textContent = taskText
    taskInput.value = ''

    span.appendChild(editBtn)
    span.appendChild(deleteBtn)
    listItem.appendChild(p)
    listItem.appendChild(span)
    taskList.appendChild(listItem)

    taskInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && taskInput.value !== '') {
        addTask(taskInput.value)
        updateTasks()
      }
    })

    deleteBtn.addEventListener('click', () => {
      taskList.removeChild(listItem)
      updateTasks()
      tellQuantity()
      if (taskList.children.length < 1) {
        location.reload()
      }
    })

    editBtn.addEventListener('click', () => {
      span.removeChild(editBtn)
      span.removeChild(deleteBtn)
      listItem.removeChild(p)

      const editInput = document.createElement('input')
      const cancelBtn = document.createElement('button')
      const finishBtn = document.createElement('button')

      editInput.id = 'edit-input'
      cancelBtn.id = 'cancel-btn'
      finishBtn.id = 'finish-btn'

      finishBtn.textContent = 'Finish edit'
      cancelBtn.textContent = 'Cancel'

      span.appendChild(editInput)
      span.appendChild(cancelBtn)
      span.appendChild(finishBtn)

      cancelBtn.addEventListener('click', () => {
        span.removeChild(editInput)
        span.removeChild(cancelBtn)
        span.removeChild(finishBtn)

        listItem.appendChild(p)
        listItem.appendChild(span)
        span.appendChild(editBtn)
        span.appendChild(deleteBtn)
      })

      finishBtn.addEventListener('click', () => {
        if (editInput.value !== '') {
          p.textContent = editInput.value

          span.removeChild(editInput)
          span.removeChild(cancelBtn)
          span.removeChild(finishBtn)

          listItem.appendChild(p)
          listItem.appendChild(span)
          span.appendChild(editBtn)
          span.appendChild(deleteBtn)

          updateTasks()
          tellQuantity()
        }
      })
    })

    updateTasks()
  }

  function tellQuantity() {
    const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks'))
    if (
      tasksFromLocalStorage.length > 0 &&
      tasksFromLocalStorage.length === 1
    ) {
      quantityItem.textContent =
        'Tenés ' + tasksFromLocalStorage.length + ' tarea pendiente'
      taskContainer.appendChild(quantityItem)
    } else if (tasksFromLocalStorage.length > 1) {
      quantityItem.textContent =
        'Tenés ' + tasksFromLocalStorage.length + ' tareas pendientes'
      taskContainer.appendChild(quantityItem)
    } else {
      return
    }
  }

  addTaskBtn.addEventListener('click', () => {
    if (taskInput.value !== '') {
      addTask(taskInput.value)
      tellQuantity()
    } else {
      return alert('Por favor ingrese una tarea')
    }
  })

  loadTasks()
  tellQuantity()
})
