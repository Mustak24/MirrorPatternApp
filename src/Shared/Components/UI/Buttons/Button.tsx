import RippleContainer, { RippleContainerProps } from '@/Shared/Components/Core/RippleContainer';
import Icon, { IconName } from '@/Shared/Components/Core/Icon';
import { ButtonSize, ButtonVariants } from './Utils/types';
import { RANGE } from '@/Shared/Types/number.type';
import { getButtonStyle } from './Utils/functions';
import { BUTTON_LAYOUT } from './Utils/constance';
import ThemeText from '@/Shared/Stores/Theme/Components/ThemeText';
import ShowWhen from '@/Shared/Components/Core/ShowWhen';
import Loader, { LoaderProps } from '../Loader';

type ButtonProp = Omit<RippleContainerProps, 'rippleColor' | 'rippleScale'> & {
  title: string;

  startIcon?: IconName;
  endIcon?: IconName;
  variant?: ButtonVariants;
  size?: ButtonSize;
  rounded?: number | `${RANGE<0, 100>}%`;

  loading?: boolean;
  loaderName?: LoaderProps['name']
};


export default function Button({ title, startIcon, endIcon, variant = 'soft', color = 'primary', size = 'md', rounded, loading = false, loaderName, style, disabled=false, ...props}: ButtonProp) {
  
  const { color: textColor, borderColor, backgroundColor } = getButtonStyle(variant, color);

  const {fontSize, ...containerStyle} = {
    ...BUTTON_LAYOUT[size], 
    ...rounded !== undefined ? {borderRadius: rounded} : {}
  };

  return (
    <RippleContainer
      {...props}
      rippleColor={textColor}
      rippleScale={2}
      disabled={disabled}
      style={{ 
        backgroundColor, borderColor, flexDirection: 'row', gap: Math.floor(fontSize / 2), alignItems: 'center', justifyContent: 'center',
        ...containerStyle, 
        ...style,
        opacity: disabled ? 0.8 : 1,
      }}
    >
      <ShowWhen when={!loading}
        otherwise={
            <Loader name={loaderName} size={fontSize} customColor={textColor} />
        }
      >
        <ShowWhen when={!!startIcon}>
            <Icon name={startIcon as IconName} customColor={textColor} />
        </ShowWhen>
      </ShowWhen>

      <ThemeText textColor={textColor} style={{fontSize}} >{title}</ThemeText>
      
      <ShowWhen when={!!endIcon}>
        <Icon name={endIcon as IconName} customColor={textColor} />
      </ShowWhen>
    </RippleContainer>
  );
}
