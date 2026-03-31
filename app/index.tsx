import { Redirect } from 'expo-router'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { auth } from '../constants/FirebaseConfig'
export default  function Workout()
{
    const title = 'Index'

    if (auth.currentUser)
    {
        return <Redirect href='/(tabs)'/>
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1, justifyContent: 'center',
            alignItems: 'center'
        },
        titleText: {
            fontSize: 16,
            fontWeight: '500',
            color: 'purple'
        }
    })

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>{title}</Text>
            <ActivityIndicator size='large' color={'#007aff'}/>
        </View>
    )
}