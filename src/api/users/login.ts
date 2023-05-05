import { post } from '@/api/request'
import { isNull } from '@/hooks/isNull'
import { IUserInfo, userStore } from '@/stores/userStore'

const useUserStore = userStore()
const { userInfo, isBinding } = storeToRefs(useUserStore)
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
	openID: string
	userInfo: Array<IUserInfo> | null
}

export const getUserToken = async (code: string) => {
	return await post<ITokenRes>('/login', { code }).then(async (res) => {
		uni.setStorageSync('TOKEN_KEY', res.data.data)
		userInfo.value.openID = res.data.openID
		if (isNull(res.data.userInfo)) {
			isBinding.value = false
			await showModal('请完善信息', '完善信息以登陆').then(async (res: any) => {
				if (res.confirm) {
					uni.navigateTo({ url: '/pagesSub/mineSub/mineSub-setInfo' })
				}
			})
			isBinding.value = true
		} else {
			isBinding.value = true
			userInfo.value = res.data.userInfo![0]
		}

		uni.setStorageSync('USER_INFO', userInfo.value)
		/* 	if (isNull(res.data.userInfo)) {
			userInfo.value.openID = res.data.openID
		} else {
			userInfo.value = res.data.userInfo![0]
		}
 */
		// showToast('登陆成功')
		// isLogin.value = true
		// uni.setStorageSync('isLogin', isLogin.value)
		/* uni.setStorageSync('USER_INFO', userInfo.value) */
	})
}

export const getUserInfo = async () => {
	return uni.getUserProfile({
		desc: '获取你的昵称、头像、地区及性别',
		success: (res) => {
			userInfo.value.avatarURL = res.userInfo.avatarUrl
			userInfo.value.nickName = res.userInfo.nickName
		},
	})
}

export const getBandingUserInfo = async (info: IUserInfo) => {
	return await post('/api/BindUserInfos', info)
}

export const postUploadAvatar = async (url: string) => {}

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

export const showToast = async (
	title: string,
	duration: number = 2000,
	icon: Icon = 'success'
) => {
	uni.showToast({
		title: title,
		icon: icon,
		duration: duration, //持续的时间
	})
}
