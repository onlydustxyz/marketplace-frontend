import UseStackContext from './useStackContext'
import { useSubscribe } from '../../react-subscriber/useSubscribe'
import { useEffect, useState } from 'react'
import { RefSubscriptionInterface } from '../../react-subscriber/types/RefSubscription'
import { StackInterface } from '../types/Stack'

export interface UseWatchProps {
  name: string
}

const UseWatch = (name: string) => {
  const {
    stackMethods: { get }
  } = UseStackContext()
  const [canWatch, setCanWatch] = useState<RefSubscriptionInterface<StackInterface> | null>(null)
  const stack = useSubscribe(canWatch || undefined)

  useEffect(() => {
    setCanWatch(get(name) as RefSubscriptionInterface<StackInterface> | null)
  }, [])

  return stack
}

export default UseWatch
