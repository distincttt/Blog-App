import { Button } from 'antd'
import { Link } from 'react-router-dom'

import classes from './Header.module.scss'

export default function Header() {
  return (
    <div className={classes.header}>
      <Link to="/">
        <title className={classes['header__title']}>Realworld Blog</title>
      </Link>
      <div className={classes['header__profiles']}>
        <Link to="sign-in">
          <Button size="large" className={classes['header__profiles-button']}>
            Sign In
          </Button>
        </Link>
        <Link to="sign-up">
          <Button size="large" className={classes['header__profiles-button']}>
            Sign Up
          </Button>
        </Link>
      </div>
    </div>
  )
}
