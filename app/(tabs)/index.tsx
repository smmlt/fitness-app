import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { fetchExercises, fetchExercisesByBodyPart } from '../../services/exerciseApi';


const CATEGORIES = [
    'Cardio',
    'Back',
    'Biceps',
    'Triceps',
    'Shoulders',
    'Legs',
    'Abs',
    'Waist',
    'Chest',
    'Arms',
    'Calves',
    'Forearms',
    'Glutes',
    'Neck',
    'Upper Arms',
    'Lower Arms',
    'Upper Legs',
    'Lower Legs',
    'Full Body',
];

export default function HomeScreen() {
    const [selectedCategory, setSelectedCategory] = useState('Cardio');
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useState();

    const loadExercises = async () => {
        setLoading(true);
        const data = await fetchExercisesByBodyPart(selectedCategory);
        setExercises(data);
        setLoading(false);
    };

    useEffect(() => {
        loadExercises();

    }, [selectedCategory])

    
    const title = 'Головна сторінка';

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        titleText: {
            fontSize: 24,
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: 20,
            color: 'purple',
        },
    })

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>{title}</Text>
        </View>
    )
}