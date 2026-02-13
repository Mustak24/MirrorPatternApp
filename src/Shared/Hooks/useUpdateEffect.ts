import { DependencyList, EffectCallback, useEffect, useRef } from "react";


export default function useUpdateEffect(effect: EffectCallback, deps: DependencyList) {
  const mountedRef = useRef(false);

  useEffect(() => {
    if (mountedRef.current) {
      return effect();
    }
    
    mountedRef.current = true;
  }, deps);
}
