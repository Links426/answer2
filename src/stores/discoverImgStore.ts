import { reactive } from 'vue'
import { defineStore } from 'pinia'

// 使用setup模式定义
export const discoverImgStore = defineStore('discover', () => {
  const discoverImgList = reactive([
    {
      id: 0,
      src: '../../static/imgs/1.png',
      title: '领养猫猫',
    },
    {
      id: 1,
      src: '../../static/imgs/2.png',
      title: '猫猫救助',
    },
    {
      id: 3,
      src: '../../static/imgs/3.png',
      title: '撸猫指南',
    },
  ])
  return { discoverImgList }
})
