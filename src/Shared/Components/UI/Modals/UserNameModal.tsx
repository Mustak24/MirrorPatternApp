import { useState } from 'react';
import { View, TextInput } from 'react-native';
import { CenterModal } from '../../Core/Modals';
import { CenterModalProps } from '../../Core/Modals/CenterModal';
import Button from '../Buttons/Button';
import ThemeText from '@/Shared/Stores/Theme/Components/ThemeText';
import { useThemeStore } from '@/Shared/Stores/Theme';
import { IconButton } from '../Buttons';
import { IconName } from '../../Core/Icon';
import { useAppHandlers, useAppStore } from '@/Shared/Stores/App';
import useUpdateEffect from '@/Shared/Hooks/useUpdateEffect';




export type UserNameModalProps = Omit<CenterModalProps, 'children'> & {
  type: keyof typeof MODAL_CONTENT;
};

export default function UserNameModal({ type, ...props }: UserNameModalProps) {
  
    const themeColors = useThemeStore(store => store.colors);

    const _userName = useAppStore(store => store.userName);
    const {updateUserName} = useAppHandlers();

    const [inputInfo, setInputInfo] = useState({
        name: _userName, error: '', showError: false
    });

    function handleInputInfo<K extends keyof typeof inputInfo>(key: K, value: typeof inputInfo[K]) {
        setInputInfo(pre => ({...pre, [key]: value}));
    }

    function handleOnChangeText(name: string) {
        handleInputInfo('showError', false);
        handleInputInfo('name', name);
        handleInputInfo('error', validateName(name));
    }


    function handleSave() {
        if(inputInfo.error) return handleInputInfo('showError', true);
        updateUserName(inputInfo.name);
        props.setVisible(false);
    }

    useUpdateEffect(() => {
        handleInputInfo('name', _userName);
    }, [props.visible])

    return (
        <CenterModal {...props}>
            <View className='pb-4'>
                <View className='flex-row items-center gap-1 justify-between' >
                    <ThemeText className='text-2xl font-bold pl-4' >
                        {MODAL_CONTENT[type].title}
                    </ThemeText>

                    <IconButton
                        icon='X'
                        color='text'
                        variant='text'
                        onPress={() => props.setVisible(false)}
                    />
                </View>

                <View className='px-4 gap-4' >
                    <ThemeText color='text-secondary' className='text-lg' >
                        {MODAL_CONTENT[type].description}
                    </ThemeText>

                    <View>
                        <View className='flex-row items-center gap-1 justify-between' >
                            <ThemeText>Your Name</ThemeText>
                            <ThemeText color={inputInfo.name.length > NAME_MAX_LENGTH ? 'error' : 'text'} className='text-xs text-error' >
                                {inputInfo.name.length} / {NAME_MAX_LENGTH}
                            </ThemeText>
                        </View>

                        <TextInput
                            className="text-base px-4 py-3.5 rounded-xl border-2 font-medium"
                            style={{
                                borderColor: inputInfo.error ? themeColors.error : themeColors.bgSecondary,
                                color: inputInfo.showError ? themeColors.error : themeColors.text,
                            }}

                            value={inputInfo.name}
                            onChangeText={handleOnChangeText}
                            placeholder="Enter your name"
                            placeholderTextColor={themeColors.textSecondary}
                            maxLength={NAME_MAX_LENGTH + 10}
                            autoFocus
                            autoCapitalize="words"


                            onSubmitEditing={handleSave}
                        />

                        <ThemeText color='error' style={{opacity: inputInfo.showError ? 1 : 0}} >
                            {inputInfo.error}
                        </ThemeText>
                    </View>
                    
                    <Button
                        title={MODAL_CONTENT[type].buttonTitle}
                        variant="soft"
                        color="primary"
                        onPress={handleSave}
                        startIcon={MODAL_CONTENT[type].buttonIcon}
                        className="w-full"
                    />
                </View>
            </View>
        </CenterModal>
    );
}



const MODAL_CONTENT = {
    'CREATE': {
        title: '👋 Welcome!',
        description: 'Let\'s get started by adding your name',
        buttonTitle: 'Get Started',
        buttonIcon: 'CircleCheck',
    },
    'UPDATE': {
        title: '✏️ Update Your Name',
        description: 'Enter your new name below',
        buttonTitle: 'Save Changes',
        buttonIcon: 'Save',
        
    }
} as Record<'CREATE' | 'UPDATE', { title: string; description: string; buttonTitle: string; buttonIcon: IconName; }>


const NAME_MAX_LENGTH = 24;
const NAME_MIN_LENGTH = 2;

function validateName(name: string) {
    if(name.length < NAME_MIN_LENGTH) {
        return `Name must be at least ${NAME_MIN_LENGTH} characters long`;
    }

    if(name.length > NAME_MAX_LENGTH) {
        return `Name must be at most ${NAME_MAX_LENGTH} characters long`;
    }

    return '';
}