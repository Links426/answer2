"use strict";
const common_vendor = require("../../../common/vendor.js");
const stores_nekoListStore = require("../../../stores/nekoListStore.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index-messageBlock",
  setup(__props) {
    const nekoStore = stores_nekoListStore.nekoNameListStore();
    const { nekoNameList } = common_vendor.storeToRefs(nekoStore);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(nekoNameList), (item, k0, i0) => {
          return {
            a: "url(" + item.coverImg + ")",
            b: item.id,
            c: common_vendor.o(($event) => common_vendor.unref(nekoStore).transferId(item.id), item.id)
          };
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1e7c4772"], ["__file", "/Users/xlin/\u5B66\u4E60\u8D44\u65992/hellCat/HELLCAT_MARK2/src/pages/index/components/index-messageBlock.vue"]]);
wx.createComponent(Component);
