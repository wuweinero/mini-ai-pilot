# 定义一个python冒泡排序函数
def bubble_sort(arr):
    n = len(arr)
    
    # 遍历所有的数组元素
    for i in range(n):
        # 最后i个元素已经在正确的位置上，所以我们不需要检查它们
        for j in range(0, n - i - 1):
            # 从0到n-i-1遍历数组
            # 如果当前元素大于下一个元素，则交换它们
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

# 测试函数
myarr = [45, 23, 12, 89, 19, 56, 78, 34, 67, 21]
print("排序前的数组是:", myarr)
print("排序后的数组是:", bubble_sort(myarr))

