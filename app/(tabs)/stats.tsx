import {View, Text, StyleSheet} from 'react-native'

export default  function Stats()
{
    const title = 'stats'

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
        </View>
    )
}