import { CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM } from './actionType'

const defaultState = {
    inputValue: '',
    list: []
}

/* reducer返回一个函数，可以接受state，但不可以修改state
*  @state  上一次状态的state
*  @action    
*/
export default (state = defaultState, action) => {
    if(action.type === CHANGE_INPUT_VALUE) {
        // 深拷贝
        const newState = JSON.parse(JSON.stringify(state))
        newState.inputValue = action.value
        return newState
    }
    if(action.type === ADD_TODO_ITEM) {
        const newState = JSON.parse(JSON.stringify(state))
        newState.list.push(newState.inputValue)
        newState.inputValue = ''
        return newState
    }
    if(action.type === DELETE_TODO_ITEM ) {
        const newState = JSON.parse(JSON.stringify(state))
        newState.list.splice(action.index, 1)
        return newState
    }
    return state
}