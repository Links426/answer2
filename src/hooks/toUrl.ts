export const to = (url: string) => {
	return uni.navigateTo({ url: url })
}

export const back1 = async () => {
	return uni.navigateBack({ delta: 1 })
}
