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
- **LeetCode 35**: [二分查找](https://leetcode.cn/problems/search-insert-position/)
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

## 📌 题目信息
- **LeetCode 34**: [在排序数组中查找元素的第一个和最后一个位置](https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/description/)
- **难度**: 中等
- **核心思想**: 分别用二分查找确定左右边界两旁的位置，最终的范围是{leftBorder + 1 , rightBorder - 1},下段代码采用左闭右闭区间。

## ⏱️ 复杂度分析
- **时间复杂度**: $O(\log n)$，其中 $n$ 是数组长度
- **空间复杂度**: $O(1)$，仅使用常数个变量

## 🎯 关键代码

```cpp
class Solution{
public:
    vector<int> searchRange( vector<int>& nums, int target) {
        // 处理空数组，避免 size() - 1 溢出
        if (nums.empty()) return {-1, -1};
        int leftBorder = getLeftBorder(nums, target);
        int rightBorder = getRightBorder(nums, target);
        // 情况一：target 在数组范围外（没有被赋值成 -2 以外的有效下标）
        if (leftBorder == -2 || rightBorder == -2) return {-1, -1};
        // 情况三：target 在数组范围内且存在
        if (rightBorder - leftBorder > 1) return {leftBorder + 1, rightBorder - 1};
        // 情况二：target 在范围内但不存在
        return {-1, -1};
    }
private:
    int getRightBorder(vector<int>& nums, int target) {
        int left = 0;
        int right = nums.size() - 1;
        int rightBorder = -2;
        while (left <= right) {
            int middle = left + ((right - left) / 2);
            if (nums[middle] > target) {
                right = middle - 1;
            } else {
                left = middle + 1;
                rightBorder = left;
            }
        }
        return rightBorder;
    }
    int getLeftBorder(vector<int>& nums , int target) {
        int left = 0;
        int right = nums.size() - 1;
        int leftBorder = -2;
        while (left <= right) {
            int middle = left + ((right - left) / 2);
            if (nums[middle] >= target) {
                right = middle - 1;
                leftBorder = right;
            } else {
                left = middle + 1;
            }
        }
        return leftBorder;
    }
};
```
## 🐛 避坑笔记

### 坑点 1：整型溢出
**错误写法**：`int mid = (left + right) / 2;`  
**正确写法**：`int mid = left + (right - left) / 2;`

### 坑点 2：边界条件及确定
**正确**：`while (left <= right)` 和 `middle ± 1`
**边界**：`{leftBorder + 1, rightBorder - 1}`我们找到的leftBorder是实际左边界再-1的位置，`rightBorder`是实际右边界再+1的位置；往左找到最后一个与target相等的元素后，`right = middle -1; leftBorder = right`又左移了一位，右边界同理。

## pro
```cpp
class Solution{
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        //使用内置函数lower_bound找到第一个大于等于target的元素
        auto left_it = std::lower_bound(nums.begin(),nums.end(),target);
        //若没有任何数大于target，迭代器指向数组末尾nums.end()
        //如果target在数组范围内，但数组没这个数，则第二个条件通过，返回{-1, -1}
        if (left_it == nums.end() || *left_it != target) return {-1, -1};
        //使用内置函数upper_bound找到第一个大于target的元素
        auto right_it = std::upper_bound(nums.begin(),nums.end(),target);
        int begin = std::distance(nums.begin(), left_it);
        int end = std::distance(nums.begin(), right_it) - 1;
        return {begin, end};
    }
};
```

## 总结
-在处理 STL 迭代器时，‘先检查有效性，再解引用’。这不仅适用于二分查找，也适用于所有容器的 find 操作。这种逻辑能让代码在面对空数据时依然稳健。
-二分查找虽然是 $O(\log n)$ 的典范，但在实际工程中，我们需要权衡缓存命中率、数据分布均匀性以及数据的动态变化频率。
