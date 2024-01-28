import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import classesArticle from '../Article/Article.module.scss'
import Article from '../Article/Article'

import classes from './ListArticles.module.scss'

export default function ListArticles() {
  let { articles, loading, error } = useSelector((state) => state.articleSlice)
  const textSplice = (text, maxLength) => {
    if (text) {
      if (text.length < maxLength) return text
      else {
        text = text.slice(0, maxLength)
        return `${text} ...`
      }
    }
  }
  return (
    <div className={classes.listArticles}>
      {loading && <Spin style={{ marginTop: '20%' }} indicator={<LoadingOutlined style={{ fontSize: 200 }} spin />} />}
      {Boolean(!error) &&
        !loading &&
        articles.map((article, i) => {
          let { tagList } = article
          if (tagList.length > 15) tagList = tagList.slice(0, 15)
          article = { ...article, tagList }
          return (
            <Article
              key={i}
              article={article}
              classes={classesArticle}
              pageArticleSolo={false}
              Link={Link}
              textSplice={textSplice}
            />
          )
        })}
      {Boolean(error) && <span className={classes.error}>{error}</span>}
    </div>
  )
}
