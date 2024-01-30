
import React, { Component } from "react";

export class ToDoList extends Component {
  constructor() {
    super();
    this.state = {
      userInput: '',
      todoList: []
    }
  }

  onChangeEvent(e) {
    this.setState({
      userInput: e
    })
  }

  addItem(input) {
    let listArray = this.state.todoList;
    if (input.trim() !== '') listArray.push({ text: input, bookmarked: false, checked: false });
    this.setState({
      todoList: listArray,
      userInput: ''
    })
  }

  onSubmitEvent = (e) => {
    e.preventDefault();
  }

  toggleProperty(index, property) {
    let listArray = this.state.todoList;
    listArray[index][property] = !listArray[index][property];
    this.setState({todoList: listArray})
  }

  deleteItem(index) {
    let listArray = this.state.todoList;
    listArray.splice(index, 1);
    this.setState({ todoList: listArray });
  }

  clearList() {
    let listArray = this.state.todoList;
    listArray = [];
    this.setState({todoList: listArray});
  }

  render() {
    const { userInput, todoList } = this.state;

    return (
      <form onSubmit={this.onSubmitEvent}>
        <div className="header">
          <h1>ToDo List</h1>
        </div>
        <div className="container">
          <input
            type="text"
            onChange={(e) => { this.onChangeEvent(e.target.value) }}
            value={userInput}
            className="inputField"
            placeholder="Add new task here..."
          />
          <button onClick={() => this.addItem(userInput)}
            className="btnAddItem">
            <i className="fa-solid fa-circle-plus"></i>
          </button>
        </div>
        <ul className="todoContainer">
          {todoList.map((item, index) => (
            <li className={`task ${item.checked ? 'checked' : ''} ${item.bookmarked ? 'bookmarked' : ''}`} key={index}>
              {item.text}
              <span className="taskBtnsWrapper">
                <button onClick={() => this.toggleProperty(index, 'bookmarked')}>
                  <i className={`fa-solid fa-star ${item.bookmarked ? 'gold' : ''}`}
                    aria-hidden='true'
                  />
                </button>
                <button onClick={() => this.toggleProperty(index, 'checked')}>
                  <i className={`fa-solid fa-circle-check ${item.checked ? 'green' : ''}`}
                    aria-hidden='true'
                  />
                </button>
                <button onClick={() => this.deleteItem(index)}>
                  <i className="fa-solid fa-trash-can" aria-hidden='true'
                  />
                </button>
              </span>
            </li>
          ))}
        </ul>
        <button onClick={()=> this.clearList()}
        className="btnClearList">Clear All</button>
      </form>
    );
  }
}
