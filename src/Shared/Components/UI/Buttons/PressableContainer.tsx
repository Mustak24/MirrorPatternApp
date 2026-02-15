import RippleContainer, { RippleContainerProps } from "../../Core/RippleContainer";
import { getButtonStyle } from "./Utils/functions";
import { ButtonVariants } from "./Utils/types";



export type PressableContainerProps = RippleContainerProps & {
    variant?: ButtonVariants,
}

export default function PressableContainer({variant='soft', color='text', style, rippleScale=2, disabled=false, ...props}: PressableContainerProps) {

    const themeStyle = getButtonStyle(variant, color);

    return (
        <RippleContainer
            {...props}
            disabled={disabled}
            rippleScale={rippleScale}
            style={{
                borderWidth: color.includes('outlined') ? 2 : 0,
                ...themeStyle,
                ...style,
                opacity: disabled ? 0.8 : 1,
            }}
        />
    )
}