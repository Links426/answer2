

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
