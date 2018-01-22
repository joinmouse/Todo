import AV from 'leancloud-storage'

var APP_ID = 'rUcmyykR2Tsi5VOPjfnkM7Yj-gzGzoHsz'
var APP_KEY = 'Oy9HGah8eknBB6yTb9LOKjrt'
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
})

export default AV


//所有Todo相关的LeanCloud操作都放在这里　

export const TodoModel = {
  //文档见 https://leancloud.cn/docs/leanstorage_guide-js.html#批量操作
  getByUser(user, success, error) {
    let query = new AV.Query('Todo');
    query.equalTo('deleted', false)
    query.find().then((response) => {
      let array = response.map((t) => {
        return {id:t.id, ...t.attributes}
      })
      success.call(null,array)
    },　(error) => {
      error && success.call(null,error)
    })
  },

  create({status, title, deleted}, success, error) {
    let Todo = AV.Object.extend('Todo')
    let todo = new Todo()
    todo.set('title', title)
    todo.set('status', status)
    todo.set('deleted', deleted)

    //根据文档 https://leancloud.cn/docs/acl-guide.html#单用户权限设置
    //可以让这个Todo只被当前用户看到
    let acl = new AV.ACL()
    acl.setPublicReadAccess(false)
    acl.setReadAccess(AV.User.current(),true)
    acl.setWriteAccess(AV.User.current(),true);
    todo.setACL(acl)

    todo.save().then((response) => {
      success.call(null,response.id)
    }, (error) => {
      error && error.call(null, error)
    })
  },

  update({id, title, status, deleted}, success, error){
    //文档https://leancloud.cn/docs/leanstorage_guide-js.html#更新对象
    let todo = AV.Object.createWithoutData('Todo', id)
    title !== undefined && todo.set('title', title)
    status !== undefined && todo.set('status', status)
    deleted !== undefined && todo.set('deleted', deleted)
    // 考虑如下场景:
    // update({id:1, title:'hi'})
    // 调用 update 时，很有可能没有传 status 和 deleted
    // 也就是说，用户只想「局部更新」
    // 所以我们只 set 该 set 的
    // 那么为什么不写成 title && todo.set('title', title) 呢，为什么要多此一举跟 undefined 做对比呢？
    // 考虑如下场景
    // update({id:1, title: '', status: null}}
    // 用户想将 title 和 status 置空，我们要满足
    todo.save().then((respone) => {
      success && success.call(null)
    }, (error) => {
      error && error.call(null, error)
    })
  },

  destory(todoId, success, error){
    //并不删除数据，而将数据标记为deleted
    TodoModel.update({id:todoId, deleted:true}, success, error)
  }
}

//注册
export function signUp(email, username, password, success, error){
  //新建AV.User　对象实例
  let user = new AV.User()
  user.setUsername(username)
  user.setPassword(password)
  user.setEmail(email)

  user.signUp().then((loginedUser) => {
    let user = getUserFromAVUser(loginedUser)
    success.call(null, user)
  }, (error) => {
    error.call(null, error)
  })

  return undefined
}

//登录
export function signIn(username, password, success, error) {
  AV.User.logIn(username, password).then((loginedUser) => {
    let user = getUserFromAVUser(loginedUser)
    success.call(null, user)
  }, (error) => {
    error.call(null, error)
  })
}

//获取当前用户
export function getCurrentUser() {
  let user = AV.user.current()
  if(user) {
    return getUserFromAVUser(user)
  } else {
    return null
  }
}

//退出
export function signOut(){
  AV.User.logOut()
  return undefined
}

//忘记密码:发送密码到邮箱
export function sendPasswordResetEmail (email, successFn, errorFn) {
  AV.User.requestPasswordReset(email).then(function (success) {
    successFn.call()
  }, function (error) {
    errorFn.call(null, error)
  })
}

function getUserFromAVUser(AVuser) {
  return {
    id: AVuser.id,
    ...AVuser.attributes
  }
}
