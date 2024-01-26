import { Button } from 'antd'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { createArticle } from '../../../Redux/articleSlice'
import { requiredValidation } from '../../Profile/Validation'

import Tag from './Tag'
import classes from './CreateArticle.module.scss'

export default function CreateArticle() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'onBlur' })

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { navigateConroller } = useSelector((state) => state.articleSlice)

  const [tags, setTags] = useState([''])
  const addTag = () => {
    setTags([...tags, ''])
  }

  const onSubmit = (data) => {
    const article = JSON.stringify({ article: { ...data, tagList: [...tags] } })
    dispatch(createArticle(article))
  }

  useEffect(() => {
    if (navigateConroller) {
      navigate(-1)
    }
  }, [navigateConroller])

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <title className={classes['form__title']}>Create new article</title>
      <label className={classes['form__label']}>
        Title
        <input
          className={classes['form__label__input']}
          type="text"
          placeholder="Title"
          {...register('title', requiredValidation())}
        ></input>
        {errors?.title && <div style={{ color: '#DC143C' }}>{errors.title.message}</div>}
      </label>
      <label className={classes['form__label']}>
        Short description
        <input
          className={classes['form__label__input']}
          type="text"
          placeholder="Description"
          {...register('description', requiredValidation())}
        ></input>
        {errors?.description && <div style={{ color: '#DC143C' }}>{errors.description.message}</div>}
      </label>
      <label className={classes['form__label']}>
        Text
        <textarea
          className={classes['form__label__input']}
          placeholder="Text"
          {...register('body', requiredValidation())}
        ></textarea>
        {errors?.body && <div style={{ color: '#DC143C' }}>{errors.body.message}</div>}
      </label>
      <label className={classes['form__label__tags']}>
        Tags
        <div className={classes['form__label__tags__buttons']}>
          {tags.map((_, i) => {
            return <Tag key={i} tags={tags} setTags={setTags} id={i} />
          })}
          <Button className={classes['form__label__tags__buttons-button']} onClick={addTag}>
            Add tag
          </Button>
        </div>
      </label>
      <Button type="primary" size="large" style={{ alignSelf: 'center', width: '500px' }} disabled={!isValid}>
        Send
        <input className={classes['form__submit']} type="submit" />
      </Button>
    </form>
  )
}
