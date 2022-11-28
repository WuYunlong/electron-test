<template>
  <div class="app" @mousedown="onMouseDown">
    <div style="padding: 100px">
      <button @click="menuClicked">点击</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ContextMenu } from './components/context-menu'
import { MenuItem } from './components/context-menu/interface'

const onMouseDown = (e: MouseEvent): void => {
  e.stopPropagation()

  const el = e.target as HTMLElement
  if (el.classList.contains('app')) {
    console.log(`appMouseDown`)
  }
}

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
</script>

<style scoped lang="scss">
.app {
  width: 100vw;
  height: 100vh;
  background: rgba(246, 246, 246, 0.75);
  position: relative;
}
</style>
