import { useStore } from '@/store'

export async function microApplicationLoading(path: string) {
  const store = useStore()
  console.log('store: ', store)
  // 1. 根据路由地址加载当前应用配置
  let currentActiveMicroConfig = await store.dispatch(
    'micro/GET_FIND_MICRO_CONFIG',
    path,
  )

  console.log(currentActiveMicroConfig)
  // 5. 判断当前挂载的是否有内容
  // const containerNode = getContainerNode(`#${currentActiveMicroConfig.name}`)
  const containerNode = getContainerNode(`#seller`)
  console.log('containerNode: ', containerNode)
}

// 获取容器节点
export function getContainerNode(container: string) {
  const containerNode = container && document.querySelector(container)

  if (containerNode) {
    return containerNode.childNodes.length
  }

  return -1
}
