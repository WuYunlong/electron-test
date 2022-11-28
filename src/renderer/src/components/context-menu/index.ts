import { createVNode, render } from 'vue'
import _ContextMenu from './context-menu.vue'
import { uuid } from '../../_utils'
import { MenuItem } from './interface'

export const ContextMenu = (list: MenuItem[]) => {
  const id = `id_${uuid()}`

  const remove = () => {
    const el = document.getElementById(id)
    el?.parentNode?.removeChild(el)
  }

  const vm = createVNode(_ContextMenu, {
    x: 250,
    y: 50,
    onClose: remove,
    list: list
  })

  const div = document.createElement('div')
  div.setAttribute('id', id)
  render(vm, div)
  document.body.appendChild(div)
}
