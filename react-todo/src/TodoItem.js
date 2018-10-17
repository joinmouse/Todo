import React, { Component } from 'react';

class TodoItem extends Component {
    
    constructor(props) {
        super(props)

        this.handleDelete = this.handleDelete.bind(this)
    }

    // 子组件和父组件通信(通信) => 子组件调用父组件传递过来的方法
    handleDelete() {
        const { index } = this.props
        this.props.delete(index)
    }

    render() {
        const { content } = this.props
        return (
            <div onClick={this.handleDelete}>{content}</div>
        )
    }
}

export default TodoItem