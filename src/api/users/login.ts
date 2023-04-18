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

export const getProfile = (): Promise<UniApp.GetUserProfileRes> => {
	return new Promise((resolve, reject) => {
		uni.getUserProfile({
			desc: '你的授权信息',
			success: (res) => {
				resolve(res)
				showToast('登陆成功')
			},
			fail: (err) => {
				console.log(err)
				reject(null)
			},
		})
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
