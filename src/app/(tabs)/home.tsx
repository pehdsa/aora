import React, { useState, } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { Header, Trending, EmptyState, VideoCard } from '@/components';
import { colors } from '@/styles/colors';
import { getAllPosts, getLatestPosts } from '../../../lib/appwrite';
import useAppwrite from '../../../lib/useAppwrite'; 
import { SafeAreaView } from 'react-native-safe-area-context';

import { useGlobalContext } from '../../../context/globalProvider';

const Home = () => {
    const { user } = useGlobalContext();
    const [refreshing, setRefreshing] = useState(false);
    const { data: posts, isLoading, refetch } = useAppwrite(getAllPosts);
    const { data: latestPosts } = useAppwrite(getLatestPosts);

    const handleRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    }

    return (
        <View className='bg-primary flex-1'>
            <SafeAreaView edges={[ 'top' ]} >
                <FlatList 
                    // contentContainerStyle={{ minHeight: '100%' }}
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
                        <> 
                        <Header 
                            title={ user.username }
                            subtitle='Welcome back,'
                            // handleSearch={handleSearch}
                        />                 
                        <Trending 
                            className='pt-4' 
                            posts={latestPosts ?? []} />
                        </>
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

export default Home;