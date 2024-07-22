import React from 'react';
import { View, Text, ViewProps, Image } from 'react-native';
import { router } from 'expo-router';

import { Button } from './button';
import images from '../../constants/images';

type EmptyStateProps = ViewProps & {
    title: string,
    subtitle: string
}

export const EmptyState = ({ title, subtitle, className}: EmptyStateProps) => {
    return (
        <View className={`justify-center items-center px-4 ${ className }`}>
            <Image 
                source={images.empty}
                className="w-[270px] h-[215px]"
                resizeMode="contain"
            />
            <Text className='text-2xl font-semibold text-white text-center'>{title}</Text>
            <Text className='font-medium text-sm text-gray-100 text-center mt-2'>{subtitle}</Text>
            <View className='w-full my-5'>
                <Button onPress={() => router.push("/create")}>
                    <Button.Title>Crate Video</Button.Title>
                </Button>
            </View>
        </View>
    )
}