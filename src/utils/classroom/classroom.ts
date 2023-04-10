export enum ClassroomPage {
	ALL,
	QUESTIONS,
	EXAM,
}
export const selectClassroomOptions = [
	{ id: ClassroomPage.ALL, value: '全部' },
	{ id: ClassroomPage.QUESTIONS, value: '习题' },
	{ id: ClassroomPage.EXAM, value: '试卷' },
]
