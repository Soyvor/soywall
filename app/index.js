import { View, Text, StyleSheet, ImageBackground, Pressable, StatusBar, Dimensions } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { theme } from '../constants/theme';
import { useRouter } from 'expo-router';

// Utility functions for responsive design
const { width, height } = Dimensions.get('window');
const wp = (percentage) => (width * percentage) / 100;
const hp = (percentage) => (height * percentage) / 100;

const WelcomeScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={require('../assets/images/welcome.png')}
        style={styles.bgImage}
        resizeMode="cover"
      >
        {/* LinearGradient */}
        <Animated.View entering={FadeInDown.duration(600)} style={{ flex: 1 }}>
          <LinearGradient
            colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.5)', 'white']}
            style={styles.gradient}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
          />
          {/* Content */}
          <View style={styles.contentContainer}>
            <Animated.Text entering={FadeInDown.delay(400).springify()} style={styles.title}>
              Pixels
            </Animated.Text>
            <Animated.Text entering={FadeInDown.delay(500).springify()} style={styles.punchLine}>
              Every Pixel Tells a Story
            </Animated.Text>
            <Pressable onPress={() => router.push('home')} style={styles.startButton}>
              <Animated.Text entering={FadeInDown.delay(600).springify()} style={styles.startText}>
                Start Explore
              </Animated.Text>
            </Pressable>
          </View>
        </Animated.View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    width: wp(100),
    height: hp(110), // Adjust to cover half of the screen height
    position: 'absolute',
    top: 0,
    bottom: 0,
  },
  gradient: {
    width: wp(100),
    height: hp(120),
    position: 'absolute',
    bottom: 30,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 70,
  },
  title: {
    fontSize: 56,
    color: theme.colors.neutral(0.9),
    fontWeight: theme.fontWeights.bold,
  },
  punchLine: {
    fontSize: 16,
    letterSpacing: 1,
    marginBottom: 10,
    fontWeight: theme.fontWeights.medium,
  },
  startButton: {
    backgroundColor: theme.colors.black, // Use a primary color for contrast
    paddingVertical: 15,
    paddingHorizontal: 90,
    borderRadius: theme.radius.md,
    marginBottom: 70,
    borderColor: theme.colors.neutral(0.9), // Adding a border for more visibility
  },
  startText: {
    color: theme.colors.white, // Change the text color to white for better contrast
    fontWeight: theme.fontWeights.medium,
    fontSize: 24,
  },
});

export default WelcomeScreen;
