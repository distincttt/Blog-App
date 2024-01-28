import useAuth from '../../hoc/useAuth'
import Header from '../Header/Header'
import HeaderAuthorised from '../HeaderAuthorised/HeaderAuthorised'
import Main from '../Main/Main'

export default function Homepage() {
  const authorized = useAuth()
  return (
    <>
      {authorized ? <HeaderAuthorised /> : <Header />}
      <Main />
    </>
  )
}
