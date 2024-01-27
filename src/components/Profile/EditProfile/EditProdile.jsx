import { Button } from 'antd'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'

import { usernameValidation, emailValidation, avatarValidation } from '../Validation'
import { userUpdate, clearServerErrors } from '../../../Redux/profileSlice'

import classes from './EditProfile.module.scss'

export default function EditProfile() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'onBlur' })

  let { serverErrors, user } = useSelector((state) => state.profileSlice)
  if (!Object.keys(user).length) {
    user = JSON.parse(localStorage.getItem('user')).user
  }
  const [userNew, setUserNew] = useState(user)
  const handleChange = (e, input) => {
    if (input === 'username') setUserNew({ ...userNew, username: e.target.value })
    if (input === 'email') setUserNew({ ...userNew, email: e.target.value })
    if (input === 'image') setUserNew({ ...userNew, image: e.target.value })
  }

  const dispatch = useDispatch()
  const token = JSON.parse(localStorage.getItem('user')).user.token
  const onSubmit = (data) => {
    data = { ...data, token }
    dispatch(userUpdate(data))
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <title className={classes['form__title']}>Edit Profile</title>
      <label className={classes['form__label']}>
        Username
        <input
          className={classes['form__label-input']}
          type="text"
          placeholder="Username"
          {...register('username', usernameValidation())}
          onClick={() => dispatch(clearServerErrors('username'))}
          value={userNew.username}
          onChange={(e) => handleChange(e, 'username')}
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
          value={userNew.email}
          onChange={(e) => handleChange(e, 'email')}
        ></input>
        {errors?.email && <div style={{ color: '#DC143C' }}>{errors.email.message}</div>}
        {serverErrors?.email && <div style={{ color: '#DC143C' }}>This email is already taken</div>}
      </label>
      <label className={classes['form__label']}>
        Avatar image (url)
        <input
          className={classes['form__label-input']}
          type="text"
          placeholder="Avatar image"
          {...register('image', avatarValidation())}
          value={userNew.image}
          onChange={(e) => handleChange(e, 'image')}
        ></input>
        {errors?.image && <div style={{ color: '#DC143C' }}>{errors.image.message}</div>}
      </label>
      <Button type="primary" size="large" disabled={!isValid}>
        Save
        <input className={classes['form__submit']} type="submit" />
      </Button>
    </form>
  )
}
