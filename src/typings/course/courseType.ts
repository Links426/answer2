export interface ICourse {
	id: number
	title: string
	teachClass: string | object[]
	teacherName: ''
	teacherAvater: string
	courseRecord: ICourseRecord[]
}
interface ICourseRecord {
	id: number | string
	name: string | number
	time: string | number
	members?: number | string[]
	questions?: question[]
}

interface question {
	id: number | string
	title: string
	options: questionOptions[]
}
// type questionAnswer = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'
// id 自增
interface questionOptions {
	id: number
	value: string
}
