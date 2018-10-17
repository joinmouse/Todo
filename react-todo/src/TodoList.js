import React, { Component } from 'react';
import TodoItem from './TodoItem';

// 定义一个react组件
class TodoList extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      list: [
        'learn react',
        'learn english',
        'learn typescript'
      ],
      inputValue: ''
    }

    this.handleBtnClick = this.handleBtnClick.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleInputChange(e) {
    this.setState({
      inputValue: e.target.value
    })
  }

  handleBtnClick() {
    this.setState({
      list: [...this.state.list, this.state.inputValue],
      inputValue: ''
    })
  }

  handleDelete(index) {
    const list = [...this.state.list]
    list.splice(index, 1)
    this.setState({
      list: list
    })
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <input onChange={this.handleInputChange} value={this.state.inputValue} />
          <button onClick={this.handleBtnClick}>add</button>  
        </div>
        <ul>
          {
            this.state.list.map((item, index) => {
              return (
                <TodoItem 
                  delete={this.handleDelete} 
                  key={index} 
                  content={item} 
                  index={index}
                />
              )
            })
          }
        </ul>
      </React.Fragment>
    );
  }
}

export default TodoList;
