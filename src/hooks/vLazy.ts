import { Directive } from 'vue'

export const vLazy: Directive<HTMLImageElement, string> = async (el, binding) => {
	const def = await import('@/static/imgs/index/class-bg.png')

	el.src = def.default

	const obs = new IntersectionObserver((enter) => {
		if (enter[0].intersectionRatio > 0) {
			el.src = binding.value
			obs.unobserve(el)
		}
	})
	obs.observe(el)
}
