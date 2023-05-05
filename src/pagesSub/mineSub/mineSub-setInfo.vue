<template>
	<view class="bg-#F7F8FA flex flex-col items-center pt-88rpx h-100vh">
		<button
			class="avatarButton mb-60rpx"
			:style="{ backgroundImage: 'url(' + userInfo.avatarURL + ')' }"
			open-type="chooseAvatar"
			@chooseavatar="onChooseAvatar"
		>
			<i class="iconfont icon-paizhao"></i>
		</button>

		<input
			type="nickname"
			class="nickNameInput mb-30rpx"
			placeholder="请输入昵称"
			v-model="userInfo.nickName"
		/>
		<input
			class="nickNameInput mb-80rpx"
			placeholder="请输入姓名"
			v-model="userInfo.userName"
		/>
		<input
			class="nickNameInput mb-80rpx"
			placeholder="请输入学号"
			v-model="userInfo.userID"
		/>

		<NButton :content="'保存'" @my-click="bandingInfo"></NButton>
	</view>
</template>
<script setup lang="ts">
import {
	getBandingUserInfo,
	getUserCode,
	getUserToken,
	showToast,
} from '@/api/users/login'
import NButton from '@/components/n-button.vue'
import { deepCopy } from '@/hooks/deepClone'
import { back1 } from '@/hooks/toUrl'

import { userStore } from '@/stores/userStore'

const useUserStore = userStore()
const { userInfo } = storeToRefs(useUserStore)

const onChooseAvatar = (e: { detail: any }) => {
	uni.uploadFile({
		url: 'http://193.112.177.42:32323/Upload',
		filePath: e.detail.avatarUrl,
		name: 'image',
		header: { 'Content-Type': 'multipart/form-data' },
		success: (res: any) => {
			userInfo.value.avatarURL = JSON.parse(res.data).data.image_url
		},
	})
}
const bandingInfo = async () => {
	await getBandingUserInfo(deepCopy(userInfo.value))
	await showToast('绑定成功')
	setTimeout(() => {
		back1()
	}, 500)
}
const userLogin = async () => {
	const code = (await getUserCode()) as string
	if (code) {
		await getUserToken(code)
	}
}
onLoad(async () => {
	userLogin()
})
</script>

<style scoped>
.icon-paizhao {
	font-size: 88rpx;
}
.avatarButton {
	width: 200rpx;
	height: 200rpx;
	border-radius: 50%;
	display: flex;
	color: white;
	justify-content: center;
	align-items: center;
	background-color: #c9cdd4;
	background-size: contain;
}
.nickNameInput {
	width: 658rpx;
	height: 100rpx;
	background: white;
	border-radius: 26rpx;
	padding-left: 36rpx;
	box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(115, 110, 233, 0.06);
}
</style>
