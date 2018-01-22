import React, { Component } from 'react'

export default class TodoInput extends Component {
  render() {
    //props是组件的对外接口，外部数据传递值给TodoInput组件最直接就是通过props方式
    return <input type="text" defaultValue={this.props.content}
      onKeyPress={this.submit.bind(this)} />
  }

  //监听用户点击回车事件,通过对外接口传递一个函数告诉<APP/>组件
  submit(e) {
    if(e.key === 'Enter'){
      console.log('用户按回车了')
      this.props.onSubmit(e)
    }
  }
}
