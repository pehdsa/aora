import React, { useState } from 'react';
import { View, Text, Image, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { useGlobalContext } from '../../../context/globalProvider';
import { createUser } from '../../../lib/appwrite';

import { Button, Input } from '@/components';

import images from '../../../constants/images';

export default function SignUp() {
    const { setIsLogedIn, setUser } = useGlobalContext();
    const [isLoading, setIsLoading] = useState(false);
    const [ isHidden, setIsHidden ] = useState(true);
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = async () => {
        if (!userName || !email || !password) {
            return Alert.alert("Sign In", "Por favor, insira todos os campos");
        }
        setIsLoading(true);
        try {
            const newUser = await createUser({ email, password, username: userName });
            setIsLogedIn(true);
            setUser(newUser);
            
            router.push("/home");
        } catch (error: unknown) {
            if (error instanceof Error) {
                Alert.alert("Sign Up", error.message); // Acesse propriedades do Error
            } else {
                Alert.alert("Sign Up", "Um erro desconhecido ocorreu")
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

                        <Text className='text-2xl text-white font-semibold mt-10 pb-9'>Sign up</Text>

                        <Input>
                            <Input.Label>Username</Input.Label>
                            <Input.Field 
                                keyboardType='default'
                                autoCapitalize='none'
                                placeholder='Your unique username'
                                onChangeText={setUserName}
                                value={userName}
                            />
                        </Input>

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
                            <Input.Label>lalal</Input.Label>
                            <Input.Field 
                                keyboardType='visible-password'
                                secureTextEntry={isHidden}
                                toggleSecureTextEntry={() => setIsHidden(!isHidden)}
                                placeholder='Your password'
                                returnKeyType='done'
                                returnKeyLabel='Sign in'
                                onSubmitEditing={handleSignUp}
                                onChangeText={setPassword}
                                value={password}
                                
                            />
                        </Input>

                        <View className='w-full pt-2'>
                            <Button onPress={handleSignUp} isLoading={ isLoading }>
                                <Button.Title>Sign Up</Button.Title>
                            </Button>
                        </View>

                        <View className='pt-7 items-center justify-center'>
                            <Text className='text-center text-gray-100'>
                                Already have an account? <Link className="text-secondary font-bold" href={'/sign-in'}>Login</Link>
                            </Text>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    )
}