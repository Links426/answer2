export const baseWsURL = {
  url: "ws://193.112.177.42:8080/api/ws",
};

// 连接：
export const connectWs = (id: string | number, roomID: string | number) => {
  return uni.connectSocket({
    url: `ws://193.112.177.42:8080/ws/conn?ID=${id}&roomID=${roomID}`,
    header: {
      "content-type": "application/json",
    },
    success(res) {
      console.log(res);
    },
  });
};
