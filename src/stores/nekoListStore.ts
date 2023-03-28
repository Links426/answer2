import { reactive } from 'vue'
import { defineStore } from 'pinia'

// 使用setup模式定义
export const nekoNameListStore = defineStore('name', () => {
  const clickId = ref(0)
  const nekoNameList = reactive([
    {
      id: 0,
      gender: true,
      name: '小明',
      called: ['小明', '小李', '嘟嘟', '胖胖'],
      birth: '2003-06-18',
      detail: '长得帅，黑皮体育生',
      like: '胆子大，亲人，可爱',
      location: '力学实验楼',
      haveParent: false,
      noChild: true,
      special: '全身狸花，绿眼睛，爱吃巨胖(11斤)，不要脸皮的小猪咪一枚，爱吃，不要脸',
      catchDirect: '摸多了会被打，要饭达人，希望多喂一些湿粮，孩子常年便秘',
      coverImg: '../../static/imgs/QQ20221118-0.png',
      nekoImgList: ['../../static/imgs/QQ20221118-0.png', '../../static/imgs/QQ20221118-0.png'],
    },
    {
      id: 1,
      gender: false,
      name: '小明',
      called: ['脆脆', '花花', '啦啦', '小妹'],
      birth: '2009-03-12',
      detail: '特别可爱！',
      like: '喜欢吃东西',
      location: '竹苑楼底下',
      haveParent: true,
      noChild: false,
      special: '很胖很胖很胖，见到他记得打招呼',
      catchDirect: '别摸它，一定不要靠近',
      coverImg: '../../static/imgs/QQ20221118-0.png',
      nekoImgList: ['../../static/imgs/QQ20221118-0.png', '../../static/imgs/QQ20221118-0.png'],
    },
  ])
  const transferId = (id: number) => {
    uni.navigateTo({
      url: '/pages/index/index-detail',
    })
    clickId.value = id
  }

  return { nekoNameList, clickId, transferId }
})
