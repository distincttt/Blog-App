import { format } from 'date-fns'
import ReactMarkdown from 'react-markdown'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { checkArticle } from '../../../Redux/articleSlice'

import classes from './ArticleSolo.module.scss'
import ArticleSoloButtons from './ArticleSoloButtons'

export default function ArticleSolo({ article }) {
  const {
    author: { username, image },
    title,
    description,
    favoritesCount,
    favorited,
    tagList,
    createdAt,
    body,
    slug,
  } = article

  //Сделать EditArticle полностью

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(checkArticle(slug))
  }, [slug])

  return (
    <div className={classes.article}>
      <div className={classes['article__header']}>
        <div className={classes['article__header__leftSide']}>
          <div className={classes['article__header__leftSide__title']}>
            {title}
            <label className={classes['article__header__leftSide__title__heart-label']}>
              <input type="checkbox" onChange={() => {}} checked={favorited}></input>
              <span className={classes['article__header__leftSide__title__heart-label-checkbox']}></span>
              <span className={classes['article__header__leftSide__title-favoritesCount']}>{favoritesCount}</span>
            </label>
          </div>
          <div className={classes['article__header__leftSide__title__tags']}>
            {tagList.map((tag, i) => {
              return (
                <div className={classes['article__header__leftSide__title__tags-tag']} key={i}>
                  {tag}
                </div>
              )
            })}
          </div>
        </div>
        <div className={classes['article__header__rightSide']}>
          <div className={classes['article__header__rightSide__up']}>
            <div className={classes['article__header__rightSide__up__text']}>
              <span className={classes['article__header__rightSide__up__text-name']}>{username}</span>
              <span className={classes['article__header__rightSide__up__text-date']}>
                {format(new Date(createdAt), 'PP')}
              </span>
            </div>
            <img src={image} className={classes['article__header__rightSide__up-img']}></img>
          </div>
          <ArticleSoloButtons slug={slug} />
        </div>
      </div>
      <div className={classes['article__description']}>{description}</div>
      <div className={classes['article__body']}>
        <ReactMarkdown>{body}</ReactMarkdown>
      </div>
    </div>
  )
}
