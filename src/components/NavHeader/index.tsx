import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { Breadcrumb, Dropdown, Switch } from 'antd'
import type { MenuProps } from 'antd'
import styles from './index.module.less'
import useStore from '@/store'
import storage from '@/utils/storage'

// 顶部导航栏
const NavHeader = () => {
  const { userName, userEmail } = useStore(state => state.userInfo)
  const collapsed = useStore(state => state.collapsed)
  const updateCollapsed = useStore(state => state.updateCollapsed)

  // 面包屑list
  const breadList = [
    {
      title: '首页'
    },
    {
      title: '工作台'
    }
  ]

  // 下拉菜单item
  const items: MenuProps['items'] = [
    {
      label: `邮箱: ${userEmail}`,
      key: 'email'
    },
    {
      label: '退出',
      key: 'logout'
    }
  ]
  // 进行类型定义
  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'logout') {
      storage.remove('token')
      location.href = '/login?callback=' + encodeURIComponent(location.href)
      // 登陆后 返回原先所在页面
    }
  }

  // 控制菜单图标关闭和展开
  const toggleCollapsed = () => {
    updateCollapsed()
  }
  return (
    <div className={styles.navHeader}>
      <div className={styles.left}>
        <div onClick={toggleCollapsed}>{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}</div>
        <Breadcrumb style={{ paddingLeft: 10 }} items={breadList} />
      </div>
      <div className='right'>
        <Switch checkedChildren='暗黑' unCheckedChildren='默认' />
        {/* menu 绑定下拉框退出事件 */}
        <Dropdown menu={{ items, onClick }} trigger={['click']}>
          <span className={styles.nickName}>{userName}</span>
        </Dropdown>
      </div>
    </div>
  )
}

export default NavHeader
