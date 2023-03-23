import { useSyncExternalStore } from 'react'

export const useWindowDimensions = () => {
	return useSyncExternalStore(subscribe, getSnapshot)
}

const subscribe = (callback) => {
	window.addEventListener('resize', callback)
	return () => window.removeEventListener('resize', callback)
}
function getSnapshot() {
	return window.innerWidth
}
