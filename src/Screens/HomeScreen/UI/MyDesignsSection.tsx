import Icon from "@/Shared/Components/Core/Icon";
import ShowWhen from "@/Shared/Components/Core/ShowWhen";
import { Button } from "@/Shared/Components/UI/Buttons";
import PressableContainer from "@/Shared/Components/UI/Buttons/PressableContainer";
import { ThemeText, ThemeView } from "@/Shared/Stores/Theme/Components";
import { CameraRoll, PhotoIdentifier } from "@react-native-camera-roll/camera-roll";
import { useEffect, useState } from "react";
import { FlatList, Image, View } from "react-native";

export default function MyDesignsSection() {

    const [loading, setLoading] = useState(true);
    const [designs, setDesigns] = useState<Array<PhotoIdentifier['node']['image']>>([]);

    async function getDesigns() {
        try {
            setLoading(true);

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

    useEffect(() => {
        getDesigns();
    }, [])

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

            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                className="w-full"
                contentContainerClassName="gap-4 w-full"

                data={designs}
                keyExtractor={item => item.uri}
                renderItem={({item}) => (
                    <View className="aspect-square w-32 rounded-[12px] overflow-hidden relative" >
                        <Image
                            source={{uri: item.uri}}
                            className="w-full h-full object-cover"
                        />
                    </View>
                )}

                ListFooterComponent={
                    <PressableContainer color="bg-secondary" variant="soft-outlined" className="aspect-square w-32 rounded-[12px] overflow-hidden items-center justify-center gap-2" >
                        <Icon
                            name="Image"
                            size={40}
                            color="text-secondary"
                        />
                        <ThemeText color="text-secondary" className="font-semibold" >
                            {designs.length < 10 ? 'Create New' : 'See All'}
                        </ThemeText>
                    </PressableContainer>
                }

                ListEmptyComponent={
                    <View className="flex-row gap-4 w-full h-32" >
                        <ThemeView color="bg-secondary" className="w-full h-full rounded-[12px] items-center justify-center" >
                            <ThemeText color="text-secondary" >{loading ? 'Loading...' : 'No Designs Found'}</ThemeText>
                        </ThemeView>
                    </View>
                }
            />
        </ThemeView>
    )
}