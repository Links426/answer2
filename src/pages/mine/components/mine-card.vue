<template>
  <view class="mine-idCard">
    <view flex flex-col justify-between font-bold h-full>
      <view flex
        ><view>{{ userInfo.nickName }}</view>
        <view>{{}}</view>
        <view class="ml-20rpx text-#C2C7F3">{{ userInfo.academy }}</view></view
      >
      <view flex
        ><view>{{ userInfo.userName }}</view>
        <view class="ml-20rpx text-#C2C7F3">{{ userInfo.role }}</view></view
      >
      <MineButton
        v-if="userInfo.userName === ''"
        :content="'登陆'"
        :key="Number(isBinding)"
        @my-click="changeUserStatus"
      ></MineButton>
    </view>
    <view h-full>
      <view
        class="mine-avater"
        :style="{ backgroundImage: 'url(' + userInfo.avatarURL + ')' }"
      ></view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { showModal, showToast } from "@/api/users/login";
import { getUserCode, getUserToken } from "@/api/users/login";
import { isNull } from "@/hooks/isNull";
import { to } from "@/hooks/toUrl";

import MineButton from "@/pages/mine/components/mine-button.vue";
import { userStore } from "@/stores/userStore";

const useUserStore = userStore();
const { isBinding, userInfo } = storeToRefs(useUserStore);

const changeUserStatus = async () => {
  const code = (await getUserCode()) as string;

  if (code) {
    await getUserToken(code).then((res) => {
      if (isNull(res.data.userInfo)) {
        showModal("请完善信息", "完善信息以进行下一步操作").then((res: any) => {
          if (res.confirm) {
            to("/pagesSub/mineSub/mineSub-setInfo");
          }
        });
        userInfo.value.openID = res.data.openID;
      } else {
        userInfo.value = res.data.userInfo![0];

        showToast("获取信息成功");
        uni.setStorageSync("USER_INFO", userInfo.value);
      }
    });
  }
};
</script>

<style scoped>
.mine-avater {
  width: 128rpx;
  height: 128rpx;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}
.mine-idCard {
  width: 718rpx;
  height: 238rpx;
  padding: 36rpx;
  border-radius: 8rpx;
  color: #fff;
  display: flex;

  justify-content: space-between;
  background: linear-gradient(134deg, #5b77da 0%, #7c6aef 100%);
  box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(115, 110, 233, 0.06);
}
</style>
