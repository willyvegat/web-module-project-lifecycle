import React from 'react';
import axios from 'axios';

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    todos: []
  }
  fetchAllTodos = () => {
    axios.get(URL)
      .then(res => {
        // console.log(res.data.data)
        this.setState({ ...this.state, todos: res.data.data })
      })
      .catch(err => {
        debugger
      })
  }
  componentDidMount() {
    this.fetchAllTodos()
  }
  render() {
    return (
      <div>
        <h2>Todos:</h2>
        {
          this.state.todos.map(todo => {
            return <div key={todo.id}>{todo.name}</div>
          })
        }
      </div>
    )
  }
}
