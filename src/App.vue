<script setup lang="ts">
import './static/icons/iconfont.css'
onLaunch(() => {
  // eslint-disable-next-line no-console
  console.log('App Launch')
})
onShow(() => {
  // eslint-disable-next-line no-console
  console.log('App Show')
})
onHide(() => {
  // eslint-disable-next-line no-console
  console.log('App Hide')
})
</script>

<style>
/* 去除白边 */
.mt-1 {
  margin-top: -2rpx;
}
view {
  box-sizing: border-box;
}
</style>
