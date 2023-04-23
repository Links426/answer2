<template>
	<view
		><Option :title="'头像'" :show-arrow="true">
			<template #content
				><div
					class="avatar"
					:style="{
						backgroundImage: 'url(' + userInfo!.avatarURL + ')',
					}"
				></div
			></template>
		</Option>

		<Option :title="'用户名'" :value-type="'input'" v-model="userInfo!.nickName" />
		<Option :title="'姓名'" :value-type="'input'" v-model="userInfo.userName" />
		<Option :title="'学号'" :value-type="'input'" v-model="userInfo.userID" />
		<!-- <Option :title="'班级'" :value-type="'input'" /> -->

		<view flex justify-center
			><NButton :content="'保存'" mt-32rpx @my-click="bandingInfo" /></view
	></view>
</template>
<script setup lang="ts">
import Option from '@/pagesSub/setting/components/setting-option.vue'
import NButton from '@/components/n-button.vue'
import { getBandingUserInfo, showToast } from '@/api/users/login'
import { userStore } from '@/stores/userStore'
import { deepCopy } from '@/hooks/deepClone'
import { back1 } from '@/hooks/toUrl'
const useUserStore = userStore()
const { userInfo } = storeToRefs(useUserStore)

withDefaults(defineProps<{ title: string; showArrow?: boolean }>(), {
	title: '未填写',
	showArrow: true,
})

const bandingInfo = async () => {
	await getBandingUserInfo(deepCopy(userInfo.value))
	await showToast('绑定成功')
	setTimeout(() => {
		back1()
	}, 500)
}
</script>

<style scoped>
.settion-option {
	width: 100%;
	min-height: 82rpx;
	font-size: 28rpx;
	font-weight: 500;
	color: #1d2128;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 24rpx 24rpx 24rpx 48rpx;
	border-top: 2rpx solid rgba(195, 195, 195, 0.17);
}
.icon-qianwang {
	font-size: 42rpx;
	font-weight: 700;
	color: #c6c6c6;
}
.avatar {
	width: 124rpx;
	height: 124rpx;
	border-radius: 50%;
	background-size: contain;
}
</style>
