import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Algorithom_Notes",
  description: "记录几乎从0开始的算法学习",
  base: "/Algorithm_Notes/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '数组专题', link: '/array/binary-search' },
      { text: 'GitHub', link: 'https://github.com/John21-create/Algorithm_Notes' }
    ],

    sidebar: {
      '/array/': [
        {
          text: '数组专题',
          items: [
            { text: '二分查找', link: '/array/binary-search' },
            { text: '移除元素', link: '/array/removal-element' }
          ]
        }
      ],
      '/dynamic-programming/': [
        {
          text: '动态规划',
          items: [
            { text: '背包问题', link: '/dynamic-programming/knapsack' }
          ]
        }
      ]
    },
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/John21-create/Algorithm_Notes' }
    ],
    
    search: {
      provider: 'local'
    },
    
    outline: {
      level: [2, 3],
      label: '目录'
    }
  },
  
  markdown: {
    lineNumbers: true,
    theme: 'github-dark'
  }
})
