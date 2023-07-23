import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllPosts, fetchPosts } from './postsSlice'
import { Link } from 'react-router-dom'
import { PostAuthor } from './PostAuthor'
import { ReactionButtons } from './ReactionButtons'
import { Spinner } from '../../components/Spinner'
import { TimeAgo } from './TimeAgo'
import { AddPostForm } from './addPostForm'
import {
  fetchNotifications,
  selectAllNotifications,
} from '../notifications/notificationsSlice'

let PostExcerpt = ({ post }) => {
  return (
    <article className="post-excerpt">
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <ReactionButtons post={post} />
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  )
}
PostExcerpt = React.memo(PostExcerpt)

export const PostsList = () => {
  const dispatch = useDispatch()
  const posts = useSelector(selectAllPosts)
  const postStatus = useSelector((state) => state.posts.status)
  const error = useSelector((state) => state.posts.error)
  const notifications = useSelector(selectAllNotifications)
  const numUnreadNotifications = notifications.filter((n) => !n.read).length
  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])
  let content

  if (postStatus === 'loading') {
    content = <Spinner text="Loading..." />
  } else if (postStatus === 'succeeded') {
    // Sort posts in reverse chronological order by datetime string
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date))

    content = orderedPosts.map((post) => (
      <PostExcerpt key={post.id} post={post} />
    ))
  } else if (postStatus === 'failed') {
    content = <div>{error}</div>
  }
  const fetchNewNotifications = () => {
    dispatch(fetchNotifications())
  }
  return (
    <section className="posts-list">
      <br />
      <span> авторы постов являются юзерами- </span>
      <Link to="/users"> USERS </Link>
      <br />
      <br />
      <span> юзеры пишут заметки- </span>
      <Link to="/notifications">NOTIFICATIONS</Link>
      <p>
        всего заметок : {notifications.length} , непрочитанных :
        {numUnreadNotifications}
      </p>
      <br />
      <br />
      <span> кнопка добавляет заметки - </span>
      <button className="button" onClick={fetchNewNotifications}>
        Refresh Notifications
      </button>
      <AddPostForm />
      <h2>Posts - {posts.length}</h2>
      {content}
    </section>
  )
}
