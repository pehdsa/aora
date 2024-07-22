import React, { useState } from 'react';
import { View, Text, ScrollView, Image, KeyboardAvoidingView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, Link } from 'expo-router';
import { getCurrentUser, signIn } from '../../../lib/appwrite';
import { useGlobalContext } from '../../../context/globalProvider';

import { Button, Input } from '@/components';

import images from '../../../constants/images';

export default function SignIn() {
    const { setUser, setIsLogedIn } = useGlobalContext();
    const [isLoading, setIsLoading] = useState(false);
    const [isHidden, setIsHidden] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = async () => {
        if (!email || !password) {
            return Alert.alert("Sign In", "Por favor, insira todos os campos");
        }
        setIsLoading(true);
        try {
            await signIn({ email, password });
            const currentUser = await getCurrentUser();
            setUser(currentUser);
            setIsLogedIn(true);

            router.push("/home");
        } catch (error: unknown) {
            if (error instanceof Error) {
                Alert.alert("Sign In", error.message); // Acesse propriedades do Error
            } else {
                Alert.alert("Sign In", "Um erro desconhecido ocorreu")
                console.error('Um erro desconhecido ocorreu:', error);
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <SafeAreaView className='flex-1 bg-primary'>
            <ScrollView contentContainerStyle={{ height: '100%' }}>
                <KeyboardAvoidingView behavior='padding' className='flex-1 justify-center px-6 my-6'>
                    <View>
                        <Image 
                            source={images.logo}
                            className='w-[115px] h-[35px]'
                            resizeMode='contain'
                        />

                        <Text className='text-2xl text-white font-semibold mt-10 pb-9'>Sign in</Text>

                        <Input>
                            <Input.Label>E-mail</Input.Label>
                            <Input.Field 
                                keyboardType='email-address'
                                autoCapitalize='none'
                                placeholder='Your email'
                                onChangeText={setEmail}
                                value={email}
                            />
                        </Input>

                        <Input>
                            <Input.Label>Password</Input.Label>
                            <Input.Field 
                                keyboardType='visible-password'
                                secureTextEntry={isHidden}
                                toggleSecureTextEntry={() => setIsHidden(!isHidden)}
                                placeholder='Your password'
                                returnKeyType='done'
                                returnKeyLabel='Sign in'
                                onSubmitEditing={handleSignIn}
                                onChangeText={setPassword}
                                value={password}
                            />
                        </Input>

                        <View className='w-full pt-2'>
                            <Button onPress={handleSignIn} isLoading={isLoading}>
                                <Button.Title>Sign In</Button.Title>
                            </Button>
                        </View>

                        <View className='pt-7 items-center justify-center'>
                            <Text className='text-center text-gray-100'>
                                Don’t have an account? <Link className="text-secondary font-bold" href={'/sign-up'}>Signup</Link>
                            </Text>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    )
}