import React, { useEffect } from 'react';
import { View, Text, Image, SafeAreaView, ScrollView } from 'react-native';
import { Redirect, router } from 'expo-router';
import { Button } from '@/components/button';
import { useGlobalContext } from '../../context/globalProvider';

import images from "../../constants/images"
import { Loading } from '@/components';

export default function App() {
    const { isLoading, isLogedIn } = useGlobalContext();

    if (isLoading) return <Loading />

    if (isLogedIn) return <Redirect href={"/home"}  />

    return (       
        <View className='bg-primary'>
            <SafeAreaView>
                <ScrollView contentContainerStyle={{ height: '100%' }}>
                    <View className='w-full justify-center items-center h-full px-4'>
                        
                        <Image 
                            source={ images.logo }
                            className='w-[130px] h-[84px]'
                            resizeMode='contain'
                        />

                        <Image 
                            source={ images.cards }
                            className='max-w-[380px] w-full h-[300px]'
                            resizeMode='contain'
                        />

                        <View className='relative mt-5'>
                            <Text className='text-3xl text-white font-bold text-center'>
                                Discovery endless{'\n'}possibilities with{' '}
                                <View className='relative translate-y-1'>
                                    <Text className='text-secondary-200 text-3xl font-bold'>Aora</Text>
                                    <Image 
                                        source={images.path}
                                        className='w-[136px] h-[12px] absolute -bottom-3 -right-10'
                                        resizeMode='contain'
                                    />
                                </View>
                            </Text>                            
                        </View>

                        <Text className='text-gray-100 text-base text-center pt-5'>
                            Where Creativity Meets Innovation: Embark on a Journey of Limitless Exploration with Aora
                        </Text>

                        <View className='w-full pt-7'>
                            <Button
                                onPress={() => router.push('/sign-in')}
                            >
                                <Button.Title>Continue with Email</Button.Title>
                            </Button>
                        </View>

                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}