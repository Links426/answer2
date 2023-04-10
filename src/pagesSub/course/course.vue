<template>
	<view class="course-title">{{ courseDetail.title }}</view>
	<view pt-32rpx>
		<view pl-44rpx font-bold text-40rpx mb-20rpx>学习日志</view>
		<NavSelect
			:select-options="courseSelectOptions"
			:default-option="coursePageSelected"
			@my-click="changePageSelect"
		/>
		<view px-48rpx pt-40rpx>
			<view v-show="coursePageSelected === coursePage.CourseRoute">
				<CourseRoute
					v-for="route in courseDetail.courseRecord"
					:key="route.id"
					:id="route.id"
					:time="route.time"
					:name="route.name"
				/>
			</view>
			<img
				src="@/static/imgs/course/empty.svg"
				v-show="coursePageSelected !== coursePage.CourseRoute"
			/>
		</view>
	</view>
</template>
<script setup lang="ts">
import NavSelect from '@/components/nav-select.vue'
import CourseRoute from '@/pagesSub/course/components/course-route.vue'

import { coursePage, courseSelectOptions } from '@/utils/course/course'
import { ICourse } from '@/typings/course/courseType'

const coursePageSelected = ref(coursePage.CourseRoute)

const changePageSelect = (id: number) => {
	coursePageSelected.value = id
}

const courseDetail = ref<ICourse>({
	id: 0,
	title: '',
	teachClass: '',
	teacherName: '',
	teacherAvater: '',
	courseRecord: [
		{
			id: 0,
			name: '第一周第一大节',
			time: 1681091794564,
			members: [],
			questions: [
				{
					id: 123,
					title: '请你说出Vue中的Diff算法是什么样子的?',
					options: [
						{
							id: 0,
							value:
								'diff 算法是一种通过同层的树节点进行比较的高效算法，避免了对树进行逐层搜索遍历，所以时间复杂度只有 O(n)。',
						},
						{
							id: 1,
							value:
								'vue 的虚拟 dom 渲染真实 dom 的过程中首先会对新老 VNode 的开始和结束位置进行标记:oldStartIdx、oldEndIdx、newStartIdx、newEndIdx。',
						},
						{
							id: 2,
							value:
								'标记好节点位置之后，就开始进入到的 while 循环处理中，这里是 diff 算法的核心流程，分情况进行了新老节点的比较并移动对应的 VNode 节点。while 循环的退出条件是直到老节点或者新节点的开始位置大于结束位置。',
						},
						{
							id: 3,
							value:
								'当老 VNode 节点的 start 和新 VNode 节点的 end 满足 sameVnode 时，这说明这次数据更新后 oldStartVnode 已经跑到了 oldEndVnode 后面去了。',
						},
					],
				},
			],
		},
		{ id: 1, name: '第一周第一大节', time: 1681091794564, members: [], questions: [] },
	],
})
onLoad((options: any) => {
	// courseDetail.value.id = options.id
	// todos 后续更换上方
	Object.keys(courseDetail.value).forEach((key) => {
		courseDetail.value[key] = options[key] || courseDetail.value[key]
	})
	uni.setNavigationBarTitle({
		title: options.title,
	})
})
</script>

<style scoped>
.course-title {
	font-weight: bold;
	font-size: 40rpx;
	padding: 40rpx 28rpx;
	border: 1px solid #e4e6eb;
}
</style>
