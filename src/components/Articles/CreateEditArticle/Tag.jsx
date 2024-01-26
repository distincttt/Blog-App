import { Button } from 'antd'

import classes from './CreateArticle.module.scss'

export default function Tag({ tags, setTags, id }) {
  const handleChange = (i, e) => {
    setTags([...tags.slice(0, i), e.target.value, ...tags.slice(i + 1)])
  }
  const deleteTag = (i) => {
    setTags([...tags.slice(0, i), ...tags.slice(i + 1)])
  }

  return (
    <div className={classes['form__label__tags__input-danger']}>
      <input
        className={classes['form__label__tags__buttons-input']}
        type="text"
        placeholder="Tag"
        value={tags[id]}
        onChange={(e) => handleChange(id, e)}
      ></input>
      <Button className={classes['form__label__tags__buttons-button']} danger onClick={() => deleteTag(id)}>
        Delete
      </Button>
    </div>
  )
}
