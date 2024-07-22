import React, { useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { searchPost } from '../../../lib/appwrite';
import useAppwrite from '../../../lib/useAppwrite'; 

import { VideoCard, Header, EmptyState } from '@/components';

export default function Search() {
    const { query } = useLocalSearchParams();
    //@ts-ignore
    const { data: posts, isLoading, refetch } = useAppwrite(() => searchPost(query));

    useEffect(() => {
        refetch();
    },[query])

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
                    ListHeaderComponent={() => (      
                        <Header 
                            title='Search results'
                            subtitle="teste"
                            //@ts-ignore
                            searchInitialValue={ query }
                        />                 
                    )}
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
                    // refreshControl={
                    //     <RefreshControl 
                    //         refreshing={refreshing}  
                    //         onRefresh={handleRefresh}
                    //         tintColor={colors.secondary.DEFAULT}
                    //     />
                    // }
                />  
            </SafeAreaView>
        </View>
    )
}