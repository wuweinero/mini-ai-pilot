# 定义一个python冒泡排序算法
def bubble_sort(array):
    # 获取数组的长度
    n = len(array)
    # 遍历数组的每个元素
    for i in range(n):
        # 将标志位设为False
        flag = False
        # 遍历数组的每个元素
        for j in range(0, n - i - 1):
            # 如果当前元素大于下一个元素，则交换位置
            if array[j] > array[j + 1]:
                array[j], array[j + 1] = array[j + 1], array[j]
                # 如果发生了交换，则将标志位设为True
                flag = True
        # 如果在一次遍历中没有发生交换，说明数组已经有序，直接返回
        if not flag:
            return

# 定义一个快速排序算法