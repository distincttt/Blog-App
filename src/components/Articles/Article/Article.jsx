import { Link } from 'react-router-dom'
import { format } from 'date-fns'

import classes from './Article.module.scss'

export default function Article({ article }) {
  let {
    author: { username, image },
    title,
    description,
    favoritesCount,
    favorited,
    tagList,
    createdAt,
    slug,
  } = article

  const textSplice = (text, maxLength) => {
    if (text) {
      if (text.length < maxLength) return text
      else {
        text = text.slice(0, maxLength)
        return `${text} ...`
      }
    }
  }

  if (tagList.length > 15) tagList = tagList.slice(0, 15)

  return (
    <div className={classes.article}>
      <div className={classes['article__header']}>
        <div className={classes['article__header__leftSide']}>
          <div className={classes['article__header__leftSide__title']}>
            <Link to={`article/${slug}`}>{textSplice(title, 80)}</Link>
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
          <div className={classes['article__header__rightSide__text']}>
            <span className={classes['article__header__rightSide__text-name']}>{username}</span>
            <span className={classes['article__header__rightSide__text-date']}>
              {format(new Date(createdAt), 'PP')}
            </span>
          </div>
          <img src={image} className={classes['article__header__rightSide-img']}></img>
        </div>
      </div>
      <div className={classes['article__description']}>{textSplice(description, 270)}</div>
    </div>
  )
}
