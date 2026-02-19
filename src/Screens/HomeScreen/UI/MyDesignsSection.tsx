import { navigationRef } from "@/Navigation";
import Icon from "@/Shared/Components/Core/Icon";
import ShowWhen from "@/Shared/Components/Core/ShowWhen";
import { Button } from "@/Shared/Components/UI/Buttons";
import PressableContainer from "@/Shared/Components/UI/Buttons/PressableContainer";
import Loader from "@/Shared/Components/UI/Loader";
import PatternPreviewModal from "@/Shared/Components/UI/Modals/PatternPreviewModal";
import useImagePicker, { MEDIA_PERMISSION_NAME } from "@/Shared/Hooks/useImagePicker";
import usePermission from "@/Shared/Hooks/usePermission";
import { ThemeText, ThemeView } from "@/Shared/Stores/Theme/Components";
import { CameraRoll, PhotoIdentifier } from "@react-native-camera-roll/camera-roll";
import { useRef, useState } from "react";
import { FlatList, Image, View } from "react-native";

export default function MyDesignsSection() {

    const {permissionStatus, requestPermission} = usePermission({
        permission: MEDIA_PERMISSION_NAME,
        autoRequest: true,
        onGrant: getDesigns
    })

    const {openImagePicker, Modal} = useImagePicker((imagePath) => {
        navigationRef.navigate('MirrorPattern', {imagePath});
    })

    const [loading, setLoading] = useState(false);
    const [designs, setDesigns] = useState<Array<PhotoIdentifier['node']['image']>>([]);

    const previewPatternPath = useRef('');
    const [isPatternPreviewModalVisible, setIsPatternPreviewModalVisible] = useState(false);

    async function getDesigns() {
        try {
            setLoading(true);
            setDesigns([]);

            const assets = await CameraRoll.getPhotos({
                first: 10,
                assetType: 'Photos',
                groupName: 'Mirror Patterns',
            });
            
            setDesigns(assets.edges.map(e => e.node.image));
        } catch(e) {
            console.error('failed to load designs', e)
        } finally {
            setLoading(false);
        }
    }

    return (
        <ThemeView className="gap-4 flex-1" >
            <View className="flex-row items-center gap-2 justify-between" >
                <ThemeText className="text-xl font-bold" >My Designs</ThemeText>

                <ShowWhen when={designs.length > 10} >
                    <Button
                        disabled
                        variant="text"
                        title="See All"
                        onPress={() => { }}
                    />
                </ShowWhen>
            </View>

            <View className="relative h-34 flex-row items-center" >
                <View
                    className="w-full h-full flex-row items-center"
                    style={{display: !!designs.length ? 'flex' : 'none'}}
                >      
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        
                        className="w-full rounded-xl"
                        contentContainerClassName="flex-row items-center gap-4 flex-wrap"

                        data={designs}
                        keyExtractor={item => item.uri}

                        renderItem={({item}) => (
                            <PressableContainer
                                className="aspect-square w-32 rounded-[12px] overflow-hidden relative" 
                                color="bg-secondary"
                                onPress={() => {
                                    previewPatternPath.current = item.uri;
                                    setIsPatternPreviewModalVisible(true);
                                }}
                            >
                                <Image
                                    source={{uri: item.uri}}
                                    className="w-full h-full object-cover"
                                />
                            </PressableContainer>
                        )}

                        ListFooterComponent={
                            <ShowWhen when={!!designs.length}>
                                <PressableContainer 
                                    color="bg-secondary" 
                                    variant="soft-outlined" 
                                    className="aspect-square w-32 rounded-[12px] overflow-hidden items-center justify-center gap-2" 
                                    onPress={openImagePicker}
                                >
                                    <Icon
                                        name="Image"
                                        size={40}
                                        color="text-secondary"
                                    />
                                    <ThemeText color="text-secondary" className="font-semibold" >
                                        {designs.length < 10 ? 'Create New' : 'See All'}
                                    </ThemeText>
                                </PressableContainer>
                            </ShowWhen>
                        }

                    />
                </View>
                

                <ThemeView color="bg-secondary" className="h-32 w-full rounded-xl overflow-hidden items-center justify-center" 
                    style={{display: !!designs.length ? 'none' : 'flex'}} 
                >
                    <ShowWhen when={permissionStatus === 'granted'} 
                        otherwise={
                            <View className="w-full h-full items-center justify-center gap-1" >
                                <Button
                                    startIcon="Shield"
                                    title="Give Access"
                                    onPress={requestPermission}
                                />

                                <ThemeText>
                                    For display your design give media read access
                                </ThemeText>
                            </View>
                        }
                    >
                        <View className="w-full h-full items-center justify-center gap-1" >
                            <ShowWhen when={!loading} 
                                otherwise={<Loader size={40} color="text-secondary" />}
                            >
                                <Icon name="ImageOff" size={40} color="text-secondary" />
                            </ShowWhen>

                            <ThemeView color="bg-secondary" className="w-full items-center justify-center" >
                                <ThemeText color="text-secondary" >
                                    <ShowWhen when={!loading} 
                                        otherwise="Finding Designs..." 
                                    >
                                        No Designs Found
                                    </ShowWhen>
                                </ThemeText>
                            </ThemeView>
                        </View>
                    </ShowWhen>
                </ThemeView>
            </View>

            <Modal/>
            <PatternPreviewModal
                imagePath={previewPatternPath.current}

                visible={isPatternPreviewModalVisible}
                setVisible={setIsPatternPreviewModalVisible}
            />
        </ThemeView>
    )
}