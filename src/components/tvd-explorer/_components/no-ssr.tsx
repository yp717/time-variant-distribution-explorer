import * as React from 'react'

const useEnhancedEffect =
  typeof window !== 'undefined' && process.env.NODE_ENV !== 'test'
    ? React.useLayoutEffect
    : React.useEffect

interface NoSSRProps {
  children: React.ReactNode
  defer?: boolean
  fallback?: React.ReactNode
}

const NoSSR = ({ children, defer = false, fallback = null }: NoSSRProps) => {
  const [isMounted, setMountedState] = React.useState(false)

  useEnhancedEffect(() => {
    if (!defer) setMountedState(true)
  }, [defer])

  React.useEffect(() => {
    if (defer) setMountedState(true)
  }, [defer])

  return isMounted ? children : fallback
}

export default NoSSR
