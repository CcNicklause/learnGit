import { useState } from 'react'
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  SettingOutlined,
  TeamOutlined
} from '@ant-design/icons'
import { Button, Menu } from 'antd'
import type { MenuProps } from 'antd'
import styles from './index.module.less'
import { useNavigate } from 'react-router-dom'
import useStore from '@/store'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem
}

const SideMenu = () => {
  const collapsed = useStore(state => state.collapsed)
  const navigate = useNavigate()

  const items: MenuItem[] = [
    {
      label: '工作台',
      key: '1',
      icon: <DesktopOutlined />
    },
    {
      label: '系统管理',
      key: '2',
      icon: <SettingOutlined />,
      children: [
        {
          label: '用户管理',
          key: '3',
          icon: <TeamOutlined />
        },
        {
          label: '部门管理',
          key: '4',
          icon: <TeamOutlined />
        }
      ]
    }
  ]

  const handleClickLogo = () => {
    navigate('/welcome')
  }
  return (
    <div>
      <div className={styles.logo} onClick={handleClickLogo}>
        <img src='/imgs/logo.png' className={styles.img} />
        {collapsed ? '' : <span>么么速递</span>}
      </div>
      <Menu
        defaultSelectedKeys={['1']}
        mode='inline'
        theme='dark'
        style={{
          width: collapsed ? 80 : 'auto'
        }}
        items={items}
      />
    </div>
  )
}

export default SideMenu
