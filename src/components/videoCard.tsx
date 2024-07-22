import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Video, ResizeMode } from "expo-av";

import icons from '../../constants/icons';
import images from '../../constants/images';
import { colors } from '@/styles/colors';

type VideoCardProps = {
    title:  string,
    creator: string,
    avatar: string,
    thumbnail: string,
    video: string
}

export const VideoCard = ({ title, creator, avatar, thumbnail, video }: VideoCardProps) => {
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [play, setPlay] = useState(false);
    const [showPlay, setShowPlay] = useState(false);

    const handleLoadEnd = () => {
        setShowPlay(true);
    }

    return (
        <View className='px-6 pb-8 relative gap-4'>
            <View className='relative flex-row items-center gap-2 z-20'>
                <View className='size-11 rounded-lg bg-white border-secondary border-2 overflow-hidden'>
                    <Image 
                        src={ avatar }
                        className='size-11'
                        resizeMode='contain'
                    />
                </View>
                <View className='flex-1'>
                    <Text numberOfLines={1} ellipsizeMode='tail' className='text-sm font-semibold text-white'>{ title }</Text>
                    <Text className='text-xs text-gray-100 mt-0.5'>{ creator }</Text>
                </View>
                <View className='relative size-6 z-10'>
                    <TouchableOpacity onPress={() => setMenuIsOpen(!menuIsOpen)}>
                        <Image 
                            source={icons.menu}
                            className='size-6'
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                    { menuIsOpen && (
                        <View className='absolute top-10 right-0 w-[110px] rounded bg-black-100 shadow py-2 gap-1 z-50'>
                            <TouchableOpacity>
                                <View className='gap-2 flex-row items-center justify-center py-2'>
                                    <Image 
                                        source={icons.bookmark}
                                        className='size-3'
                                        resizeMode='contain'
                                    />
                                    <Text className='text-center text-gray-100'>Save</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View className='gap-2 flex-row items-center justify-center py-2'>
                                    <Image 
                                        source={icons.trash}
                                        className='size-3'
                                        resizeMode='contain'
                                    />
                                    <Text className='text-center text-gray-100'>Delete</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ) }
                </View>
            </View>
            { play ? (
                <View className='aspect-video bg-white/10 rounded-xl z-10 overflow-hidden'>
                    <Video 
                        source={{ uri: video }}
                        style={{ width: '100%', height: '100%', backgroundColor: '#000' }}
                        resizeMode={ResizeMode.CONTAIN}
                        useNativeControls={true}
                        shouldPlay={true}
                        onError={(error) => console.log(error)}
                        onLoadStart={() => console.log('Iniciando o carregamento do vídeo')}
                        onLoad={() => console.log('Vídeo carregado')}
                        onReadyForDisplay={(event) => console.log(event)}
                        onPlaybackStatusUpdate={status => console.log(status)}
                    />
                </View>
            ) : (
                <TouchableOpacity onPress={() => setPlay(true)}>
                    <View className='relative bg-black-100 rounded-xl z-10 overflow-hidden'>
                        { showPlay && (
                            <Image 
                                source={ icons.play }
                                className='absolute top-1/2 left-1/2 size-12 -translate-x-1/2 -translate-y-1/2 z-20'
                                resizeMode='contain'
                            />
                        ) }
                        <Image 
                            src={ thumbnail }
                            className='relative aspect-video z-10'
                            resizeMode='cover'
                            loadingIndicatorSource={ images.path }
                            onLoadEnd={handleLoadEnd}
                        />
                        <ActivityIndicator 
                            className='absolute top-1/2 left-1/2 size-4 -translate-x-1/2 -translate-y-1/2 z-[5]' 
                            color={colors.secondary.DEFAULT}
                        />
                    </View>
                </TouchableOpacity>
            ) }
        </View>
    )
}