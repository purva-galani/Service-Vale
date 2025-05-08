import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { account } from '../../lib/appwrite';

export default function VerifyEmail() {
    const { userId, secret } = useLocalSearchParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                if (!userId || !secret) {
                    throw new Error('Verification link is incomplete');
                }

                // Convert to string if they're arrays
                const userIdStr = Array.isArray(userId) ? userId[0] : userId;
                const secretStr = Array.isArray(secret) ? secret[0] : secret;

                await account.updateVerification(userIdStr, secretStr);
                
                Alert.alert(
                    'Email Verified', 
                    'Your email has been successfully verified! You can now log in.',
                    [{ text: 'OK', onPress: () => router.replace('/login') }]
                );
            } catch (error) {
                console.error('Verification Error:', error);
                setError(error instanceof Error ? error.message : 'Verification failed');
                Alert.alert(
                    'Verification Error',
                    'The verification link is invalid or has expired. Please request a new one.',
                    [{ text: 'OK', onPress: () => router.replace('/login') }]
                );
            } finally {
                setLoading(false);
            }
        };

        verifyEmail();
    }, [userId, secret]);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
                <Text style={{ marginTop: 16 }}>Verifying your email...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'red', marginBottom: 16 }}>{error}</Text>
            </View>
        );
    }

    return null;
}