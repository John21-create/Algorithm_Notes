# 二分查找 (Binary Search)

## 📌 题目信息
- **LeetCode 704**: [二分查找](https://leetcode.cn/problems/binary-search/)
- **难度**: 简单
- **核心思想**: 每次将搜索区间缩小一半

## ⏱️ 复杂度分析
- **时间复杂度**: $O(\log n)$，其中 $n$ 是数组长度
- **空间复杂度**: $O(1)$，仅使用常数个变量

## 🎯 关键代码

```cpp
int binarySearch(vector<int>& nums, int target) {
    int left = 0, right = nums.size() - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (nums[mid] == target) {
            return mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}
```
## 🐛 避坑笔记

### 坑点 1：整型溢出
**错误写法**：`int mid = (left + right) / 2;`  
**正确写法**：`int mid = left + (right - left) / 2;`

### 坑点 2：边界条件
**正确**：`while (left <= right)` 和 `mid ± 1`

## pro
- :若没找到该元素则返回元素应该插入的位置下标
```cpp
int binarySearch(vector<int>& nums, int target) {
    int left = 0, right = nums.size() - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (nums[mid] == target) {
            return mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    #下面两种写法都行
    return left;
    #return right + 1;
    
}
```

## pro max
```cpp
class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        // lower_bound 返回一个迭代器，在有序区间内找到第一个 >= target 的位置；upper_bound 找第一个严格 > target 的位置
        auto it = std::lower_bound(nums.begin(), nums.end(), target);
        // 用找到的迭代器减去起始迭代器，即得到该元素的下标
        return std::distance(nums.begin(), it);
    }
}
```
