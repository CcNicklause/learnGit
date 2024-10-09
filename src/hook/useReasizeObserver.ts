import { useEffect, useState } from 'react'

const useResizeObserver = ref => {
  const [dimensions, setDimensions] = useState(null)

  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect
      setDimensions({ width, height })
    })

    observer.observe(ref.current)

    return () => {
      observer.unobserve(ref.current)
      //取消监听某个DOM节点
    }
  }, [ref])

  return dimensions
}

export default useResizeObserver
