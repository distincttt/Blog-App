import { ConfigProvider } from 'antd'
import { Routes, Route } from 'react-router-dom'

import HomePage from '../pages/HomePage'
import ArticlePage from '../pages/ArticlePage'
import SignUpPage from '../pages/SignUpPage'
import SignInPage from '../pages/SignInPage'
import ProfilePage from '../pages/ProfilePage'
import RequireAuth from '../../hoc/RequireAuth'
import CreateArticlePage from '../pages/CreateArticlePage'
import EditArticlePage from '../pages/EditArticlePage'
import { AuthProvider } from '../../hoc/AuthProvider'

import './App.module.scss'

export default function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimaryActive: '#228B22',
          colorPrimaryHover: '#2E8B57',
          colorPrimary: '#228B22',
          colorBorder: '#32CD32',
          colorText: '#32CD32',
          fontSize: '24px',
        },
      }}
    >
      <AuthProvider>
        <Routes>
          <Route path="/">
            <Route index element={<HomePage />} />
            <Route path="article/:slug" element={<ArticlePage />} />
            <Route path="sign-up" element={<SignUpPage />} />
            <Route path="sign-in" element={<SignInPage />} />
            <Route
              path="profile"
              element={
                <RequireAuth>
                  <ProfilePage />
                </RequireAuth>
              }
            />
            <Route
              path="new-article"
              element={
                <RequireAuth>
                  <CreateArticlePage />
                </RequireAuth>
              }
            />
            <Route path="article/:slug/edit" element={<EditArticlePage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </ConfigProvider>
  )
}
