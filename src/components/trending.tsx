import React, { useState } from 'react';
import { View, Text, ViewProps, FlatList, TouchableOpacity, ImageBackground, ActivityIndicator, Image} from 'react-native';
import * as Animatable from "react-native-animatable"
import { Video, ResizeMode } from "expo-av";
 
import icons from '../../constants/icons';
import { colors } from '@/styles/colors';

type TrendingItemProps = {
    activeItem: any,
    item: any
}

type TrendingProps = ViewProps & {
    posts: Array<any>
}

const zoomIn = {
    0: {
        scale: 0.9
    },
    1: {
        scale: 1
    }
}

const zoomOut = {
    0: {
        scale: 1
    },
    1: {
        scale: 0.9
    }
}

const TrendingItem = ({ activeItem, item }: TrendingItemProps) => {
    const [play, setPlay] = useState(false)
    const [showPlay, setShowPlay] = useState(false)
    
    return (
        <Animatable.View
            className='mr-5 mb-4'
            //@ts-ignore
            animation={activeItem === item.$id ? zoomIn : zoomOut}
            duration={500}
        >
            { play ? (
                <View className='w-52 h-72 rounded-[35px] mt-3 bg-white/10 overflow-hidden my-5'>
                    <Video 
                        source={{ uri: item.video }}
                        style={{ width: '100%', height: '100%' }}
                        className='w-full h-full rounded-[35px] mt-3 bg-white/10'
                        resizeMode={ResizeMode.CONTAIN}
                        useNativeControls={true}
                        shouldPlay={true}
                        onPlaybackStatusUpdate={(status) => {
                            // if (status.didJustFinish) {
                            //     setPlay(false);
                            // }
                        }}
                    />
                </View>
            ) : (
                <TouchableOpacity activeOpacity={0.7} onPress={() => setPlay(true)}>
                    <View className='relative justify-center items-center bg-black-100 my-5 overflow-hidden rounded-[35px]' >
                        { showPlay && (
                            <Image 
                                source={ icons.play }
                                className='absolute top-1/2 left-1/2 size-12 -translate-x-1/2 -translate-y-1/2 z-30'
                                resizeMode='contain'
                            />
                        ) }
                        <ImageBackground 
                            source={{ uri: item.thumbnail }}
                            className='relative w-52 h-72 rounded-[35px] overflow-hidden shadow-lg shadow-black/40 z-20'
                            onLoadEnd={() => setShowPlay(true)}
                        />
                        <ActivityIndicator 
                            className='absolute top-1/2 left-1/2 size-4 -translate-x-1/2 -translate-y-1/2 z-[5]' 
                            color={colors.secondary.DEFAULT}
                        />
                    </View>
                </TouchableOpacity>
            ) } 
        </Animatable.View>
    )
}

export const Trending = ({ posts, ...rest }: TrendingProps) => {
    const [activeItem, setActiveItem] = useState(posts[1]);

    //@ts-ignore
    const viewableItemsChangle = ({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setActiveItem(viewableItems[0].key)
        }
    }

    return (
        <View { ...rest }>
            <Text className='text-gray-100 text-sm px-6'>Trending Videos</Text>
            <FlatList 
                data={posts}
                keyExtractor={item => item.$id}
                contentContainerStyle={{ paddingLeft: 24, paddingRight: 24 }}
                renderItem={({ item }) => (
                    <TrendingItem 
                        activeItem={activeItem} item={ item }
                    />
                )}
                onViewableItemsChanged={viewableItemsChangle}
                viewabilityConfig={{
                    itemVisiblePercentThreshold: 70
                }}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                pagingEnabled={true}
            />
        </View>  
    )
}