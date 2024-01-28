import { Button, ConfigProvider, Popconfirm, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { deleteArticle } from '../../../Redux/articleSlice'

import classes from './ArticleSolo.module.scss'

export default function ArticleSoloButtons({ slug }) {
  const { deleteSuccess } = useSelector((state) => state.articleSlice)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const confirm = async () => {
    message.success('Click on Yes')
    await dispatch(deleteArticle(slug))
    navigate(-1)
  }
  const cancel = () => {
    message.error('Click on No')
  }

  return (
    <>
      {deleteSuccess && (
        <div className={classes['article__header__rightSide__buttons']}>
          <ConfigProvider
            theme={{
              token: { fontSize: 14 },
            }}
          >
            <Popconfirm
              title="Delete the article"
              description="Are you sure to delete this article?"
              onConfirm={confirm}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
              style={{ fontSize: '16' }}
            >
              <Button className={classes['article__header__rightSide__buttons-button']} danger>
                Delete
              </Button>
            </Popconfirm>
          </ConfigProvider>
          <Link to="edit">
            <Button className={classes['article__header__rightSide__buttons-button']} style={{ fontSize: '16' }}>
              Edit
            </Button>
          </Link>
        </div>
      )}
    </>
  )
}
