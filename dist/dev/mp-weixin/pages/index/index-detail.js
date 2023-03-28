"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_nekoListStore = require("../../stores/nekoListStore.js");
if (!Math) {
  (statusBar + IndexImage)();
}
const statusBar = () => "../../components/statusBar.js";
const IndexImage = () => "./components/index-image.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index-detail",
  setup(__props) {
    const nekoStore = stores_nekoListStore.nekoNameListStore();
    const { clickId, nekoNameList } = common_vendor.storeToRefs(nekoStore);
    const presentList = nekoNameList.value[clickId.value];
    const back = () => {
      common_vendor.index.navigateBack({
        delta: 1
      });
    };
    const called = presentList.called.join(",");
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(back),
        b: common_vendor.t(common_vendor.unref(presentList).name),
        c: common_vendor.t(common_vendor.unref(presentList).haveParent ? "\u5DF2\u9886\u517B" : "\u672A\u9886\u517B"),
        d: common_vendor.t(common_vendor.unref(presentList).noChild ? "\u5DF2\u7EDD\u80B2" : "\u672A\u7EDD\u80B2"),
        e: common_vendor.t(common_vendor.unref(called)),
        f: common_vendor.t(common_vendor.unref(presentList).location),
        g: common_vendor.t(common_vendor.unref(presentList).birth),
        h: common_vendor.t(common_vendor.unref(presentList).special),
        i: common_vendor.t(common_vendor.unref(presentList).catchDirect)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-531fc395"], ["__file", "/Users/xlin/\u5B66\u4E60\u8D44\u65992/hellCat/HELLCAT_MARK2/src/pages/index/index-detail.vue"]]);
wx.createPage(MiniProgramPage);
