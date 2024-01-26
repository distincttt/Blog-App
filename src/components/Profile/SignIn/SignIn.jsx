import { Button } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { emailValidation, requiredValidation } from '../Validation'
import { userLogin, clearServerErrors } from '../../../Redux/profileSlice'

import classes from './SignIn.module.scss'

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'onBlur' })

  const { navigateConroller, serverErrors } = useSelector((state) => state.profileSlice)
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const onSubmit = (data) => {
    dispatch(userLogin(data))
  }

  useEffect(() => {
    if (navigateConroller) {
      navigate(-1)
    }
  }, [navigateConroller])
  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <title className={classes['form__title']}>Sign In</title>
      {serverErrors['email or password'] && <div style={{ color: '#DC143C' }}>Invalid email or password</div>}
      <label className={classes['form__label']}>
        Email address
        <input
          className={classes['form__label-input']}
          type="text"
          placeholder="Email address"
          {...register('email', emailValidation())}
          onClick={() => dispatch(clearServerErrors('email or password'))}
        ></input>
        {errors?.email && <div style={{ color: '#DC143C' }}>{errors.email.message}</div>}
      </label>
      <label className={classes['form__label']}>
        Password
        <input
          className={classes['form__label-input']}
          type="password"
          placeholder="Password"
          {...register('password', requiredValidation())}
          onClick={() => dispatch(clearServerErrors('email or password'))}
        ></input>
        {errors?.password && <div style={{ color: '#DC143C' }}>{errors.password.message}</div>}
      </label>
      <Button type="primary" size="large" disabled={!isValid}>
        Login
        <input className={classes['form__submit']} type="submit" />
      </Button>
      <span className={classes['form__footer']}>
        Already have an account?{' '}
        <Link to="/sign-up" className={classes['form__footer-link']}>
          Sign Up.
        </Link>
      </span>
    </form>
  )
}
