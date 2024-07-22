
import { useState, useEffect } from "react";
import { Alert } from "react-native";

//@ts-ignore
const useAppwrite = ((fn) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([] as Array<any>);

    useEffect(() => {
        fetchData()
    },[]);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fn();
            setData(response)
        } catch (error) {
            //@ts-ignore
            Alert.alert('Error', error)
        } finally {
            setIsLoading(false)
        }
        
    }

    const refetch = () => fetchData();

    return { data, isLoading, refetch }

})

export default useAppwrite;