import { Button } from 'antd'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { updateArticle } from '../../../Redux/articleSlice'
import { requiredValidation } from '../../Profile/Validation'

import Tag from './Tag'
import classes from './CreateArticle.module.scss'

export default function EditArticle() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'onBlur' })

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { article, navigateConroller } = useSelector((state) => state.articleSlice)
  const [articleNew, setArticleNew] = useState(article)
  let [tags, setTags] = useState(article.tagList)

  const addTag = () => {
    setTags([...tags, ''])
  }

  const onSubmit = (data) => {
    const articleNew = { article: { ...data, tagList: [...tags] }, slug: article.slug }
    dispatch(updateArticle(articleNew))
  }

  const handleChange = (e, input) => {
    if (input === 'title') setArticleNew({ ...articleNew, title: e.target.value })
    if (input === 'description') setArticleNew({ ...articleNew, description: e.target.value })
    if (input === 'body') setArticleNew({ ...articleNew, body: e.target.value })
  }

  useEffect(() => {
    if (navigateConroller) {
      navigate(-1)
    }
    if (typeof tags === 'undefined') {
      navigate(-1)
    }
  }, [navigateConroller, tags])

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <title className={classes['form__title']}>Edit article</title>
      <label className={classes['form__label']}>
        Title
        <input
          className={classes['form__label__input']}
          type="text"
          placeholder="Title"
          {...register('title', requiredValidation())}
          onChange={(e) => handleChange(e, 'title')}
          value={articleNew.title}
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
          onChange={(e) => handleChange(e, 'description')}
          value={articleNew.description}
        ></input>
        {errors?.description && <div style={{ color: '#DC143C' }}>{errors.description.message}</div>}
      </label>
      <label className={classes['form__label']}>
        Text
        <textarea
          className={classes['form__label__input']}
          placeholder="Text"
          {...register('body', requiredValidation())}
          onChange={(e) => handleChange(e, 'body')}
          value={articleNew.body}
        ></textarea>
        {errors?.body && <div style={{ color: '#DC143C' }}>{errors.body.message}</div>}
      </label>
      <label className={classes['form__label__tags']}>
        Tags
        <div className={classes['form__label__tags__buttons']}>
          {tags &&
            tags.map((_, i) => {
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
