import { create } from 'zustand'
import { User } from '@/types/api'

interface BearState {
  token: string
  userInfo: User.UserItem
  collapsed: boolean
  updateToken: (token: string) => void
  updateUserInfo: (userInfo: User.UserItem) => void
  updateCollapsed: () => void
}

const useStore = create<BearState>(set => ({
  token: '',
  userInfo: {
    _id: '',
    userId: 0,
    userName: '',
    userEmail: '',
    deptId: '',
    state: 0,
    mobile: '',
    job: '',
    role: 0,
    roleList: '',
    createId: 0,
    deptName: '',
    userImg: ''
  },
  collapsed: false,
  updateToken: token => set({ token }),
  updateUserInfo: userInfo =>
    set({
      userInfo
    }),
  updateCollapsed: () => {
    set(state => {
      return {
        collapsed: !state.collapsed
      }
    })
  }
}))

export default useStore
