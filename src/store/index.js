/**
 * @component store
 * @description Store配置
 * @time 2018/3/10
 * @author JOKER XU
 */

import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { routerReducer } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas'

import { reducer as todoReducer } from '../pages/Todo/TodoList'
import { reducer as filterReducer } from '../pages/Todo/Filter'
import { reducer as HelloReducer } from '../pages/Hello'

const win = window

// root reducer
const reducer = combineReducers({
  todos: todoReducer,
  filter: filterReducer,
  hello: HelloReducer,
  routing: routerReducer,
})

const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware]
if (process.env.NODE_ENV !== 'production') {
  //  检查reducer 是否违反了作为一个纯函数的规定擅自修改了参数 state
  // middlewares.push(require('redux-immutable-state-invariant')());
}

const storeEnhancers = compose(
  applyMiddleware(...middlewares),
  (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,
)

const store = createStore(reducer, {}, storeEnhancers)

sagaMiddleware.run(rootSaga)

export default store
