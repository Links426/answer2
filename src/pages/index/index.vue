<template>
	<view w-full h-100vh flex flex-col>
		<view class="carousel"></view>
		<NavSelect :select-options="indexSelectList" :defaultOption="1" />
		<scroll-view scroll-y="true" class="scroll-content">
			<view w-full pt-32rpx flex flex-col items-center>
				<div>
					<!-- 		<div v-for="card in courseCardList" :key="card.id">
						<CourseCard
							@to-detail="toCoursePage(card.title, card.id, card.teachClass)"
							:title="card.title"
							:teachClass="card.teachClass"
							:teacher-name="card.teacherName"
							:teacher-avater="card.teacherAvater"
						/>
					</div> -->

					<NButton :content="'没有课程？立即添加'" @my-click="addClass"></NButton>
				</div>
			</view>
		</scroll-view>
	</view>
</template>
<script setup lang="ts">
import NavSelect from '@/components/nav-select.vue'
import NButton from '@/components/n-button.vue'
import CourseCard from './components/index-courseCard.vue'
import { courseStore } from '@/stores/courseStore'
import { userStore } from '@/stores/userStore'
import { indexSelectList } from '@/utils/index/index'
import { to } from '@/hooks/toUrl'
import { post } from '@/api/request'
const useCourseStore = courseStore()
const { courseCardList } = storeToRefs(useCourseStore)

const useUserStore = userStore()
const { userInfo } = storeToRefs(useUserStore)

const addClass = async () => {
	// return await post('/api/course', courseDetail.value)
	return to('/pagesSub/course/addCourse')
}

onLoad(() => {
	const info = uni.getStorageSync('USER_INFO')
	if (info) {
		userInfo.value = info
	}
})
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
