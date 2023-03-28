"use strict";
const common_vendor = require("../common/vendor.js");
const discoverImgStore = common_vendor.defineStore("discover", () => {
  const discoverImgList = common_vendor.reactive([
    {
      id: 0,
      src: "../../static/imgs/1.png",
      title: "\u9886\u517B\u732B\u732B"
    },
    {
      id: 1,
      src: "../../static/imgs/2.png",
      title: "\u732B\u732B\u6551\u52A9"
    },
    {
      id: 3,
      src: "../../static/imgs/3.png",
      title: "\u64B8\u732B\u6307\u5357"
    }
  ]);
  return { discoverImgList };
});
exports.discoverImgStore = discoverImgStore;
