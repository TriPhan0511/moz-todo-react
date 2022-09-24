/* eslint-disable jsx-a11y/no-redundant-roles */
import { nanoid } from 'nanoid'
import { useState } from 'react'
import Todo from './components/Todo'
import Form from './components/Form'
import FilterButton from './components/FilterButton'

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
}

const FILTER_NAME = Object.getOwnPropertyNames(FILTER_MAP)

function App(props) {
  const [tasks, setTasks] = useState(props.tasks)

  const [filter, setFilter] = useState('All')

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ))

  const taskNoun = taskList.length !== 1 ? 'tasks' : 'task'
  const headingText = `${taskList.length} ${taskNoun} remaining`

  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false }
    setTasks([...tasks, newTask])
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed }
      }
      return task
    })
    setTasks(updatedTasks)
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => task.id !== id)
    setTasks(remainingTasks)
  }

  function editTask(id, newName) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, name: newName }
      }
      return task
    })
    setTasks(updatedTasks)
  }

  return (
    <div className='todoapp stack-large'>
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className='filters btn-group stack-exception'>
        {FILTER_NAME.map((name) => (
          <FilterButton name={name} key={name} setFilter={setFilter} />
        ))}
      </div>
      <h2 id='list-heading'>{headingText}</h2>
      <ul
        role='list'
        className='todo-list stack-large stack-exception'
        aria-labelledby='list-heading'
      >
        {taskList}
      </ul>
    </div>
  )
}
export default App
