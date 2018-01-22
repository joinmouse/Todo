import React, { Component } from 'react';
import './App.css';

import TodoInput from './Todo/TodoInput'
import TodoItem from './Todo/TodoItem'
//import UserDialog from './Dialog/User'
//import {getCurrentUser, signOut, TodoModel} from './Db/leanCloud'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newTodo: 'test',
      todoList: [
        {id:1, title:'我的第一个待办'},
        {id:2, title:'我的第二个待办'}
      ]
    }
  }

  //渲染
  render() {
    let todos = this.state.todoList.map((item, index) => {
      return <li>{item.title}</li>
    })

    return (
      <div className="App">
        <h1>我的待办</h1>
        <div className="inputWrapper">
          <TodoInput content={this.state.newTodo} />
        </div>
        <ol>
          <TodoItem todo={todos} />
        </ol>
      </div>
    )
  }

}

export default App;
