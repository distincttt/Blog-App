import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { fetchArticleBySlug } from '../../Redux/articleSlice'
import Header from '../Header/Header'
import HeaderAuthorised from '../HeaderAuthorised/HeaderAuthorised'
import useAuth from '../../hoc/useAuth'
import Article from '../Articles/Article/Article'
import classes from '../Articles/ArticleSolo/ArticleSolo.module.scss'

export default function ArticlePage() {
  const { article } = useSelector((state) => state.articleSlice)
  const { body } = article
  const { slug } = useParams()
  const authorized = useAuth()
  let [awaitSLug, setAwaitSLug] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchArticleBySlug(slug))
  }, [])
  useEffect(() => {
    return () => setAwaitSLug(true)
  }, [article])
  return (
    <>
      {authorized ? <HeaderAuthorised /> : <Header />}
      {awaitSLug && <Article article={article} classes={classes} pageArticleSolo={true} body={body} />}
    </>
  )
}
