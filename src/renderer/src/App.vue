<template>
  <div style="padding: 100px; display: flex; gap: 10px">
    <button @click="menuClicked">菜单</button>
    <button @click="light">白色</button>
    <button @click="dark">黑色</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { ContextMenu } from './components/context-menu'
import { MenuItem } from './components/context-menu/interface'
import { theme } from './_utils'

const menuList: MenuItem[] = [
  {
    name: '编辑表格',
    icon: '',
    action() {
      console.log(`编辑表格`)
      return false
    },
    children: [
      {
        name: '插入行',
        icon: '',
        action() {}
      },
      {
        name: '插入列',
        icon: '',
        action() {}
      },
      {
        type: 'line'
      },
      {
        name: '向上移动行',
        icon: '',
        action() {}
      },
      {
        name: '向下移动行',
        icon: '',
        action() {}
      },
      {
        name: '向左移动列',
        icon: '',
        action() {}
      },
      {
        name: '向右移动行列',
        icon: '',
        action() {}
      }
    ]
  },
  {
    name: '风格',
    icon: '',
    action() {
      console.log(`风格`)
    }
  },
  {
    name: '编辑表格',
    icon: '',
    action() {
      console.log(`编辑表格`)
    }
  },
  { type: 'line' },
  {
    name: '复制',
    icon: '',
    action() {
      console.log(`复制`)
    }
  },
  {
    name: '剪切',
    icon: '',
    action() {
      console.log(`剪切`)
    }
  },
  {
    name: '粘贴',
    icon: '',
    action() {
      console.log(`粘贴`)
    }
  },
  { type: 'line' },
  {
    name: '重置列大小',
    icon: '',
    action() {
      console.log(`重置列大小`)
    }
  },
  {
    name: '删除单元格样式',
    icon: '',
    action() {
      console.log(`删除单元格样式`)
    }
  },
  {
    name: '重置列大小内容',
    icon: '',
    action() {
      console.log(`重置列大小内容`)
    }
  }
]

const menuClicked = (): void => {
  console.log(`menuClicked`)
  ContextMenu(menuList)
}

const light = () => {
  theme('我的白色')
}

const dark = () => {
  theme('我的黑色')
}

onMounted(() => {
  theme('我的白色')
})
</script>

<style lang="scss">
#app {
  width: 100vw;
  height: 100vh;
  background: var(--var-main-bg);
  position: relative;
  transition: background 0.3s;
}

button {
  user-select: none;
  -webkit-app-region: no-drag;
  border: 0;
}
</style>
