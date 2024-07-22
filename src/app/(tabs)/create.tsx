import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Keyboard, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Video, ResizeMode } from 'expo-av';
import * as ImagePicker from "expo-image-picker"
import * as DocumentPicker from "expo-document-picker"

import icons from '../../../constants/icons';
import { Input, Button } from '@/components';
import { router } from 'expo-router';

const Create = () => {
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);
    const [lastInputFocused, setLastInputFocused] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        video: null,
        thumbnail: null,
        prompt: ""
    });

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
          'keyboardWillShow',
          (e) => {
            setKeyboardHeight(e.endCoordinates.height);
            setKeyboardIsVisible(true);                
          }
        );
        const keyboardDidHideListener = Keyboard.addListener(
          'keyboardWillHide',
          () => {
            setKeyboardHeight(0);
            setKeyboardIsVisible(false);
          }
        );
    
        // Cleanup listeners on component unmount
        return () => {
          keyboardDidShowListener.remove();
          keyboardDidHideListener.remove();
        };
    }, []);

    const onSubmit = () => {
        if (!formData.title || !formData.thumbnail || !formData.prompt || formData.video) {
            Alert.alert("Please insert all fields");
            return;
        }
        setUploading(true);
        try {
            

            Alert.alert("Success", "Post uploaded");
            setFormData({ title: "",video: null,thumbnail: null,prompt: "" });
            router.push("/home")
        } catch (error) {
            Alert.alert("Upload Vidoe", "something wrong.")
        } finally {
            setUploading(false);
        }
    }

    const openPicker = async (selectType: 'video' | 'image') => {
        // const result = await ImagePicker.getDocumentAsync({
        //     type: selectType === 'image' 
        //     ? ['image/png', 'image/jpg', 'image/jpeg'] 
        //     : ['video/mp4', 'video/gif']
        // })
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: selectType === 'image' ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
            aspect: [4, 3],
            quality: 1
        })

        if (!result.canceled) {
            if(selectType === 'image') {
                //@ts-ignore
                setFormData({ ...formData, thumbnail: result.assets[0] })
            }
            if(selectType === 'video') {
                //@ts-ignore
                setFormData({ ...formData, video: result.assets[0] })
            }
        } else {
            // setTimeout(() => {
            //     Alert.alert("Document Picked", JSON.stringify(result, null, 2))
            // },100)
        }
    }

    return (
        <View className='bg-primary flex-1'>
            <SafeAreaView edges={[ 'top' ]} >
                <ScrollView contentContainerStyle={{ minHeight: '100%', }}>
                    <View 
                        style={{ marginTop: keyboardIsVisible && lastInputFocused ? -keyboardHeight : 0  }}                        
                        className='px-4 py-6'
                    >
                        <Text className='text-2xl text-white font-semibold pb-8'>Upload Videos</Text>

                        <Input>
                            <Input.Label>Video Title</Input.Label>
                            <Input.Field 
                                keyboardType='default'
                                placeholder='Give your video a catchy title...'
                                onChangeText={(e) => setFormData({ ...formData, title: e }) }
                                value={ formData.title }
                            />
                        </Input>

                        <Input>
                            <Input.Label>Upload Video</Input.Label>
                            <View className='relative z-10 w-full min-h-[158px] rounded-lg overflow-hidden'>
                                { formData.video ? (
                                    <Video 
                                        //@ts-ignore
                                        source={{ uri: formData.video.uri }}
                                        style={{ width: '100%', height: '100%', backgroundColor: '#000' }}
                                        resizeMode={ResizeMode.CONTAIN}
                                        useNativeControls={true}
                                        shouldPlay={true}
                                        onError={(error) => console.log(error)}
                                        onLoadStart={() => console.log('Iniciando o carregamento do vídeo')}
                                        onLoad={() => console.log('Vídeo carregado')}
                                        onReadyForDisplay={(event) => console.log(event)}
                                        onPlaybackStatusUpdate={status => console.log(status)}
                                    />
                                ) : (
                                    <TouchableOpacity onPress={() => openPicker('video')}>
                                        <View className='w-full h-[158px] items-center justify-center bg-black-100 border-black-200 border'>
                                            <View className='items-center justify-center size-12 border-2 border-secondary/60 border-dashed rounded-lg'>
                                                <Image 
                                                    source={ icons.upload }
                                                    className='size-6'
                                                    resizeMode='contain'
                                                />
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                ) }
                            
                            </View>
                        </Input>

                        <Input>
                            <Input.Label>Thumbnail Image</Input.Label>
                            { formData.thumbnail ? (
                                <View className='items-center justify-center relative z-10 w-full min-h-[158px] bg-black-100 rounded-lg border-black-200 border p-4'>
                                    <Image 
                                        //@ts-ignore
                                        source={{ uri: formData.thumbnail.uri }}
                                        className='w-full h-[158px]'
                                        resizeMode='contain'
                                    />
                                </View>
                            ) : (
                                <TouchableOpacity onPress={() => openPicker('image')}>
                                    <View className='items-center justify-center relative z-10 w-full min-h-[58px] bg-black-100 rounded-lg border-black-200 border p-4'>
                                        <View className='flex-row items-center justify-cente gap-1'>
                                            <Image 
                                                source={ icons.upload }
                                                className='size-5'
                                                resizeMode='contain'
                                            />
                                            <Text className='text-gray-100 text-base font-medium'>Choose a file</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ) } 
                        </Input>

                        <Input>
                            <Input.Label>AI Prompt</Input.Label>
                            <Input.Field 
                                keyboardType='default'
                                placeholder='The AI prompt of your video....'
                                returnKeyType='done'
                                returnKeyLabel='Submit'
                                onChangeText={(e) => setFormData({ ...formData, prompt: e }) }
                                value={ formData.prompt }
                                onSubmitEditing={onSubmit}
                                onFocus={() => setLastInputFocused(true)}
                                onBlur={() => setLastInputFocused(false)}
                            />
                        </Input>

                        <View className='pt-4'>
                            <Button onPress={onSubmit} isLoading={uploading}>
                                <Button.Title>Submit & Publish</Button.Title>
                            </Button>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

export default Create;