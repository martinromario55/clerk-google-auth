import { View, Text, Button, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as WebBrowser from 'expo-web-browser'
import { useAuth, useOAuth, useUser } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import { useRouter } from 'expo-router'

export const useWarmUpBrowser = () => {
  useEffect(() => {
    // Warm up the android browser to improve UX
    void WebBrowser.warmUpAsync()

    return () => {
      void WebBrowser.coolDownAsync()
    }
  }, [])
}

WebBrowser.maybeCompleteAuthSession()

const HomeScreen = () => {
  useWarmUpBrowser()
  const [loading, setLoading] = useState(false)
  const { user } = useUser()
  const { isSignedIn, isLoaded } = useAuth()
  const router = useRouter()
  console.log('User:', user)

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

  const onPress = React.useCallback(async () => {
    setLoading(true)
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow({
          redirectUrl: Linking.createURL('/', { scheme: 'myapp' }),
        })

      if (createdSessionId) {
        setActive!({ session: createdSessionId })
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error('OAuth error', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (isSignedIn) {
      router.replace('/(tabs)')
    }
  }, [isSignedIn])

  if (!isLoaded) {
    return <ActivityIndicator size={'large'} />
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>

      <Button
        title={loading ? 'Processing...' : 'Sign in with Google'}
        onPress={onPress}
        disabled={loading}
      />
    </View>
  )
}

export default HomeScreen
