import React from 'react'

export default class Form extends React.Component {
  render() {
    return (
      <>
        <form id="todoForm" onSubmit={this.props.handleFormSubmit}>
          <input 
            value={this.props.todoNameInput} 
            onChange={this.props.handleInputChange} 
            type="text" 
            placeholder='Type todo'>
          </input>
          <input type="submit"></input>
        </form>
        <button 
          onClick={this.props.toggleDisplayCompleted}
        >
          {this.props.displayCompleted ? 'Hide' : 'Show'} Completed
        </button>
      </>
    )
  }
}
