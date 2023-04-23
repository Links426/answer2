import { defineStore } from 'pinia'

export interface IUserInfo {
	academy: string
	avatarURL: string
	class: string
	major: string
	nickName: string
	openID: string
	phone: string
	role: string
	userID: number | string
	userName: string
}

// 使用setup模式定义
export const userStore = defineStore('user', () => {
	const isLogin = ref(false)
	const isBinding = ref(false)
	const userInfo = ref<IUserInfo>({
		academy: '',

		avatarURL: '',
		class: '',
		major: '',
		nickName: '未知用户',
		openID: '',
		phone: '',
		role: '',
		userID: '',
		userName: '',
	})
	return { isLogin, userInfo }
})
