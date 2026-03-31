import React, { useEffect, useState} from 'react'
import {
    View, Text, FlatList, TouchableOpacity, StyleSheet,
    ActivityIndicator, Image
} from 'react-native'

import {fetchExercisesByBodyPart} from '../../services/exerciseApi'
import {useRouter} from "expo-router";

const CATEGORIES = [
    'back', 'cardio', 'chest', 'lower arms', 'lower legs', 'neck',
    'shoulders', 'upper arms', 'upper legs', 'waist',
]
const CAT_IMAGES = [
    'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.7.2/icons/arrow-bar-up.svg',     // back
    'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.7.2/icons/activity.svg',        // cardio
    'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.7.2/icons/person.svg',          // chest
    'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.7.2/icons/hand-index.svg',      // lower arms
    'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.7.2/icons/person.svg',  // lower legs
    'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.7.2/icons/person-bounding-box.svg', // neck
    'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.7.2/icons/person-lines-fill.svg', // shoulders
    'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.7.2/icons/emoji-sunglasses.svg', // upper arms
    'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.7.2/icons/person.svg', // upper legs
    'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.7.2/icons/circle.svg',          // waist
]

export default function HomeScreen()
{
    const [selectedCategory, setSelectedCategory] = useState('chest')
    const [exercises, setExercises] = useState([])
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const loadExercises = async () => {
        setLoading(true)
        const data = await fetchExercisesByBodyPart(selectedCategory)
        console.log(data)
        setExercises(data)
        setLoading(false)
    }

    useEffect(() => {
        loadExercises()
    }, [selectedCategory]);


    const title = 'index'

    const styles = StyleSheet.create({
        container: {
            flex: 1, justifyContent: 'center',
            alignItems: 'center'
        },
        innerContainer: {
            flex: 1,
            paddingHorizontal: 20,
            paddingTop: 20,
            width: '80%'
        },
        header: {
            fontSize: 28,
            fontWeight: 'bold',
            marginBottom: 20,
            color: '#1a1a1a'
        },
        titleText: {
            fontSize: 16,
            fontWeight: '500',
            color: 'purple'
        },
        categoriesList: {
            flexGrow: 0,
            marginBottom: 20
        },
        categoryBtn: {
            flexDirection: 'row',
            marginBottom: 15,
            alignItems: 'center',
            backgroundColor: '#f9f9f9',
            borderRadius: 10,
            padding: 10,
            height: 40,
            justifyContent: 'center'
        },
        categoryBtnActive: {
            backgroundColor: '#007aff'
        },
        categoryText: {
            color: '#777',
            fontWeight: '600',

        },
        selectedCategoryText: {

        },

        img: {
            width: 60, height: 60, borderRadius: 10, marginRight: 15
        },
        cardName: {fontSize: 16, fontWeight: 'bold', textTransform: 'capitalize'},
        cardSub: {color: '#777'},
        exerciseCard: {
            flexDirection: 'row',
            backgroundColor: '#fff',
            borderRadius: 16,
            marginBottom: 16,
            padding: 12,
            shadowColor: '#000',
            shadowOffset: {
                width: 0, height: 2
            },
            shadowOpacity: 0.1
        },
        exerciseImage: {
            width: 90,
            height: 90,
            borderRadius: 12,
            backgroundColor: '#aaaaaa'

        },
        exerciseInfo: {
            marginLeft: 15,
            justifyContent: 'center',
            flex: 1
        },
        exerciseName: {
            fontSize: 18,
            fontWeight: 'bold',
            textTransform: 'capitalize',
            color: '#333'
        },
        exerciseTarget: {
            fontSize: 14,
            color: '#007aff',
            fontWeight: '500'
        },
        equipment: {
            fontSize: 12,
            color: '#888',
            marginTop: 2
        },
        loaderContainer: {
            flex: 1, justifyContent: 'center', alignItems: 'center'
        },
        loadingText: {
            marginTop: 10, color: '#777'
        },
        emptyText: {
            textAlign: 'center', marginTop: 50, color: '#555'
        }
    })

    const renderExerciseItem = ({item}: {item: any}) => (
        <TouchableOpacity
            style={styles.exerciseCard}
            onPress={() => {
                router.push({pathname: '/workout/[id]', params: {id: item.id, name: item.name, target: item.target, gifUrl: item.gifUrl}})
            }}
        >
            <img src={CAT_IMAGES[CATEGORIES.indexOf(selectedCategory)]} alt="" style={{width: 50, height: 50}}/>
            {/*<Image*/}
            {/*    source={{uri: CAT_IMAGES[CATEGORIES.indexOf(selectedCategory)]*/}
            {/*        //item.gifUrl*/}
            {/*}}*/}
            {/*    style={styles.exerciseImage}*/}
            {/*    resizeMode='cover'*/}
            {/*/>*/}

            <View style={styles.exerciseInfo}>
                <Text style={styles.exerciseName}>{item.name}</Text>
                <Text style={styles.exerciseTarget}>{item.target}</Text>
                <Text style={styles.equipment}>{item.equipment}</Text>

            </View>
        </TouchableOpacity>
    )


    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <Text style={styles.header}>{title}</Text>

                <View style={{marginTop: 4}}>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={CATEGORIES}
                        keyExtractor={(item: any) => item}
                        style={styles.categoriesList}
                        renderItem={({item}) => (
                            <TouchableOpacity
                                style={[styles.categoryBtn, selectedCategory === item && styles.categoryBtnActive]}
                                onPress={() => {
                                    setSelectedCategory(item)
                                }}
                            >
                                <Image source={{uri: CAT_IMAGES[CATEGORIES.indexOf(item)]}} style={styles.img}/>

                                <Text style={[styles.categoryText,
                                selectedCategory === item && styles.selectedCategoryText]}>
                                    {item.toLocaleUpperCase()}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>

                {loading ? (
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size={'large'} color={'#07aff'}/>
                        <Text style={styles.loadingText}>Loading</Text>
                    </View>
                ) : (
                    <FlatList data={exercises} renderItem={renderExerciseItem} keyExtractor={(item: any) => item.id} contentContainerStyle={{paddingBottom: 20}}
                        ListEmptyComponent={
                            <Text style={styles.emptyText}>
                                Nothing found.
                            </Text>
                        }
                    />
                )}

            </View>
        </View>
    )
}