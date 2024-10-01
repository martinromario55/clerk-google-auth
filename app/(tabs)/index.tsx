import { Image, StyleSheet, Platform, View, Text, Button } from 'react-native'

import { useAuth, useUser } from '@clerk/clerk-expo'
import { useEffect } from 'react'
import { useRouter } from 'expo-router'

export default function HomeScreen() {
  const { user } = useUser()
  const { signOut, isSignedIn } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isSignedIn) {
      router.push('/')
    }
  }, [isSignedIn])
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri:
            user?.imageUrl ??
            'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg',
        }}
        style={styles.image}
      />

      <View>
        <Text style={styles.text}>
          Welcome, {user?.emailAddresses[0].emailAddress}
        </Text>

        <Text style={styles.text}>{user?.fullName}</Text>
      </View>

      <Button
        title="Sign Out"
        onPress={async () => {
          await signOut()
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? 44 : 0,
    paddingBottom: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#007bff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
})
