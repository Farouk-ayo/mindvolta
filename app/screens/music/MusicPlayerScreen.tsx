import React, { useState, useEffect } from "react";
import { SafeAreaView, StatusBar, View, Animated } from "react-native";
import { useRouter } from "expo-router";
import { MusicPlayerHeader } from "./MusicHeader";
import { AlbumArt } from "./AlbumArt";
import { ProgressBar } from "./ProgressBar";
import { MusicControls } from "./MusicControls";
import { SongInfo } from "./SongInfo";

export const MusicPlayerScreen: React.FC = () => {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(142);
  const [duration] = useState(267);

  const pulseAnim = new Animated.Value(1);
  const progressAnim = new Animated.Value(currentTime / duration);

  useEffect(() => {
    const pulse = () => {
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start(() => {
        if (isPlaying) pulse();
      });
    };

    if (isPlaying) {
      pulse();
      const interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev < duration) {
            const newTime = prev + 1;
            Animated.timing(progressAnim, {
              toValue: newTime / duration,
              duration: 1000,
              useNativeDriver: false,
            }).start();
            return newTime;
          }
          return prev;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isPlaying, duration, progressAnim, pulseAnim]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <MusicPlayerHeader title="Calming Music" onBack={() => router.back()} />

      <View className="flex-1 px-8 justify-center">
        <AlbumArt source={require("../../../assets/images/umbrella.png")} />

        <SongInfo title="My Umbrella" artist="David Shaw" />

        <ProgressBar
          currentTime={currentTime}
          duration={duration}
          progressAnim={progressAnim}
        />

        <MusicControls
          isPlaying={isPlaying}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          onPrevious={() => console.log("Previous")}
          onNext={() => console.log("Next")}
          onShuffle={() => console.log("Shuffle")}
          onRepeat={() => console.log("Repeat")}
          pulseAnim={pulseAnim}
        />
      </View>

      <View className="h-8" />
    </SafeAreaView>
  );
};

export default MusicPlayerScreen;
