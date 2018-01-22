import React, { Component } from 'react';
import './App.css';
import 'normalize.css'
import './css/reset.css'

import TodoInput from './Todo/TodoInput'
import TodoItem from './Todo/TodoItem'
//import UserDialog from './Dialog/User'
//import {getCurrentUser, signOut, TodoModel} from './Db/leanCloud'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newTodo: '',
      todoList: []
    }
  }

  //渲染
  render() {
    let todos = this.state.todoList.map((item, index) => {
      return (
        <li key={index}>
          <TodoItem todo={item} />
        </li>
      )
    })

    return (
      <div className="App">
        <h1>我的待办</h1>
        <div className="inputWrapper">
          <TodoInput content={this.state.newTodo} onSubmit={this.addTodo.bind(this)}/>
        </div>
        <ol>
          {todos}
        </ol>
      </div>
    )
  }

  addTodo(event) {
    this.state.todoList.push({
      id: idMarker(),
      title: event.target.value,
      status: null,
      deleted: false
    })
    this.setState({
      newTodo: '',
      todoList: this.state.todoList
    })
  }

}

let id = 0

function idMarker(){
  id += 1
  return id
}

export default App;

