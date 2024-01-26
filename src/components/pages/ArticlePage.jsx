import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

import { fetchArticleBySlug } from '../../Redux/articleSlice'
import ArticleSolo from '../Articles/ArticleSolo/ArticleSolo'
import Header from '../Header/Header'
import HeaderAuthorised from '../HeaderAuthorised/HeaderAuthorised'
import useAuth from '../../hoc/useAuth'

export default function ArticlePage() {
  const { article } = useSelector((state) => state.articleSlice)
  const { slug } = useParams()
  const authorized = useAuth()

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchArticleBySlug(slug))
  }, [])
  return (
    <>
      {authorized ? <HeaderAuthorised /> : <Header />}
      {Object.keys(article).length && <ArticleSolo article={article} />}
    </>
  )
}
