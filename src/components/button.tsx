import React from 'react';
import { View, Text, TouchableOpacity, TouchableOpacityProps, TextProps, ActivityIndicator } from 'react-native';

type CustomButtonProps = TouchableOpacityProps & {
    isLoading?: boolean
}

function Button({ isLoading = false, children, ...rest }: CustomButtonProps) {
    return (
        <TouchableOpacity 
            activeOpacity={0.7} 
            disabled={ isLoading }
            { ...rest }
        >
            <View className={`bg-secondary rounded-xl min-h-[62px] items-center justify-center`}>
                { isLoading ? 
                    <ActivityIndicator className='text-primary' /> 
                    : 
                    children
                }
            </View>
        </TouchableOpacity>
    )
}

function Title({ children }: TextProps) {
    return (
        <Text className={`text-primary font-semibold text-base`}>
            { children }
        </Text>
    )
}

Button.Title = Title;

export { Button };