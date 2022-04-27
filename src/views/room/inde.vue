<template>
    <div id="room"></div>
</template>

<script>
import socket from "@/utils"
export default {
    name: "room",
    el: "#room",
    mounted() {
        // 服务端告知用户是否可加入房间
        socket.on("checkRoomSuccess", () => {
            // ...
        })
        // 服务端告知用户成功加入房间
        socket.on("joinRoomSuccess", () => {
            // ...
        })
    }
}
</script>

<style></style>
