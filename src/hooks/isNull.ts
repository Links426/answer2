export const isNull = (obj: any): boolean => {
	if (!obj) return true
	if (['{}', '[]'].includes(JSON.stringify(obj))) return true
	return false
}
