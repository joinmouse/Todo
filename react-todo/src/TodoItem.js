import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
        const { content, test } = this.props
        return (
            <div onClick={this.handleDelete}>{test} - {content}</div>
        )
    }
}

TodoItem.propTypes = {
    test: PropTypes.string.isRequired,
    content: PropTypes.string,
    delete: PropTypes.func,
    index: PropTypes.number
}
TodoItem.defaultProps = {
    test: '做任务'
}


export default TodoItem