export const to = (url: string) => {
	return uni.navigateTo({ url: url })
}

export const back1 = () => {
	return uni.navigateBack({ delta: 1 })
}
