import React, { Component } from 'react'

export default class TodoInput extends Component {
  render() {
    //props是组件的对外接口，外部数据传递值给TodoInput组件最直接就是通过props方式
    return <input type="text" value={this.props.content}/>
  }
}
