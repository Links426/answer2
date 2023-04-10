<template>
	<view h-100vh flex flex-col>
		<NavSelect
			:default-option="ClassroomPage.ALL"
			:select-options="selectClassroomOptions"
			@my-click="toClassroomPage"
		/>
		<scroll-view scroll-y class="flex-1 p-32rpx bg-#F7F8FA">
			<ClassroomQuestion
				v-show="
					selectClassroomId === ClassroomPage.ALL ||
					selectClassroomId === ClassroomPage.QUESTIONS
				"
			/>
			<img
				v-show="selectClassroomId === ClassroomPage.EXAM"
				src="@/static/imgs/course/empty.svg"
			/>
		</scroll-view>
	</view>
</template>
<script setup lang="ts">
import NavSelect from '@/components/nav-select.vue'
import ClassroomQuestion from '@/pagesSub/classroom/components/classroom-question.vue'
import { ClassroomPage, selectClassroomOptions } from '@/utils/classroom/classroom'

const selectClassroomId = ref(ClassroomPage.ALL)

const toClassroomPage = (id: number) => {
	selectClassroomId.value = id
}

onLoad((options: any) => {
	uni.setNavigationBarTitle({
		title: options.name,
	})
})
</script>

<style scoped></style>
