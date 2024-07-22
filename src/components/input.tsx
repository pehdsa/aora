import React from 'react';
import { View, Text, ViewProps, TextProps, TextInput, TextInputProps, TouchableOpacity, Image } from 'react-native';

import icons from '../../constants/icons';

function Input({ children, className }: ViewProps){
    return (
        <View className={`pb-6 ${ className }`}>
            { children }
        </View>
    )
}

function Label({ children, ...rest }: TextProps) {
    return (
        <View className='pb-2'>
            <Text className='text-gray-100 font-medium text-base' { ...rest }>{ children }</Text>
        </View>
    )
}

type FieldProps = TextInputProps & {
    toggleSecureTextEntry?: () => void,
    handleSearch?: () => void
    isSearch?: boolean
}

function Field({ children, toggleSecureTextEntry, handleSearch, isSearch = false, ...rest }: FieldProps) {    

    return (
        <View className='relative'>
            { rest.keyboardType === 'visible-password' && (
                <View className='size-9 absolute top-1/2 right-4 z-20 -translate-y-1/2'>
                    <TouchableOpacity onPress={toggleSecureTextEntry}>
                        <View className='size-9'>
                            <Image 
                                source={ rest.secureTextEntry ? icons.eye : icons.eyeHide }
                                className='size-9'
                                resizeMode='contain'
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            ) }
            { (rest.keyboardType !== 'visible-password' && isSearch) && (
                <View className='size-5 absolute top-1/2 right-4 z-20 -translate-y-1/2'>
                    <TouchableOpacity onPress={handleSearch}>
                        <View className='size-5'>
                            <Image 
                                source={ icons.search }
                                className='size-5'
                                resizeMode='contain'
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            ) }
            <TextInput 
                className='relative z-10 w-full min-h-[58px] bg-black-100 rounded-lg border-black-200 border p-4 text-white font-semibold focus:border-secondary-200' 
                placeholderTextColor="#7B7B8B"
                { ...rest } 
            />
            
        </View>
    )
}

Input.Label = Label;
Input.Field = Field;

export { Input }