remove# 移除元素

## 📌 题目信息
- **来源**: LeetCode 27
- **难度**: 简单
- **链接**: [移除元素](https://leetcode.cn/problems/remove-element/)

## 🎯 题目理解
原地移除数组中所有等于 `val` 的元素，返回新数组的长度。

## 💡 核心思想：双指针
### 算法分析
使用快慢指针，快指针遍历原数组，慢指针指向新数组的末尾

### 复杂度分析
- **时间复杂度**: O(n)$，只遍历一次数组
- **空间复杂度**: O(1)$，原地修改

## 🔧 代码实现
```cpp
class Solution {
public:
    int removeElement(vector<int>& nums, int val) {
        int slow = 0;
        for (int fast = 0; fast < nums.size(); fast++) {
            if (val != nums[fast]) {
                nums[slow++] = nums[fast];
            }
        }
        return slow;
    }
};
```

## 🐛 避坑笔记
- **注意**: 返回的是新长度，不是新数组
- **边界**: 空数组的情况

## 📚 变体题目
- [LeetCode 26. 删除有序数组中的重复项](https://leetcode.cn/problems/remove-duplicates-from-sorted-array/)
- [LeetCode 283. 移动零](https://leetcode.cn/problems/move-zeroes/)
- [LeetCode 844. 比较含退格的字符串](https://leetcode.cn/problems/backspace-string-compare/)
- [LeetCode 977. 有序数组的平方](https://leetcode.cn/problems/squares-of-a-sorted-array/)


## 补充
## 📌 题目信息1
- **来源**: LeetCode 26
- **难度**: 简单
- **链接**: [题目描述](https://leetcode.cn/problems/remove-duplicates-from-sorted-array/)

## 🎯 题目理解
非递增数组，原地删除重复元素，使每个元素只出现1次，返回数组中唯一元素的个数 

## 💡 核心思想：双指针
### 算法分析
使用快慢指针，快指针遍历原数组，慢指针指向新数组的末尾并标记唯一元素的数目

### 复杂度分析
- **时间复杂度**: O(n$)$
- **空间复杂度**: O(1$)$

## 🔧 代码实现
```cpp
class Solution {
public:
  int removeDuplicates(vector<int>& nums) {
    //数组为空直接返回0
    if (nums.empty()) return 0;
    //定义快慢指针
    int slow = 0;
    for (int fast = 0; fast < nums.size(); fast++) {
        if (nums[slow] != nums[fast]) {
            nums[++slow] = nums[fast];
        }
    }
    return slow + 1;
  }  
    
}；
```

## 🐛 避坑笔记
- 不返回数组，返回数组去重后唯一元素的个数;
- 慢指针初始为0，假如第一次比较nums[0] != nums[1],意味着有两个元素都不相同，++slow之后slow=1,所以最终返回值还要+1


## 📌 题目信息2
- **来源**: LeetCode 283
- **难度**: 简单
- **链接**: [题目描述](https://leetcode.cn/problems/move-zeroes/)

## 🎯 题目理解
将数组中所有0移到数组末尾，且保持非0元素的相对顺序不变

## 💡 核心思想
### 算法分析
使用快慢指针，快指针遍历原数组，慢指针指向新数组的末尾，此外在慢指针后面补0至与原数组的长度相同

### 复杂度分析
- **时间复杂度**: O(n$)$
- **空间复杂度**: O(1$)$

## 🔧 代码实现
```cpp
class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        int slow = 0;
        for (int fast = 0; fast < nums.size(); fast++) {
            if (0 != nums[fast]) {
                nums[slow++] = nums[fast];
            }
        }
        for (int i = slow; slow <nums.size(); i++) {
            nums[i] = 0;
        }
    }
};
```

## 🐛 避坑笔记
- 通过快慢指针确定的新数组没有0元素，所以我们要在新数组后面补充一定数量的0。
- 输入： nums = [0,1,0,3,12]
- fast = 1时，nums[0] = 1; slow = 1;
- fast = 3时，nums[1] = 3; slow = 2;
- fast = 4时，nums[2] = 12; slow = 3;
- 此时所有非0元素都在数组前面，从nums[3]开始补0直到数组末尾。



## 📌 题目信息3
- **来源**: LeetCode 977
- **难度**: 简单
- **链接**: [题目描述](https://leetcode.cn/problems/squares-of-a-sorted-array/)

## 🎯 题目理解
非递减整数（有负数）数组平方后得到新数组，让新数组也按照非递减顺序排序

## 💡 核心思想
### 算法分析
双指针i,j，一个指向数组开始，一个指向数组末尾，因为平方的最大值一定来自数组两端，不会在数组中间。

### 复杂度分析
- **时间复杂度**: O(n$)$整个数组里每个元素只会被访问、处理恰好 1 次，没有嵌套循环
- **空间复杂度**: O(1$)$不算结果数组的总空间

## 🔧 代码实现
```cpp
class Solution {
public:
    vector<int> sortedSquares(vector<int>& A) {
        int k = A.size() - 1;
        //定义一个整型数组result用于按要求顺序存放平方后的元素
        //result与A大小相同，初始用0填充
        vector<int> result(A.size(), 0);
        for (int i = 0, j = A.size() - 1; i <= j;) {
            //末尾元素大于数组前面的元素，只更新末尾指针
            if (A[i] * A[i] < A[j] * A[j]) {
                result[k--] = A[j] * A[j];
                j--;
            } else {
                result[k--] = A[i] * A[i];
                //数组开始元素大于数组末尾的元素，只更新开始指针
                i++;
            }
        }
        return result;        
    }
};
```

## 🐛 避坑笔记
- 满足题目输出要求，要定义一个新的数组存放平方后排好序的元素
- 注意什么时候更新开始指针和末尾指针


## 📌 题目信息4
- **来源**: LeetCode 844
- **难度**: 简单
- **链接**: [题目描述](https://leetcode.cn/problems/backspace-string-compare/)

## 🎯 题目理解
比较两个含退格的字符串（s, t）是否相等

## 💡 核心思想
### 算法分析
双指针，从字符串的末尾开始遍历字符串,一个指向s,一个指向t，初始化两个变量skipS,skipT，记录字符串退格跳过元素
遇到退格符,skip变量+1，指针指到退格符前面一个元素时，因为skip变量值不为0，所以跳过该元素，指针指向前一个元素；如果没有遇到退格符，元素保留。

### 复杂度分析
- **时间复杂度**: O(n$)$
- **空间复杂度**: O(1$)$

## 🔧 代码实现
```cpp
class Solution {
public:
    bool backspaceCompare(string s, string t) {
        //指针分别指向字符串的末尾
        int i = s.length() - 1, j = t.length() - 1;
        //记录字符串退格符的出现
        int skipS = 0, skipT = 0;
        while (i >= 0 || j >=0) {
            while (i >= 0) {
                if (s[i] == '#') {
                    skipS++, i--;
                } else if (skipS > 0) {
                    skipS--, i--;
                } else {
                    //跳出内层循环，与字符串t对应元素进行比较
                    break;
                }
            }
            while (j >= 0) {
                if (t[j] == '#') {
                    skipT++, j--;
                } else if (skipT > 0) {
                    skipT--, j--;
                } else {
                    //跳出内层循环，与字符串s对应元素进行比较
                    break;
                }
            }
            //两个字符串都没遍历完，但存在对应位置元素大小不相等
            if (i >= 0 && j >= 0) {
                if (s[i] != t[j]) return false;
            } else {
                if (i >= 0 || j >= 0)
                //有一个字符串已经遍历结束，另一个字符串还在遍历，即两个字符串大小不等
                return false;
            }
            i--, j--;
    
        }
        return true;

    }
}；
```

## 🐛 避坑笔记
- 代码循环嵌套，注意什么时候要退出内层循环，进入比较
- 不一定要正向遍历数组，有时候逆向遍历可能更容易


## 💭 总结
心得体会
双指针的应用，处理了单指针难以解决的问题


