<!-- 创建一个只包含一个按钮的vue3示例，使用script setup语法糖 -->
<template>
    <button @click="handleClick">按钮</button>
</template>

<script setup>
import { ref } from 'vue'
// 编写按钮点击事件，在浏览器中提示消息
const handleClick = () => alert('按钮被点击了！')
// 定义一个冒泡排序算法
const bubbleSort = (arr) => {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}
</script>

<style scoped>
button {
    color: red;
    /* 背景设为透明 */
    background: transparent;
    /* 宽度设为视口宽度 */
    width: 100vw;
    /* 高度设为视口高度 */
    height: 100vh;
}
</style>