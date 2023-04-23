import { SrvRecord } from 'dns'
import { defineStore } from 'pinia'

// 使用setup模式定义
export const userStore = defineStore('user', () => {
	const isLogin = ref(false)
	const userInfo = ref<UniApp.UserInfo>()
	return { isLogin, userInfo }
})
