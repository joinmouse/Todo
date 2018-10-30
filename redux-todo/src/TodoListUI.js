import React, { Component } from 'react';
import { Input, Button, List } from 'antd';

class TodoListUI extends Component {
    constructor (props) {
        super(props)
    }

    render() {
        return (
            <div style={{marginTop: '10px', marginLeft: '10px'}}>
                <div>
                    <Input 
                        value={this.props.inputValue} 
                        placeholder="todo info" 
                        style={{width: '300px', marginRight: '10px'}}
                        onChange={this.props.handleInputChange}
                    />
                    <Button type="primary" onClick={this.props.handleBtnClick}>提交</Button>
                    <List
                        style={{width: '300px', marginTop: '10px'}}
                        size="small"
                        bordered
                        dataSource={this.props.list}
                        renderItem={(item, index) => (
                            <List.Item onClick ={ (index) => {this.props.handleItemDelete(index)} }>{item}</List.Item>
                        )}
                    />
                </div>
            </div>
        )
    }
}

export default TodoListUI