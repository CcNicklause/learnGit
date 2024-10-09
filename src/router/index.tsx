import { Navigate, createBrowserRouter } from 'react-router-dom'
import Welcome from '@/views/welcome'
import Dashboard from '@/views/dashboard'
import Login from '@/views/login/Login'
import Error404 from '@/views/404'
import Error403 from '@/views/403'
import Layout from '@/layout'
import UserList from '@/views/system/user'
import DeptList from '@/views/system/dept'
import Test from '@/views/testEcharts'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/welcome' />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    element: <Layout />,
    children: [
      {
        path: '/test',
        element: <Test />
      },
      {
        path: '/welcome',
        element: <Welcome />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/userList',
        element: <UserList />
      },
      {
        path: '/deptList',
        element: <DeptList />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to='/404' />
  },
  {
    path: '/404',
    element: <Error404 />
  },
  {
    path: '/403',
    element: <Error403 />
  }
])

export default router
