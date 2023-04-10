<template>
	<view flex flex-col h-100vh
		><NavSelect :selectOptions="messageNavList" />
		<scroll-view scroll-y="true" class="scroll-content">
			<MessageNotice
				v-for="notice in messageNoticeList"
				:key="notice.id"
				:content="notice.content"
				:teacher="notice.teacher"
				:title="notice.title"
				:time="notice.time"
			/> </scroll-view
	></view>
</template>
<script setup lang="ts">
import NavSelect from '@/components/nav-select.vue'
import MessageNotice from '@/pages/message/components/message-notice.vue'
const messageNavList = [{ id: 0, value: '通知' }]
interface notice {
	id?: number
	title: string
	time: string | Date
	teacher: string | number
	content: string | number
}
const messageNoticeList: notice[] = [
	{
		id: 0,
		title: '发布了新的学习..',
		time: '2023-4-21',
		teacher: '李雨恒',
		content: '机械工程实习-期中 已发布，请在规定时间内完成：12-31 12:30',
	},
	{
		id: 1,
		title: '发布了新的学习..',
		time: '2023-4-21',
		teacher: '李雨恒',
		content: '机械工程实习-期中 已发布，请在规定时间内完成：12-31 12:30',
	},
	{
		id: 1,
		title: '发布了新的学习..',
		time: '2023-4-21',
		teacher: '李雨恒',
		content: '机械工程实习-期中 已发布，请在规定时间内完成：12-31 12:30',
	},
	{
		id: 1,
		title: '发布了新的学习..',
		time: '2023-4-21',
		teacher: '李雨恒',
		content: '机械工程实习-期中 已发布，请在规定时间内完成：12-31 12:30',
	},
	{
		id: 1,
		title: '发布了新的学习..',
		time: '2023-4-21',
		teacher: '李雨恒',
		content: '机械工程实习-期中 已发布，请在规定时间内完成：12-31 12:30',
	},
	{
		id: 1,
		title: '发布了新的学习..',
		time: '2023-4-21',
		teacher: '李雨恒',
		content: '机械工程实习-期中 已发布，请在规定时间内完成：12-31 12:30',
	},
	{
		id: 1,
		title: '发布了新的学习..',
		time: '2023-4-21',
		teacher: '李雨恒',
		content: '机械工程实习-期中 已发布，请在规定时间内完成：12-31 12:30',
	},
	{
		id: 1,
		title: '发布了新的学习..',
		time: '2023-4-21',
		teacher: '李雨恒',
		content: '机械工程实习-期中 已发布，请在规定时间内完成：12-31 12:30',
	},
	{
		id: 1,
		title: '发布了新的学习..',
		time: '2023-4-21',
		teacher: '李雨恒',
		content: '机械工程实习-期中 已发布，请在规定时间内完成：12-31 12:30',
	},
	{
		id: 1,
		title: '发布了新的学习..',
		time: '2023-4-21',
		teacher: '李雨恒',
		content: '机械工程实习-期中 已发布，请在规定时间内完成：12-31 12:30',
	},
]
</script>

<style scoped>
.scroll-content {
	overflow: scroll;
	flex: 1;
}
</style>
