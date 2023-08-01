<template>
  <view class="h-100vh pt-32rpx flex flex-col items-center bg-#F7F8FA">
    <MineCard mb-56rpx />
    <Setting
      v-for="item in settingList"
      :key="item.id"
      :icon-name="item.icon"
      :content="item.content"
      mb-16rpx
      @my-click="to(item.url)"
    />
  </view>
</template>
<script setup lang="ts">
import MineCard from "@/pages/mine/components/mine-card.vue";
import Setting from "@/pages/mine/components/mine-setting.vue";
import { to } from "@/hooks/toUrl";
import { get } from "@/api/request";

const settingList = [
  {
    id: 0,
    content: "设置",
    icon: "icon-shezhi",
    url: "/pagesSub/setting/setting",
  },
  {
    id: 1,
    content: "设置",
    icon: "icon-shezhi",
    url: "/pagesSub/setting/setting",
  },
  {
    id: 2,
    content: "设置",
    icon: "icon-shezhi",
    url: "/pagesSub/setting/setting",
  },
  {
    id: 3,
    content: "设置",
    icon: "icon-shezhi",
    url: "/pagesSub/setting/setting",
  },
];
</script>

<style scoped>
.mine-button {
  font-size: 24rpx;
  padding: 12rpx 20rpx;
  border: 2rpx solid #c2c7f3;
  border-radius: 8rpx;
}
</style>
