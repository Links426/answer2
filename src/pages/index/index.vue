<template>
	<view w-full h-100vh flex flex-col>
		<view class="carousel"></view>
		<NavSelect :select-options="indexSelectList" :defaultOption="1" />
		<scroll-view scroll-y="true" class="scroll-content">
			<view w-full pt-32rpx flex flex-col items-center>
				<div v-for="card in courseCardList" :key="card.id">
					<CourseCard
						@to-detail="toCoursePage(card.title, card.id, card.teachClass)"
						:title="card.title"
						:teachClass="card.teachClass"
						:teacher-name="card.teacherName"
						:teacher-avater="card.teacherAvater"
					/>
				</div>
			</view>
		</scroll-view>
	</view>
</template>
<script setup lang="ts">
import NavSelect from '@/components/nav-select.vue'
import CourseCard from './components/index-courseCard.vue'
import { courseStore } from '@/stores/courseStore'
import { indexSelectList } from '@/utils/index/index'
import { to } from '@/hooks/toUrl'
const useCourseStore = courseStore()
const { courseCardList } = storeToRefs(useCourseStore)

const toCoursePage = (title: string, id: number, teachClass: string) => {
	to(`/pagesSub/course/course?id=${id}&title=${title}&teacherClass=${teachClass}`)
}
</script>

<style scoped>
.carousel {
	width: 100%;
	height: 320rpx;
	background-image: url('https://p.ipic.vip/v0144p.jpeg');
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center center;
}
.nav-select {
	display: flex;
	height: 104rpx;
	padding: 36rpx 0 0 28rpx;
	background: #fff;
	border-bottom: 1px solid #e7e9ed;
}
.nav-select-option {
	color: #1d2128;
	padding-bottom: 22rpx;
	font-weight: bold;
	height: 100%;
	border-bottom: 2px solid #4080ff;
}
.scroll-content {
	flex: 1;
	overflow: scroll;
	background-color: #f7f8fa;
}
</style>
