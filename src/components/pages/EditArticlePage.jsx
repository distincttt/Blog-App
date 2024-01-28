import { useSelector } from 'react-redux'
import { useState } from 'react'

import HeaderAuthorised from '../HeaderAuthorised/HeaderAuthorised'
import CreateEditArticle from '../Articles/CreateEditArticle/CreateEditArticle'
import { updateArticle } from '../../Redux/articleSlice'

export default function EditArticlePage() {
  const { article } = useSelector((state) => state.articleSlice)
  const [articleNew, setArticleNew] = useState(article)
  const handleChange = (e, input) => {
    if (input === 'title') setArticleNew({ ...articleNew, title: e.target.value })
    if (input === 'description') setArticleNew({ ...articleNew, description: e.target.value })
    if (input === 'body') setArticleNew({ ...articleNew, body: e.target.value })
  }
  return (
    <>
      <HeaderAuthorised />
      <CreateEditArticle
        pageEditArticle={true}
        handleChange={handleChange}
        article={article}
        articleNew={articleNew}
        updateArticle={updateArticle}
      />
    </>
  )
}
