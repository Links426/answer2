// 定义一个泛型函数，接受任意类型的参数
export function deepCopy<T>(instance: T): T {
	// 如果参数是null或undefined，直接返回
	if (instance == null) {
		return instance
	}
	// 如果参数是Date类型，返回一个新的Date对象
	if (instance instanceof Date) {
		return new Date(instance.getTime()) as any
	}
	// 如果参数是数组类型，遍历数组并递归调用深拷贝函数
	if (instance instanceof Array) {
		var cloneArr = [] as any[]
		;(instance as any[]).forEach((value) => {
			cloneArr.push(value)
		})
		// 返回一个新的数组，每个元素都是深拷贝后的结果
		return cloneArr.map((value: any) => deepCopy<any>(value)) as any
	}
	// 如果参数是对象类型，遍历对象的属性并递归调用深拷贝函数
	if (instance instanceof Object) {
		var copyInstance = { ...(instance as { [key: string]: any }) } as {
			[key: string]: any
		}
		for (var attr in instance) {
			if ((instance as Object).hasOwnProperty(attr))
				copyInstance[attr] = deepCopy<any>(instance[attr])
		}
		// 返回一个新的对象，每个属性都是深拷贝后的结果
		return copyInstance as T
	}
	// 如果参数是基本类型，直接返回
	return instance
}
