import { Stack } from 'expo-router'
import 'react-native-reanimated'
import { ClerkProvider } from '@clerk/clerk-expo'
import * as SecureStore from "expo-secure-store"

// Prevent the splash screen from auto-hiding before asset loading is complete.
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
  throw new Error(
    'Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY environment variable.'
  )
}

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ClerkProvider>
  )
}
