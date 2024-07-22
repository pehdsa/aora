import React, { useState } from 'react';
import { View, FlatList, RefreshControl, Image, Text, TouchableOpacity } from 'react-native';
import { useGlobalContext } from '../../../context/globalProvider'; 
import { SafeAreaView } from 'react-native-safe-area-context';

import { getUserPost, signOut } from '../../../lib/appwrite';
import useAppwrite from '../../../lib/useAppwrite'; 

import icons from '../../../constants/icons';
import { colors } from '@/styles/colors';
import { VideoCard, Header, EmptyState } from '@/components';
import { router } from 'expo-router';

export default function Profile() {
    const { user, setUser, setIsLogedIn } = useGlobalContext();
    const [refreshing, setRefreshing] = useState(false);
    //@ts-ignore
    const { data: posts, isLoading, refetch } = useAppwrite(() => getUserPost(user.$id));

    const handleRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    }

    const handleLogOut = async () => {
        await signOut();
        setUser(null)
        setIsLogedIn(false);
        router.replace("/sign-in")
    }

    return (
        <View className='bg-primary flex-1'>
            <SafeAreaView edges={[ 'top' ]} >
                <FlatList 
                    contentContainerStyle={{ minHeight: '100%' }}
                    data={posts}
                    keyExtractor={(item) => item.$id}
                    renderItem={({ item }) => (
                        <VideoCard 
                            title={ item.title } 
                            creator={ item.creator.username } 
                            avatar={ item.creator.avatar }
                            thumbnail={ item.thumbnail }
                            video={ item.video }
                        />
                    )}
                    ListHeaderComponent={() => {    
                        if (!!!user) return;
                        return (
                            <View className='relative items-center justify-center pt-6 pb-12 px-4 gap-6'>
                                
                                <View className='items-center gap-3'>
                                    <View className='size-14 border-2 border-secondary bg-white overflow-hidden rounded-lg'>
                                        <Image 
                                            src={ user.avatar }
                                            className='size-14'
                                            resizeMode='contain'
                                        />
                                    </View>
                                    <Text className='text-lg text-center font-semibold text-white'>{ user.username }</Text>
                                </View>
    
                                <View className='flex-row gap-7 items-center justify-center'>
                                    <View>
                                        <Text className='text-center text-xl font-semibold text-white'>{ posts.length }</Text>
                                        <Text className='text-center text-sm font-regular text-gray-100'>Posts</Text>
                                    </View>
                                    <View>
                                        <Text className='text-center text-xl font-semibold text-white'>1.2</Text>
                                        <Text className='text-center text-sm font-regular text-gray-100'>Views</Text>
                                    </View>
                                </View>
    
                                <View className='absolute top-4 right-6 size-6'>
                                    <TouchableOpacity onPress={handleLogOut} activeOpacity={0.7}>                                
                                        <Image 
                                            source={ icons.logout }
                                            className='size-6'
                                            resizeMode='contain'
                                        />
                                    </TouchableOpacity>
                                </View>
    
                            </View>
                        )
                    }}
                    ListEmptyComponent={() => {
                        if (!isLoading) {
                            return (
                                <EmptyState 
                                    title="No videos found"
                                    subtitle="Be the first one to upload a video"
                                />
                            )
                        }
                    }}
                    ListFooterComponent={() => (
                        <View className='h-4'></View>
                    )}
                    refreshControl={
                        <RefreshControl 
                            refreshing={refreshing}  
                            onRefresh={handleRefresh}
                            tintColor={colors.secondary.DEFAULT}
                        />
                    }
                />  
            </SafeAreaView>
        </View>
    )
}