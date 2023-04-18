import BaseRequestConfig from '@/config/config'

type RequestData<T> = {
	methodType?: 'GET' | 'POST'
	data?: T
	url: string
}

type RequestConfig = {
	port?: string
	baseUrl?: string
	prefix?: string
	header?: any
	loading?: boolean
	dataType?: string
}

type RequestReturnData<T> = {
	code: 200 | 500 | number
	data: T
}

type Request = <T extends AnyObject, R extends AnyObject = AnyObject>(
	data: RequestData<T>,
	config?: RequestConfig
) => Promise<RequestReturnData<R>>

export const TOKEN_KEY = 'USER-TOKEN'

export const RequestMethod: Request = (
	{ methodType = 'GET', data = {}, url = '' },
	{
		baseUrl = BaseRequestConfig.baseUrl,
		port = BaseRequestConfig.port,
		prefix = BaseRequestConfig.prefix,
		header = {},
		loading = true,
		dataType = 'json',
	} = {}
) => {
	const token = uni.getStorageSync(TOKEN_KEY)
	if (token) {
		header.Authorization = token
	}
	console.log('request', {
		methodType,
		data,
		url: `${baseUrl}:${port}${prefix}${url}`,
	})
	return new Promise((resolve, reject) => {
		const requestClose = uni.request({
			url: `${baseUrl}:${port}${url}`,
			data,
			header,
			method: methodType,
			timeout: 3000,
			dataType,
			success: (res) => {
				const resultData: any = res.data
				console.log('response', {
					resultData,
					url,
				})
				const resultCode = Number.parseInt(resultData.code)

				resolve({
					code: resultCode,
					data: res.data as any,
				})
			},
			fail: (err) => {
				reject(err)
			},
		})
	})
}

export const get = <R extends AnyObject = AnyObject, T extends AnyObject = AnyObject>(
	url: string,
	data?: T,
	config?: RequestConfig
) =>
	RequestMethod<T, R>(
		{
			methodType: 'GET',
			url,
			data,
		},
		config
	)

export const post = <R extends AnyObject = AnyObject, T extends AnyObject = AnyObject>(
	url: string,
	data?: T,
	config?: RequestConfig
) =>
	RequestMethod<T, R>(
		{
			methodType: 'POST',
			url,
			data,
		},
		config
	)
