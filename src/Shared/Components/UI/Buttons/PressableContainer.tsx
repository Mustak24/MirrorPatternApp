import RippleContainer, { RippleContainerProps } from "../../Core/RippleContainer";
import { getButtonStyle } from "./Utils/functions";
import { ButtonVariants } from "./Utils/types";



export type PressableContainerProps = RippleContainerProps & {
    variant?: ButtonVariants,
}

export default function PressableContainer({variant='soft', color='text', style, rippleScale=2, ...props}: PressableContainerProps) {

    const themeStyle = getButtonStyle(variant, color);

    return (
        <RippleContainer
            {...props}
            rippleScale={rippleScale}
            style={{
                ...themeStyle,
                ...style
            }}
        />
    )
}