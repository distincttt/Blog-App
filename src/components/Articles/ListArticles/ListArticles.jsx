import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import Article from '../Article/Article'

import classes from './ListArticles.module.scss'

export default function ListArticles({ articles, loading, error }) {
  return (
    <div className={classes.listArticles}>
      {loading && <Spin style={{ marginTop: '20%' }} indicator={<LoadingOutlined style={{ fontSize: 200 }} spin />} />}
      {Boolean(!error) &&
        !loading &&
        articles.map((article, i) => {
          return <Article key={i} article={article} />
        })}
      {Boolean(error) && <span className={classes.error}>{error}</span>}
    </div>
  )
}
