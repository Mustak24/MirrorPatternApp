import { RANGE } from "../../../Types/number.type"
import Icon, { IconName } from "../../Core/Icon"
import RippleContainer, { RippleContainerProps } from "../../Core/RippleContainer"
import ShowWhen from "../../Core/ShowWhen"
import Loader, { LoaderProps } from "../Loader"
import { BUTTON_LAYOUT } from "./Utils/constance"
import { getButtonStyle } from "./Utils/functions"
import { ButtonSize, ButtonVariants } from "./Utils/types"


export type IconButtonProps = RippleContainerProps & {
    icon: IconName,
    
    variant?: ButtonVariants,
    size?: number | ButtonSize,
    rounded?: number | `${RANGE<0, 100>}%`,
    loading?: boolean,
    loaderName?: LoaderProps['name']
}

export default function IconButton({variant='soft', color='primary', icon, size='md', rounded='50%', loading=false, loaderName, disabled=false, ...props}: IconButtonProps) {

    const {color: textColor, ...style} = getButtonStyle(variant, color);

    const height = typeof size === 'number' ? size : BUTTON_LAYOUT[size].height;
    const borderWidth = !variant.includes('outline') ? 0 : typeof size === 'number' ? 1 : BUTTON_LAYOUT[size].borderWidth;
    return (
        <RippleContainer {...props}
            disabled={disabled}
            rippleScale={2}
            rippleColor={textColor}
            style={{
                ...style, 
                opacity: disabled ? 0.8 : 1,
                height, borderRadius: rounded, borderWidth, alignItems: 'center', justifyContent: 'center', aspectRatio: 1, 
            }}
        >
            <ShowWhen when={!loading} 
                otherwise={
                    <Loader name={loaderName} size={Math.floor(height * 0.6)} customColor={textColor} />
                }
            >
                <Icon customColor={textColor} name={icon} size={Math.floor(height * 0.6)} />
            </ShowWhen>
        </RippleContainer>
    )
}