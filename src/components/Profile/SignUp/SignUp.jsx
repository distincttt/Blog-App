import { Button } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import {
  usernameValidation,
  emailValidation,
  passwordValidation,
  rePasswordValidation,
  requiredValidation,
} from '../Validation'
import { userRegister, clearServerErrors } from '../../../Redux/profileSlice'

import classes from './SignUp.module.scss'

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm({ mode: 'onBlur' })

  const { serverErrors } = useSelector((state) => state.profileSlice)

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const onSubmit = async (data) => {
    await dispatch(userRegister(data))
    navigate(-1)
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <title className={classes['form__title']}>Create new account</title>
      <label className={classes['form__label']}>
        Username
        <input
          className={classes['form__label-input']}
          type="text"
          placeholder="Username"
          {...register('username', usernameValidation())}
          onClick={() => dispatch(clearServerErrors('username'))}
        ></input>
        {errors?.username && <div style={{ color: '#DC143C' }}>{errors.username.message}</div>}
        {serverErrors?.username && <div style={{ color: '#DC143C' }}>This username is already taken</div>}
      </label>
      <label className={classes['form__label']}>
        Email address
        <input
          className={classes['form__label-input']}
          type="text"
          placeholder="Email address"
          {...register('email', emailValidation())}
          onClick={() => dispatch(clearServerErrors('email'))}
        ></input>
        {errors?.email && <div style={{ color: '#DC143C' }}>{errors.email.message}</div>}
        {serverErrors?.email && <div style={{ color: '#DC143C' }}>This email is already taken</div>}
      </label>
      <label className={classes['form__label']}>
        Password
        <input
          className={classes['form__label-input']}
          type="password"
          placeholder="Password"
          {...register('password', passwordValidation())}
        ></input>
        {errors?.password && <div style={{ color: '#DC143C' }}>{errors.password.message}</div>}
      </label>
      <label className={classes['form__label']}>
        Repeat Password
        <input
          className={classes['form__label-input']}
          type="password"
          placeholder="Repeat Password"
          {...register('rePassword', rePasswordValidation(getValues('password')))}
        ></input>
        {errors?.rePassword && <div style={{ color: '#DC143C' }}>{errors.rePassword.message}</div>}
      </label>
      <label className={classes['form__labelCheckbox']}>
        <input
          className={classes['form__labelCheckbox-input']}
          type="checkbox"
          {...register('checkbox', requiredValidation())}
        ></input>
        I agree to the processing of my personal information
        {errors?.checkbox && <div style={{ color: '#DC143C' }}>{errors.checkbox.message}</div>}
      </label>
      <Button type="primary" size="large" disabled={!isValid}>
        Create
        <input className={classes['form__submit']} type="submit" />
      </Button>
      <span className={classes['form__footer']}>
        Already have an account?{' '}
        <Link to="/sign-in" className={classes['form__footer-link']}>
          Sign In.
        </Link>
      </span>
    </form>
  )
}
