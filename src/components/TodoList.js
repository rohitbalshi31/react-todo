import React, { Component } from "react";


 class Todolist extends Component {
    constructor() {
      super();
      this.state = {
        todos: [],
        value: "",
        editing: false,
        currentid: "",
        currentValue: ""
      };
    }
    
    handleChange = (e) => {
      this.setState({ value: e.target.value });
    };

    handleAddTask = (e) => {
      e.preventDefault();
      const obj = {
        name: this.state.value,
        id: Date.now()
      };
      if (this.state.value !== "") {
        this.setState({ todos: this.state.todos.concat(obj) });
        this.setState({ value: "" });
      }
    };
  
    handleDeleteTask = (itemId) => {
      this.setState({
        todos: [...this.state.todos].filter((id) => id.id !== itemId)
      });
    };
  
    handleEditTodo = (id, newValue) => {
      this.state.todos.map((todo) => {
        if (todo.id === id) {
          todo.name = newValue;
        }
      });
    };
  
    handleSubmitEditTodo = (e) => {
      e.preventDefault();
  
      this.handleEditTodo(this.state.currentid, this.state.currentValue);
      this.setState({ editing: false });
    };
  
    handleToggleEdit = (todo) => {
      this.setState({ editing: true });
      this.setState({ currentid: todo.id });
      this.setState({ currentValue: todo.name });
    };
  
    handleEditInputChange = (e) => {
      this.setState({ currentValue: e.target.value });
    };
  
    render() {
      const mylist = this.state.todos.map((todo, id) => (
        <li className="todo_item" key={id}>
          {/*<input type="checkbox" />*/}
          <p>{todo.name}</p>
          <div className="tools">
            <button className="edit" onClick={() => this.handleToggleEdit(todo)}>
            <i className="fa-solid fa-pen-to-square"></i>
            </button>
            <button className="delete" onClick={() => this.handleDeleteTask(todo.id)}>
            <i className="fa-sharp fa-solid fa-trash"></i>
            </button>
          </div>
        </li>
      ));
  
      return (
        <div className="todo">
            <h1>Todo List React</h1><hr />
          {this.state.editing === false ? (
            <form onSubmit={this.handleAddTask}>
              <input
                placeholder="Type your task"
                value={this.state.value}
                onChange={this.handleChange}
                className="todo-input"
              />
              <button onClick={this.handleAddTask} className="add">+Add task</button>
            </form>
          ) : (
            <form onSubmit={this.handleSubmitEditTodo}>
              <input
                placeholder="edit your task"
                value={this.state.currentValue}
                name={this.state.currentValue}
                onChange={this.handleEditInputChange}
              />
              <button onClick={this.handleSubmitEditTodo} className="update"> update</button>
            </form>
          )}
          <ul className="todo_wrapper">{mylist}</ul>
        </div>
      );
    }
  }
  
export default Todolist