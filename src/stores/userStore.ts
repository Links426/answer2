import { defineStore } from 'pinia'

export interface IUserInfo {
	nickName: string
	openID: string
	avatarURL: string
	userID: number | string
	name: string
}

// 使用setup模式定义
export const userStore = defineStore('user', () => {
	const isLogin = ref(false)
	const userInfo = ref<IUserInfo>({
		nickName: '',
		openID: '',
		avatarURL: '',
		userID: '',
		name: '',
	})
	return { isLogin, userInfo }
})
