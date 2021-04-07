import axios from 'axios'

const url = 'https://jsonplaceholder.typicode.com/todos/1'

interface Todo {
   id: number
   title: string
   completed: boolean
}

axios
   .get(url)
   .then(x=>{
      const todo = x.data as Todo
      const id = todo.id  
      const title = todo.title  
      const completed = todo.completed  

      logTodo(id, title, completed)
   })


const logTodo = (id: number, title: string, completed: boolean) =>{
   console.log(`
      Todo ID: ${id}
      Todo Title: ${title}
      Todo Completed: ${completed}
   `)
}