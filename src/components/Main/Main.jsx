import { Pagination } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { fetchArticles, fetchAllArticles } from '../../Redux/articleSlice'
import ListArticles from '../Articles/ListArticles/ListArticles'

import classes from './Main.module.scss'

export default function Main() {
  const { total } = useSelector((state) => state.articleSlice)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchArticles())
    dispatch(fetchAllArticles())
  }, [])

  return (
    <main className={classes.main}>
      <ListArticles />
      <Pagination
        defaultCurrent={1}
        total={total}
        defaultPageSize={5}
        showSizeChanger={false}
        onChange={(page) => dispatch(fetchArticles(page))}
        style={{ paddingBottom: '30' }}
      />
    </main>
  )
}
