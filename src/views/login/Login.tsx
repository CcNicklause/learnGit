import { App, Button, Form, Input } from 'antd'
import styles from './index.module.less'
import api from '@/api'
import { Login } from '@/types/api'
import storage from '@/utils/storage'
import { useState } from 'react'
import useStore from '@/store'

function LoginFC() {
  const [loading, setLoading] = useState(false)
  const updateToken = useStore(state => state.updateToken)
  const { message } = App.useApp()

  const onFinish = async (values: Login.params) => {
    try {
      setLoading(true)
      const data = await api.login(values)
      setLoading(false)
      storage.set('token', data)
      updateToken(data)
      message.success('登录成功')
      // 登录成功后 跳转到上次页面
      const params = new URLSearchParams(location.search)
      setTimeout(() => {
        location.href = params.get('callback') || '/welcome'
      })
    } catch (error) {
      setLoading(false)
    }
  }
  return (
    <div className={styles.login}>
      <div className={styles.loginWrapper}>
        <div className={styles.title}>系统登录</div>
        <Form
          name='basic'
          style={{ maxWidth: 600 }}
          initialValues={{ userName: '921637276', userPwd: '270229' }}
          onFinish={onFinish}
          autoComplete='off'
        >
          <Form.Item name='userName' rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input placeholder='用户名' autoComplete='true' />
          </Form.Item>

          <Form.Item name='userPwd' rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password placeholder='密码' />
          </Form.Item>

          <Form.Item>
            <Button type='primary' block loading={loading} htmlType='submit'>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default LoginFC
