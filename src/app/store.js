import { configureStore } from '@reduxjs/toolkit'
import postReducer from '../features/posts/postsSlice'
import usersReduser from '../features/users/usersSlice'
import counterReducer from '../features/counter/counterSlice'
import notificationsReducer from '../features/notifications/notificationsSlice'

export default configureStore({
  reducer: {
    posts: postReducer,
    users: usersReduser,
    counter: counterReducer,
    notifications: notificationsReducer,
  },
})
