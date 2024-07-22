import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { Input } from './input';
import images from '../../constants/images';
import { router, usePathname } from 'expo-router';

type HeaderProps = {
    title: string,
    subtitle?: string,
    searchInitialValue?: string
}

export const Header = ({ title, subtitle, searchInitialValue = "" }: HeaderProps) => {
    const pathName = usePathname();
    const [searchText, setSearchText] = useState(searchInitialValue);

    const handleSearch = () => {
        if (searchText.length === 0) {
            return;
        }

        if (pathName.startsWith("/search")) {
            router.setParams({ searchText })
        } else {
            router.push(`/search/${ searchText }`);
        }
    }

    return (        
        <View className='mt-6 px-4 space-y-6'>
            <View className='justify-between items-start flex-row mb-6'>
                <View>
                    { !!subtitle && <Text className='font-medium text-sm text-gray-100'>{ subtitle }</Text> }
                    <Text className='text-2xl font-semibold text-white'>{ title }</Text>
                </View>
                <View className='mt-1.5'>
                    <Image 
                        source={ images.logoSmall }
                        className='w-9 h-10'
                        resizeMode='contain'
                    />
                </View>
            </View>    
            <Input className='pb-0'>
                <Input.Field 
                    keyboardType='default'
                    placeholder='Search for a video topic'
                    returnKeyType='done'
                    returnKeyLabel='Search'
                    onSubmitEditing={() => handleSearch()}
                    handleSearch={() => handleSearch()}
                    onChangeText={setSearchText}
                    value={searchText}
                    isSearch
                />
            </Input>                        
        </View>
    )
}