<template>
  <div ref="el" v-on-click-outside="clickOutside" class="menu no-drag" :style="style" v-if="show">
    <div class="menu-inner">
      <div class="menu-item-title">
        <span class="sub-title">编辑表格</span>
        <span class="icon icon-close"></span>
      </div>

      <template v-for="menu in props.list">
        <div class="menu-item-line" v-if="menu.type && menu.type == 'line'"></div>
        <div class="menu-item" v-else @click.stop="runAction(menu)">
          <div class="menu-icon" v-if="menu.icon"></div>
          <div class="menu-text">{{ menu.name }}</div>
          <div class="menu-arrow" v-if="menu.children && menu.children.length"></div>
        </div>
      </template>
    </div>
    <div class="menu-mask" v-show="isDragging"></div>
  </div>
  <div class="mask" v-if="show"></div>
</template>

<script setup lang="ts">
import { ref, CSSProperties, onUnmounted, PropType } from 'vue'
import { useDraggable, useWindowSize, useResizeObserver } from '@vueuse/core'
import { vOnClickOutside } from '@vueuse/components'
import { computed } from '@vue/reactivity'
import { MenuItem } from './interface'

const props = defineProps({
  x: { type: Number, default: 0 },
  y: { type: Number, default: 0 },
  list: { type: Array as PropType<MenuItem[]>, default: () => [] }
})

const show = ref<boolean>(true)
const emit = defineEmits(['close'])

const el = ref()
const top = ref<number>(props.y || 0)
const left = ref<number>(props.x || 0)
const style = computed<CSSProperties>(() => ({
  top: `${top.value}px`,
  left: `${left.value}px`
}))

const isDragging = ref(false)
const { width: innerWidth, height: innerHeight } = useWindowSize()
useDraggable(el, {
  initialValue: { x: left.value, y: top.value },
  onMove(position) {
    const { clientHeight, clientWidth } = el.value as HTMLElement
    const maxLeft = innerWidth.value - clientWidth - 20
    const maxTop = innerHeight.value - clientHeight - 20
    const { x, y } = position
    left.value = x < 20 ? 20 : x > maxLeft ? maxLeft : x
    top.value = y < 50 ? 50 : y > maxTop ? maxTop : y
    isDragging.value = true
  },
  onEnd() {
    isDragging.value = false
  }
})

useResizeObserver(el, () => {
  console.log(`menu resize ...`)
})

const runAction = (menu: MenuItem) => {
  // 如果有下一个
  if (menu.children && menu.children.length) {
    console.log(`进入下一页`)
    return
  }

  if (menu.action) {
    const res = menu.action()
    if (res !== false) {
      close()
    }
  }
}

const close = () => {
  show.value = false
  emit('close')
}

const clickOutside = () => {
  close()
}

onUnmounted(() => {
  console.log(`onUnmounted`)
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
  width: 10px;
  height: 20px;
  background: url(./svg/next.svg) no-repeat center center;
  background-size: auto 50%;
  opacity: 0.5;
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
  backdrop-filter: blur(20px);
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
.menu-item-title {
  padding: 5px;
  display: flex;
  justify-content: space-between;
  position: relative;
  cursor: default;

  .sub-title {
    font-size: 13px;
    font-weight: 500;
    color: #333;
    padding-left: 16px;
    background: url(./svg/back.svg) no-repeat left center;
    background-size: auto 80%;
  }
}
</style>
