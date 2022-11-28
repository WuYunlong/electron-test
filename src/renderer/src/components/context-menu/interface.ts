export interface MenuItem {
  type?: 'line' | 'disable' | 'danger'
  name?: string
  icon?: string
  action?: () => void | boolean
  children?: MenuItem[]
}
