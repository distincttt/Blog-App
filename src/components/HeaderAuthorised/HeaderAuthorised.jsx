import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { clearNavigateConroller, userDelete } from '../../Redux/profileSlice'

import classes from './HeaderAuthorised.module.scss'

export default function HeaderAuthorised() {
  let { user } = useSelector((state) => state.profileSlice)
  if (!Object.keys(user).length) {
    user = JSON.parse(localStorage.getItem('user')).user
  }

  const dispatch = useDispatch()
  const logOut = () => {
    dispatch(clearNavigateConroller())
    dispatch(userDelete())
    localStorage.removeItem('user')
  }
  return (
    <div className={classes.header}>
      <Link to="/">
        <title className={classes['header__title']}>Realworld Blog</title>
      </Link>
      <div className={classes['header__profiles']}>
        <Link to="/new-article">
          <Button type="text" className={classes['header__profiles-buttonText']}>
            Create article
          </Button>
        </Link>
        <Link to="/profile" className={classes['header__profiles__profile']}>
          {user.username}
          {user.image && <img src={user.image} className={classes['header__profiles__profile-image']}></img>}
        </Link>
        <Link to="/sign-up" onClick={logOut}>
          <Button size="large" className={classes['header__profiles-button']}>
            Log Out
          </Button>
        </Link>
      </div>
    </div>
  )
}
