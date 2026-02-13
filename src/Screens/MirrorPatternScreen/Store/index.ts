import { createStoreProvider } from "@funtools/store";
import { Patterns } from "../Const/patterns";

const { Provider, useHandlers, useStore } = createStoreProvider({
    states: {
        selectPattern: '2T-1' as Patterns
    }
})


export {
    Provider as MirrorPatternProvider,
    useHandlers as useMirrorPatternHandlers,
    useStore as useMirrorPatternStore
}