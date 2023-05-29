<template>
	<view px-32rpx py-72rpx>
		<view mb-52rpx>
			<AInput
				:title="'课程名'"
				:placeholder="'请输入课程名'"
				v-model="classDetail.courseName"
			></AInput>
		</view>
		<view>
			<view class="mb-36rpx text-40rpx font-bold text-#333">班级</view>
			<view class="uni-list">
				<checkbox-group @change="selCourses">
					<label
						class="uni-list-cell uni-list-cell-pd"
						v-for="(item, key) in coursesList"
						:key="key"
					>
						<view>
							<checkbox :value="item.value" :checked="item.checked" />
						</view>
						<view ml-12rpx>{{ item.name }}</view>
					</label>
				</checkbox-group>
			</view>
		</view>
	</view>
	<view flex justify-center mt-28rpx
		><NButton :content="'添加课程'" @my-click="addCourse"></NButton
	></view>
</template>
<script setup lang="ts">
import AInput from './components/addCourse-input.vue'
import NButton from '@/components/n-button.vue'
import { get, post } from '@/api/request'
import { userStore } from '@/stores/userStore'

const useUserStore = userStore()
const { userInfo } = storeToRefs(useUserStore)
interface IClassDetail {
	academy: string
	class: string[]
	courseName: string
	teaName: string
	teaNum: string
}
const classDetail = ref<IClassDetail>({
	academy: userInfo.value.academy,
	teaNum: userInfo.value.userID + '',
	teaName: userInfo.value.userName,
	courseName: '',
	class: [],
})
const coursesList = ref<Array<{ name: String; value: String; checked: boolean }>>([])

const getClasses = async () => {
	const { data } = (await get<{ code: number; data: Array<String> }>('/api/allclass'))
		.data

	coursesList.value = data.map((item) => {
		return {
			name: item,
			value: item,
			checked: false,
		}
	})
}
const selCourses = (e: any) => {
	classDetail.value.class = e.detail.value
}

const addCourse = async () => {
	await post('/api/course', toRaw(classDetail.value), {
		header: { 'content-type': 'application/json' },
	})
}

onLoad(() => {
	getClasses()
})
</script>

<style scoped>
.addCourse-picker {
	display: flex;
	align-items: center;
	justify-content: center;
	color: #86909c;
	height: 40rpx;
	padding: 24rpx 0;
	border-radius: 8rpx;
	border: 4rpx dotted #86909c;
}
.uni-list-cell {
	display: flex;
	align-items: center;
	padding: 24rpx;
	border-radius: 12rpx;
	background-color: #f8f8f8;
}
</style>
