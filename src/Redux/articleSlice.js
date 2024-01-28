import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit'

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})

const articleSlice = createAppSlice({
  name: 'articles',
  initialState: {
    articles: [],
    loading: false,
    error: false,
    totalArticles: null,
    article: {},
    deleteSuccess: false,
    checkUser: '',
  },
  reducers: (create) => ({
    fetchArticles: create.asyncThunk(
      async (page) => {
        const response = await fetch(
          `https://blog.kata.academy/api/articles?limit=5${page ? `&offset=${(page - 1) * 5}` : ''}`
        )
        const jsonResponse = await response.json()
        return jsonResponse
      },
      {
        pending: (state) => {
          state.loading = true
        },
        fulfilled: (state, action) => {
          state.loading = false
          state.articles = action.payload.articles
        },
        rejected: (state, action) => {
          state.loading = false
          state.error = `${action.error.message}, please wait...`
        },
      }
    ),
    fetchAllArticles: create.asyncThunk(
      async () => {
        const response = await fetch('https://blog.kata.academy/api/articles')
        const jsonResponse = await response.json()
        return jsonResponse.articlesCount
      },
      {
        fulfilled: (state, action) => {
          state.total = action.payload
        },
        rejected: (state, action) => {
          state.error = `${action.error.message}, please wait...`
        },
      }
    ),
    fetchArticleBySlug: create.asyncThunk(
      async (slug) => {
        const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`)
        const jsonResponse = await response.json()
        return jsonResponse
      },
      {
        fulfilled: (state, action) => {
          state.article = action.payload.article
        },
        rejected: (state, action) => {
          state.error = `${action.error.message}, please wait...`
        },
      }
    ),
    deleteArticle: create.asyncThunk(
      async (slug, { rejectWithValue }) => {
        const token = JSON.parse(localStorage.getItem('user')).user.token
        const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
        })
        if (response.ok) return await response.json()
        else
          return rejectWithValue(
            `Could not fetch https://blog.kata.academy/api/articles/${slug}, response status: ${response.status} , please wait...`
          )
      },
      {
        rejected: (state, action) => {
          state.error = action.payload
        },
      }
    ),
    createArticle: create.asyncThunk(
      async (article, { rejectWithValue }) => {
        const token = JSON.parse(localStorage.getItem('user')).user.token
        const response = await fetch('https://blog.kata.academy/api/articles', {
          method: 'POST',
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
          body: article,
        })
        if (response.ok) return await response.json()
        else
          return rejectWithValue(
            `Could not fetch https://blog.kata.academy/api/articles, response status: ${response.status} , please wait...`
          )
      },
      {
        rejected: (state, action) => {
          state.error = action.payload
        },
      }
    ),
    checkArticle: create.asyncThunk(
      async (slug, { rejectWithValue }) => {
        const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
          method: 'GET',
        })
        if (response.ok) {
          let res = await response.json()
          return res.article.author.username
        } else
          return rejectWithValue(
            `Could not fetch https://blog.kata.academy/api/articles, response status: ${response.status} , please wait...`
          )
      },
      {
        fulfilled: (state, action) => {
          if (action.payload === JSON.parse(localStorage.getItem('user'))?.user.username) state.deleteSuccess = true
          else state.deleteSuccess = false
        },
        rejected: (state, action) => {
          state.error = action.payload
        },
      }
    ),
    updateArticle: create.asyncThunk(
      async (articleNew, { rejectWithValue }) => {
        const token = JSON.parse(localStorage.getItem('user')).user.token
        const article = { article: articleNew.article }
        const response = await fetch(`https://blog.kata.academy/api/articles/${articleNew.slug}`, {
          method: 'PUT',
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(article),
        })
        if (response.ok) {
          let res = await response.json()
          return res.article.author.username
        } else
          return rejectWithValue(
            `Could not fetch https://blog.kata.academy/api/articles, response status: ${response.status} , please wait...`
          )
      },
      {
        rejected: (state, action) => {
          state.error = action.payload
        },
      }
    ),
    favoritedArticle: create.asyncThunk(
      async (slug, { rejectWithValue }) => {
        const token = JSON.parse(localStorage.getItem('user')).user.token
        const response = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
          method: 'POST',
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
        })
        if (response.ok) {
          let res = await response.json()
          return res
        } else
          return rejectWithValue(
            `Could not fetch https://blog.kata.academy/api/articles${slug}, response status: ${response.status} , please wait...`
          )
      },
      {
        rejected: (state, action) => {
          state.error = action.payload
        },
      }
    ),
    unfavoritedArticle: create.asyncThunk(
      async (slug, { rejectWithValue }) => {
        const token = JSON.parse(localStorage.getItem('user')).user.token
        const response = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
          method: 'DELETE',
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
        })
        if (response.ok) {
          let res = await response.json()
          return res
        } else
          return rejectWithValue(
            `Could not fetch https://blog.kata.academy/api/articles${slug}, response status: ${response.status} , please wait...`
          )
      },
      {
        rejected: (state, action) => {
          state.error = action.payload
        },
      }
    ),
  }),
})

export const {
  fetchArticles,
  fetchAllArticles,
  fetchArticleBySlug,
  deleteArticle,
  createArticle,
  checkArticle,
  updateArticle,
  favoritedArticle,
  unfavoritedArticle,
} = articleSlice.actions

export default articleSlice.reducer
