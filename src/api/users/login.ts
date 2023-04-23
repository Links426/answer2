import { post } from '@/api/request'
import { userStore } from '@/stores/userStore'

const useUserStore = userStore()
const { userInfo, isLogin } = storeToRefs(useUserStore)
export const getUserCode = () => {
	return new Promise((resolve) => {
		uni.login({
			success: (res) => {
				resolve(res.code)
			},
			fail: () => {
				resolve(null)
			},
		})
	})
}

export interface ITokenRes {
	code: number
	data: string
	msg: string
}

export const getUserToken = async (code: string) => {
	return await post<ITokenRes>('/login', { code }).then((res) => {
		uni.setStorageSync('TOKEN_KEY', res.data)
		showToast('登陆成功')
		isLogin.value = true
		uni.setStorageSync('isLogin', isLogin.value)
	})
}

export const getUserInfo = async () => {
	return uni.getUserProfile({
		desc: '获取你的昵称、头像、地区及性别',
		success: (res) => {
			userInfo.value = res.userInfo
			console.log(userInfo.value)
		},
	})
}

export const showModal = async (
	title: string = '默认标题',
	content: string = '默认内容'
) => {
	return await new Promise((resolve) => {
		uni.showModal({
			title: title,
			content: content,
			confirmColor: '#4F89BE',
			success(res) {
				resolve(res)
			},
		})
	})
}

type Icon = 'success' | 'loading' | 'error' | 'none' | undefined

export const showToast = (
	title: string,
	icon: Icon = 'success',
	duration: number = 2000
) => {
	uni.showToast({
		title: title,
		icon: icon,
		duration: duration, //持续的时间
	})
}
