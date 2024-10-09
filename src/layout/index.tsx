import { useEffect } from 'react'
import styles from './index.module.less'

import { Layout, Watermark, theme } from 'antd'
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'
import Menu from '@/components/Menu'
import { Outlet } from 'react-router-dom'
import api from '@/api'
import useStore from '@/store'

const { Sider } = Layout

const Lay = () => {
  const { updateUserInfo, collapsed } = useStore()
  useEffect(() => {
    getUserInfo()
  }, [])
  async function getUserInfo() {
    const data = await api.getUserInfo()
    updateUserInfo(data)
  }

  return (
    <Watermark content={'pikachu'}>
      <Layout>
        <Sider collapsed={collapsed}>
          <Menu />
        </Sider>
        <Layout>
          <NavHeader />
          <div className={styles.content}>
            <div className={styles.wrapper}>
              <Outlet />
            </div>
            <NavFooter />
          </div>
        </Layout>
      </Layout>
    </Watermark>
  )
}

export default Lay
