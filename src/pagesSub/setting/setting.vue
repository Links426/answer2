<template>
	<view
		><Option :title="'头像'">
			<template #content
				><button
					class="avatarButton"
					:style="{ backgroundImage: 'url(' + avatarUrl + ')' }"
				></button
			></template>
		</Option>

		<Option :title="'用户名'" :value-type="'input'" v-model="userInfo!.nickName" />
		<Option :title="'姓名'" :value-type="'input'" v-model="userInfo.userName" />
		<Option :title="'学号'" :value-type="'input'" v-model="userInfo.userID" />
		<Option :title="'学院'" :value-type="'input'" v-model="userInfo.academy" />
		<Option :title="'班级'" :value-type="'input'" v-model="userInfo.class" />
	</view>
</template>
<script setup lang="ts">
import Option from '@/pagesSub/setting/components/setting-option.vue'

import { userStore } from '@/stores/userStore'

const useUserStore = userStore()
const { userInfo } = storeToRefs(useUserStore)
const avatarUrl = ref(userInfo.value.avatarURL)

withDefaults(defineProps<{ title: string; showArrow?: boolean }>(), {
	title: '未填写',
	showArrow: true,
})
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

.avatarButton {
	width: 124rpx;
	height: 124rpx;
	border-radius: 50%;
	display: flex;
	color: white;
	justify-content: center;
	align-items: center;
	background-color: #c9cdd4;
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center center;
}
.icon-paizhao {
	font-size: 68rpx;
}
</style>
