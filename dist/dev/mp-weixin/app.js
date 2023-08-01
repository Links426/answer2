"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/message/message.js";
  "./pages/mine/mine.js";
  "./pagesSub/course/course.js";
  "./pagesSub/course/addCourse.js";
  "./pagesSub/classroom/classroom.js";
  "./pagesSub/classroom/classroom-publish.js";
  "./pagesSub/question/question.js";
  "./pagesSub/setting/setting.js";
  "./pagesSub/mineSub/mineSub-setInfo.js";
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "App",
  setup(__props) {
    common_vendor.onShow(() => {
    });
    common_vendor.onUnload(() => {
    });
    return () => {
    };
  }
});
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/xlin/Desktop/mycode/\u65B0\u5C0F\u7A0B\u5E8F/answerTo/src/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(common_vendor.createPinia());
  return {
    app,
    Pinia: common_vendor.Pinia
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
