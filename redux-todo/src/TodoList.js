import React, { Component } from 'react';
import 'antd/dist/antd.css';
import TodoListUI from './TodoListUI'

import store from './store';
import { getInputChangeAction, getAddItemAction, getDeleteItemAction } from './store/action'

class TodoList extends Component {
  constructor(props) {
    super(props)
    this.state = store.getState()

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleStoreChange = this.handleStoreChange.bind(this)
    this.handleBtnClick = this.handleBtnClick.bind(this)

    store.subscribe(this.handleStoreChange)
  }

  handleInputChange(e) {
    const action = getInputChangeAction(e.target.value)
    store.dispatch(action)
  }

  handleStoreChange() {
    this.setState(store.getState())
  }

  // add
  handleBtnClick() {
    const action = getAddItemAction()
    store.dispatch(action)
  }

  // delete

  handleItemDelete(index) {
    const action = getDeleteItemAction(index)
    store.dispatch(action)
  }

  render() {
    return (
        <TodoListUI 
          inputValue = {this.state.inputValue}
          list = {this.state.list}
          handleInputChange = {this.handleInputChange}
          handleBtnClick = {this.handleBtnClick}
          handleItemDelete = {this.handleItemDelete}
        />
    )
  }
}

export default TodoList;
