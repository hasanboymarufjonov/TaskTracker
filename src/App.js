import {useState, useEffect} from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'


function App() {

  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const TaskFromServer = await fetchTasks()
      setTasks(TaskFromServer)
    }

    getTasks()
  }, [])

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

// AddTask

const addTask = async (task) => {
  /*
  const id = Math.floor(Math.random()* 10000) +1
  const newTask = {id, ...task}
  setTasks([...tasks, newTask])
  */

  const res = await fetch('http://localhost:5000/tasks', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    }, 
    body: JSON.stringify(task)
  })

  const data = await res.json()

  setTasks([...tasks, data])
}

// Delete Task
const deleteTask = async (id) => {
  await fetch( `http://localhost:5000/tasks ${id}`, {
    method: 'DELETE'
  })

  setTasks(tasks.filter((task => task.id !== id)))
}

// Toggle Reminder
const toggleReminder = (id) => {
  console.log(id)
}

  return (
    <Router>
    <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
        
        <Route path='/' exact render={(props) => (
          <>
            {showAddTask && <AddTask onAdd={addTask}/>}
        {tasks.length > 0 ? (<Tasks tasks={tasks} 
        onDelete={deleteTask} 
        onToggle ={toggleReminder}/>) : ('No Tasks To Show')} 
          </>
        )} />
        <Route path='/about' component={About}/>
        <Footer />    
    </div>
    </Router>
  );
}


export default App;
