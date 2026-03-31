import React, { useEffect, useState} from 'react'
import {
    View, Text, FlatList, TouchableOpacity, StyleSheet,
    ActivityIndicator, Image
} from 'react-native'

import {fetchExercisesByBodyPart} from '../../services/exerciseApi'
import {useRouter} from "expo-router";

const CATEGORIES = [
    'back', 'cardio', 'chest', 'forearms', 'calves', 'neck',
    'biceps', 'triceps', 'shoulders', 'spinal erectors', 'legs',
    'quads'
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
    }

    useEffect(() => {
        loadExercises()
    }, [selectedCategory]);


    const title = 'login'

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