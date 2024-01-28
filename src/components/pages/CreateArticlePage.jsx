import HeaderAuthorised from '../HeaderAuthorised/HeaderAuthorised'
import CreateEditArticle from '../Articles/CreateEditArticle/CreateEditArticle'
import { createArticle } from '../../Redux/articleSlice'

export default function CreateArticlePage() {
  return (
    <>
      <HeaderAuthorised />
      <CreateEditArticle pageEditArticle={false} createArticle={createArticle} handleChange={() => {}} />
    </>
  )
}
