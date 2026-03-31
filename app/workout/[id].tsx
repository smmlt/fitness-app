import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { auth, db } from '@/constants/FirebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import { addDoc, collection } from "@firebase/firestore";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";

export default function Workout() {
    const title = 'Exercise details';
    const { id, name, target } = useLocalSearchParams();
    const [seconds, setSeconds] = useState(0);
    const router = useRouter();
    const [isActive, setIsActive] = useState(true);

    const intervalRef = useRef<any>(null);

    useEffect(() => {
        if (isActive) {
            intervalRef.current = setInterval(() => {
                setSeconds((s) => s + 1);
            }, 1000);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isActive]);

    let reps = Math.floor(seconds * 0.4);
    let calories = parseFloat((seconds * 0.12).toFixed(1));

    const finish = async () => {
        try {
            await addDoc(collection(db, 'stats'), {
                userId: auth.currentUser?.uid,
                exerciseID: id,
                exerciseName: name,
                duration: seconds,
                calories: calories,
                reps: reps,
                target: target,
                date: new Date().toISOString()
            });

            alert(`used ${(seconds * 0.12).toFixed(1)} cal`);

            router.replace('/(tabs)/stats');
        } catch (e: any) {
            alert(e.message);
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        titleText: {
            fontSize: 16,
            fontWeight: '500',
            color: 'purple'
        },
        captionText: {},
        backBtn: {
            paddingTop: 20,
            width: 50,
            height: 50
        },
        targetText: {},
        content: {},
        timerContainer: {
            alignItems: 'center',
            marginBottom: 30
        },
        timerText: {
            fontSize: 75,
            fontWeight: '500',
            color: '#1a1a1a'
        },
        timerLabel: {
            fontSize: 18
        },
        statsRow: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
            marginBottom: 40
        },
        statBox: {
            alignItems: 'center'
        },
        statValue: {
            fontSize: 24,
            fontWeight: '500'
        },
        statLabel: {},
        finishBtn: {
            backgroundColor: '#ff3030',
            width: '100%',
            alignItems: 'center',
            padding: 18
        },
        finishBtnText: {
            color: '#fff'
        },
        pauseBtn: {
            backgroundColor: '#555',
            width: '100%',
            alignItems: 'center',
            padding: 18,
            marginTop: 10
        }
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backBtn} onPress={() => { router.back() }}>
                <Ionicons name='arrow-back' />
            </TouchableOpacity>

            <View style={styles.content}>
                <Text style={styles.titleText}>{title}</Text>
                <Text style={styles.captionText}>{name}</Text>
                <Text style={styles.targetText}>{target}</Text>
            </View>

            <View style={styles.timerContainer}>
                <Text style={styles.timerText}>
                    {Math.floor(seconds / 60).toString().padStart(2, '0')}:
                    {(seconds % 60).toString().padStart(2, '0')}
                </Text>

                <Text style={styles.timerLabel}>
                    TRAINING TIME
                </Text>

                <View style={styles.statsRow}>
                    <View style={styles.statBox}>
                        <Text style={styles.statValue}>{reps}</Text>
                        <Text style={styles.statLabel}>Reps</Text>
                    </View>
                </View>

                <View style={styles.statsRow}>
                    <View style={styles.statBox}>
                        <Text style={styles.statValue}>{calories}</Text>
                        <Text style={styles.statLabel}>Kcal</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.pauseBtn}
                    onPress={() => setIsActive(prev => !prev)}
                >
                    <Text style={styles.finishBtnText}>
                        {isActive ? 'Pause' : 'Resume'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.finishBtn} onPress={finish}>
                    <Text style={styles.finishBtnText}>Finish</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}