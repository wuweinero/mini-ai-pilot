# 定义一个python冒泡排序算法
def bubble_sort(nums):
    # 定义一个标志位，如果没有发生交换，那么表示数组已经有序
    swapped = True
    while swapped:
        swapped = False
        for i in range(len(nums) - 1):
            if nums[i] > nums[i + 1]:
                # 交换元素
                nums[i], nums[i + 1] = nums[i + 1], nums[i]
                # 设置标志位为True，表示发生了交换
                swapped = True

# 创建一个测试示例
random_list_of_nums = [5, 2, 1, 8, 4]
bubble_sort(random_list_of_nums)