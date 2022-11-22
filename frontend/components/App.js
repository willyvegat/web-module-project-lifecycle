import React from 'react';
import axios from 'axios';

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    todos: [],
    error: '',
    todoNameInput: '',
    displayCompleted: true
  }

  handleInputChange = event => {
    const { value } = event.target;
    this.setState({ ...this.state, todoNameInput: value })
  }

  resetForm = () => this.setState({ ...this.state, todoNameInput: '' })

  setAxiosResponseError = err => this.setState({ ...this.state, error: err.response.data.message })

  postNewTodo = () => {
    axios.post(URL, { name: this.state.todoNameInput})
      .then(res => {
        this.setState({ ...this.state, todos: this.state.todos.concat(res.data.data) })
        this.resetForm();
      })
      .catch(this.setAxiosResponseError);
  }

  handleFormSubmit = event => {
    event.preventDefault()
    this.postNewTodo()
  }

  fetchAllTodos = () => {``
    axios.get(URL)
      .then(res => {
        // console.log(res.data.data)
        this.setState({ ...this.state, todos: res.data.data })
      })
      .catch(this.setAxiosResponseError)
  }

  toggleCompleted = id => () => {
    axios.patch(`${URL}/${id}`)
      .then(res => {
        this.setState({ ...this.state, todos: this.state.todos.map(todo => {
          if (todo.id !== id) return todo
          return res.data.data;
          })
        })
      })
      .catch(this.setAxiosResponseError);
  }

  componentDidMount() {
    this.fetchAllTodos()
  }

  toggleDisplayCompleted = () => {
    this.setState({ ...this.state, displayCompleted: !this.state.displayCompleted })
  }

  render() {
    return (
      <div>
        <div id="error">Error: {this.state.error}</div>
        <div id='todos'>
          <h2>Todos:</h2>
          {
            this.state.todos.reduce((acc, todo) => {
              if (this.state.displayCompleted || !todo.completed) return acc.concat(
                <div onClick={this.toggleCompleted(todo.id)} key={todo.id}>{todo.name} {todo.completed ? ' ✔️' : ""}</div>
              );
              return acc;
            }, [])
          }
        </div>
        <form id="todoForm" onSubmit={this.handleFormSubmit}>
          <input value={this.state.todoNameInput} onChange={this.handleInputChange} type="text" placeholder='Type todo'></input>
          <input type="submit"></input>
        </form>
        <button onClick={this.toggleDisplayCompleted}>{this.state.displayCompleted ? 'Hide' : 'Show'} Completed</button>
      </div>
    )
  }
}
