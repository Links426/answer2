export const uploadImg = (maxCount: number, : ) => {
  return uni.chooseImage({
    count: maxCount,
    sizeType: ["compressed"],
    success: (res) => {},
  });
};
