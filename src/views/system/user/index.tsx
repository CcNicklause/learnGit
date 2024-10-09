import { useCallback, useEffect, useRef, useState } from 'react'
import { Button, Form, Input, Modal, Select, Space, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { PageParams, User } from '@/types/api'
import api from '@/api'
import { formatDate } from '@/utils'
import { useForm } from 'antd/es/form/Form'
import CreateUser from './CreateUser'
import { IAction } from '@/types/modal'
import { message } from '@/utils/AntdGlobal'

function UserList() {
  const [form] = useForm()
  const [userIds, setUserIds] = useState<number[]>([])
  const [data, setData] = useState<User.UserItem[]>([])
  const [total, setTotal] = useState(0)
  const userRef = useRef<{
    open: (type: IAction, data?: User.UserItem) => void
  }>()
  const [pagination, setPagination] = useState({
    current: 1, // 当前页码
    pageSize: 10
  })

  // 搜索
  const handleSearch = () => {
    getUserList({
      pageNum: 1
    })
  }

  const handleReset = () => {
    form.resetFields()
  }

  // 获取用户列表
  const getUserList = useCallback(
    async (params: PageParams) => {
      const values = form.getFieldsValue()
      const data = await api.getUserList({
        ...values,
        pageNum: params.pageNum,
        pageSize: params.pageSize || pagination.pageSize
      })

      setData(data.list)
      setTotal(data.page.total)
      setPagination({
        current: data.page.pageNum,
        pageSize: data.page.pageSize
      })
    },
    [form, pagination.pageSize]
  )

  // 创建用户
  const handleCreate = () => {
    userRef.current?.open('create')
  }
  // 编辑用户
  const handleEdit = (record: User.UserItem) => {
    userRef.current?.open('edit', record)
  }

  // 删除用户
  const handleDel = (userId: number) => {
    Modal.confirm({
      title: '删除确认',
      content: <span>确认删除该用户吗？</span>,
      onOk: () => {
        handleUserDelSubmit([userId])
      }
    })
  }

  //批量删除
  const handlePatchConfirm = () => {
    if (userIds.length === 0) {
      message.error('请选择要删除的用户')
      return
    }
    Modal.confirm({
      title: '删除确认',
      content: <span>确认删除该批用户吗？</span>,
      onOk: () => {
        handleUserDelSubmit(userIds)
      }
    })
  }

  // 公共删除用户接口
  const handleUserDelSubmit = async (ids: number[]) => {
    try {
      await api.delUser({
        userIds: ids
      })
      message.success('删除成功')
      setUserIds([])
      getUserList({
        pageNum: 1,
        pageSize: pagination.pageSize
      })
    } catch (err) {
      return
    }
  }

  useEffect(() => {
    getUserList({
      pageNum: pagination.current,
      pageSize: pagination.pageSize
    })
  }, [getUserList])

  const columns: ColumnsType<User.UserItem> = [
    {
      title: '用户ID',
      dataIndex: 'userId',
      key: 'userId'
    },
    {
      title: '用户名称',
      dataIndex: 'userName',
      key: 'userName'
    },
    {
      title: '用户邮箱',
      dataIndex: 'userEmail',
      key: 'userEmail'
    },
    {
      title: '用户角色',
      dataIndex: 'role',
      key: 'role',
      render(role: number) {
        return {
          0: '超级管理员',
          1: '管理员',
          2: '体验管理员',
          3: '普通用户'
        }[role]
      }
    },
    {
      title: '用户状态',
      dataIndex: 'state',
      key: 'state',
      render(state: number) {
        return {
          1: '在职',
          2: '离职',
          3: '试用期'
        }[state]
      }
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render(createTime: string) {
        return formatDate(createTime)
      }
    },
    {
      title: '操作',
      dataIndex: 'createTime',
      key: 'ads',
      render(_, record: User.UserItem) {
        return (
          <Space>
            <Button type='text' onClick={() => handleEdit(record)}>
              编辑
            </Button>
            <Button type='text' danger onClick={() => handleDel(record.userId)}>
              删除
            </Button>
          </Space>
        )
      }
    }
  ]

  return (
    <div className='user-list'>
      <Form className='search-form' layout='inline' form={form} initialValues={{ state: 0 }}>
        <Form.Item name='userId' label='用户ID'>
          <Input placeholder='请输入用户ID' />
        </Form.Item>
        <Form.Item name='userName' label='用户名称'>
          <Input placeholder='请输入用户名称' />
        </Form.Item>
        <Form.Item name='state' label='状态'>
          <Select style={{ width: '120px' }}>
            <Select.Option value={0}>所有</Select.Option>
            <Select.Option value={1}>在职</Select.Option>
            <Select.Option value={2}>离职</Select.Option>
            <Select.Option value={3}>试用期</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type='primary' className='mr10' onClick={handleSearch}>
            搜索
          </Button>
          <Button type='default' onClick={handleReset}>
            重置
          </Button>
        </Form.Item>
      </Form>
      <div className='base-table'>
        <div className='header-wrapper'>
          <div className='title'>用户列表</div>
          <div className='aciton'>
            <Button type='primary' className='mr10' onClick={handleCreate}>
              新增
            </Button>
            <Button type='primary' danger onClick={handlePatchConfirm}>
              批量删除
            </Button>
          </div>
        </div>
        <Table
          bordered
          rowKey='userId'
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys: userIds,
            onChange: (selectedRowKeys: React.Key[]) => {
              setUserIds(selectedRowKeys as number[])
            }
          }}
          columns={columns}
          dataSource={data}
          pagination={{
            position: ['bottomRight'],
            current: pagination.current,
            pageSize: pagination.pageSize,
            total,
            showQuickJumper: true,
            showSizeChanger: true,
            showTotal: function (total) {
              return `总共： ${total} 条`
            },
            onChange: function (page, pageSize) {
              setPagination({
                current: page,
                pageSize
              })
            }
          }}
        />
      </div>
      <CreateUser
        mRef={userRef}
        update={() => {
          getUserList({
            pageNum: 1
          })
        }}
      />
    </div>
  )
}

export default UserList
