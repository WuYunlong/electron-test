<template>
  <div class="app" @mousedown="onMouseDown">
    <div ref="el" v-on-click-outside="clickOutside" class="menu no-drag" :style="style">
      <div class="menu-inner">
        <div class="menu-item" @click.stop="menuClicked">
          <div class="menu-icon"></div>
          <div class="menu-text">编辑表格</div>
          <div class="menu-arrow"></div>
        </div>

        <div class="menu-item" @click.stop="menuClicked">
          <div class="menu-icon"></div>
          <div class="menu-text">风格</div>
          <div class="menu-arrow"></div>
        </div>

        <div class="menu-item-line"></div>

        <div class="menu-item" @click.stop="menuClicked">
          <div class="menu-icon"></div>
          <div class="menu-text">编辑表格</div>
          <div class="menu-arrow"></div>
        </div>

        <div class="menu-item" @click.stop="menuClicked">
          <div class="menu-text">复制</div>
          <div class="menu-arrow"></div>
        </div>
        <div class="menu-item" @click.stop="menuClicked">
          <div class="menu-text">粘贴</div>
          <div class="menu-arrow"></div>
        </div>
        <div class="menu-item" @click.stop="menuClicked">
          <div class="menu-text">删除</div>
          <div class="menu-arrow"></div>
        </div>

        <div class="menu-item-line"></div>

        <div class="menu-item" @click.stop="menuClicked">
          <div class="menu-text">重置列大小</div>
          <div class="menu-arrow"></div>
        </div>
        <div class="menu-item" @click.stop="menuClicked">
          <div class="menu-text">删除单元格样式</div>
          <div class="menu-arrow"></div>
        </div>
        <div class="menu-item" @click.stop="menuClicked">
          <div class="menu-text">删除单元格内容</div>
          <div class="menu-arrow"></div>
        </div>
      </div>
      <div class="menu-mask" v-show="isDragging"></div>
    </div>
    <div class="mask"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, CSSProperties } from 'vue'
import { useDraggable, useResizeObserver, useWindowSize } from '@vueuse/core'
import { vOnClickOutside } from '@vueuse/components'

const onMouseDown = (e: MouseEvent): void => {
  e.stopPropagation()

  const el = e.target as HTMLElement
  if (el.classList.contains('app')) {
    console.log(`appMouseDown`)
  }
}

const menuClicked = (): void => {
  console.log(`menuClicked`)
}

const el = ref()

const { width: innerWidth, height: innerHeight } = useWindowSize()

const clickOutside = (e: MouseEvent): void => {
  e.stopPropagation()
  console.log(`clickOutside`)
}

const top = ref<number>(50)
const left = ref<number>(50)

const style = computed<CSSProperties>(() => {
  return {
    top: `${top.value}px`,
    left: `${left.value}px`
  }
})

const isDragging = ref(false)

useDraggable(el, {
  initialValue: { x: 50, y: 50 },
  onMove(position) {
    isDragging.value = true
    const { clientHeight, clientWidth } = el.value as HTMLElement
    const maxLeft = innerWidth.value - clientWidth - 20
    const maxTop = innerHeight.value - clientHeight - 20
    const { x, y } = position
    left.value = x < 20 ? 20 : x > maxLeft ? maxLeft : x
    top.value = y < 50 ? 50 : y > maxTop ? maxTop : y
  },
  onEnd() {
    isDragging.value = false
  }
})

useResizeObserver(el, (entries) => {
  const entry = entries[0]
  const { width, height } = entry.contentRect
  console.log((entry.target as HTMLElement).offsetTop)
  console.log((entry.target as HTMLElement).offsetLeft)
  console.log(width, height)
})
</script>

<style scoped lang="scss">
.menu-inner {
  padding: 18px 6px 6px;
  position: relative;
  z-index: 0;
}
.menu-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background: rgba(0, 0, 0, 0);
}

.menu-item {
  width: 100%;
  min-width: 190px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  box-sizing: border-box;
  padding: 5px 8px;
  user-select: none;

  &:hover {
    background: rgba(0, 0, 0, 0.04);
  }
}
.menu-item-line {
  width: 100%;
  height: 9px;
  position: relative;
  &::before {
    content: '';
    height: 1px;
    background: rgba(0, 0, 0, 0.04);
    position: absolute;
    top: 4px;
    left: 8px;
    right: 8px;
  }
}
.menu-icon {
  width: 20px;
  height: 20px;
  background: #eee;
  margin-right: 10px;
}
.menu-text {
  flex: 1;
  font-size: 13px;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.6);
}
.menu-arrow {
  min-width: 1px;
}

.app {
  width: 100vw;
  height: 100vh;
  background: rgba(246, 246, 246, 0.75);
  position: relative;
}
.menu {
  position: absolute;
  box-shadow: rgba(31, 34, 37, 0.09) 0 0 0 1px, rgba(0, 0, 0, 0.08) 0 24px 24px -4px,
    rgba(0, 0, 0, 0.04) 0 16px 16px -4px;
  border-radius: 6px;
  overflow: hidden;
  pointer-events: auto;
  background: rgba(240, 244, 241, 0.9);
  z-index: 10;
  // background: linear-gradient(116deg, rgb(250, 250, 250), rgb(244, 244, 244));

  &::before {
    content: '';
    position: absolute;
    top: 7px;
    left: 50%;
    width: 30px;
    height: 4px;
    background: rgba(0, 0, 0, 0.06);
    transform: translate3d(-50%, 0, 0);
    z-index: 10;
    border-radius: 2px;
  }
}
.mask {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  //background: rgba(0, 0, 0, 0.2);
}
</style>
