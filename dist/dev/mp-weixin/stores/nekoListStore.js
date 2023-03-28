"use strict";
const common_vendor = require("../common/vendor.js");
const nekoNameListStore = common_vendor.defineStore("name", () => {
  const clickId = common_vendor.ref(0);
  const nekoNameList = common_vendor.reactive([
    {
      id: 0,
      gender: true,
      name: "\u5C0F\u660E",
      called: ["\u5C0F\u660E", "\u5C0F\u674E", "\u561F\u561F", "\u80D6\u80D6"],
      birth: "2003-06-18",
      detail: "\u957F\u5F97\u5E05\uFF0C\u9ED1\u76AE\u4F53\u80B2\u751F",
      like: "\u80C6\u5B50\u5927\uFF0C\u4EB2\u4EBA\uFF0C\u53EF\u7231",
      location: "\u529B\u5B66\u5B9E\u9A8C\u697C",
      haveParent: false,
      noChild: true,
      special: "\u5168\u8EAB\u72F8\u82B1\uFF0C\u7EFF\u773C\u775B\uFF0C\u7231\u5403\u5DE8\u80D6(11\u65A4)\uFF0C\u4E0D\u8981\u8138\u76AE\u7684\u5C0F\u732A\u54AA\u4E00\u679A\uFF0C\u7231\u5403\uFF0C\u4E0D\u8981\u8138",
      catchDirect: "\u6478\u591A\u4E86\u4F1A\u88AB\u6253\uFF0C\u8981\u996D\u8FBE\u4EBA\uFF0C\u5E0C\u671B\u591A\u5582\u4E00\u4E9B\u6E7F\u7CAE\uFF0C\u5B69\u5B50\u5E38\u5E74\u4FBF\u79D8",
      coverImg: "../../static/imgs/QQ20221118-0.png",
      nekoImgList: ["../../static/imgs/QQ20221118-0.png", "../../static/imgs/QQ20221118-0.png"]
    },
    {
      id: 1,
      gender: false,
      name: "\u5C0F\u660E",
      called: ["\u8106\u8106", "\u82B1\u82B1", "\u5566\u5566", "\u5C0F\u59B9"],
      birth: "2009-03-12",
      detail: "\u7279\u522B\u53EF\u7231\uFF01",
      like: "\u559C\u6B22\u5403\u4E1C\u897F",
      location: "\u7AF9\u82D1\u697C\u5E95\u4E0B",
      haveParent: true,
      noChild: false,
      special: "\u5F88\u80D6\u5F88\u80D6\u5F88\u80D6\uFF0C\u89C1\u5230\u4ED6\u8BB0\u5F97\u6253\u62DB\u547C",
      catchDirect: "\u522B\u6478\u5B83\uFF0C\u4E00\u5B9A\u4E0D\u8981\u9760\u8FD1",
      coverImg: "../../static/imgs/QQ20221118-0.png",
      nekoImgList: ["../../static/imgs/QQ20221118-0.png", "../../static/imgs/QQ20221118-0.png"]
    }
  ]);
  const transferId = (id) => {
    common_vendor.index.navigateTo({
      url: "/pages/index/index-detail"
    });
    clickId.value = id;
  };
  return { nekoNameList, clickId, transferId };
});
exports.nekoNameListStore = nekoNameListStore;
