import { reactive } from 'vue'
import { defineStore } from 'pinia'

// 使用setup模式定义
export const courseStore = defineStore('course', () => {
	const courseTitle = ref('')
	const courseCardList = reactive([
		{
			id: 36216312,
			title: '机械工程专业实习',
			teachClass: '机械213',
			teacherName: '李雨恒',
			teacherAvater: 'https://p.ipic.vip/fxie8j.png',
		},
		{
			id: 362163123123,
			title: '集成电路',
			teachClass: '机械213',
			teacherName: '李雨恒',
			teacherAvater: 'https://p.ipic.vip/y8soqt.png',
		},
		{
			id: 321749812478912,
			title: '网络工程',
			teachClass: '机械213',
			teacherName: '李雨恒',
			teacherAvater: 'https://p.ipic.vip/q4hlqh.png',
		},
	])
	return { courseTitle, courseCardList }
})
