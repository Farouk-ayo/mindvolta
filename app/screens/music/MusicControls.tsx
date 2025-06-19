import React from "react";
import { View, Animated } from "react-native";
import { ControlButton } from "./ControlButton";
import {
  Shuffle,
  SkipBack,
  Play,
  Pause,
  SkipForward,
  Repeat,
} from "lucide-react-native";

interface MusicControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onShuffle: () => void;
  onRepeat: () => void;
  pulseAnim: Animated.Value;
}

export const MusicControls: React.FC<MusicControlsProps> = ({
  isPlaying,
  onPlayPause,
  onPrevious,
  onNext,
  onShuffle,
  onRepeat,
  pulseAnim,
}) => (
  <View className="flex-row items-center justify-center space-x-8">
    <ControlButton
      source={<Shuffle size={20} color="#006C2D" />}
      onPress={onShuffle}
      size="small"
    />

    <ControlButton
      source={<SkipBack size={24} color="#006C2D" />}
      onPress={onPrevious}
      size="medium"
    />

    <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
      <ControlButton
        source={
          isPlaying ? (
            <Pause size={32} color="white" />
          ) : (
            <Play size={32} color="white" />
          )
        }
        onPress={onPlayPause}
        size="large"
        variant="primary"
      />
    </Animated.View>

    <ControlButton
      source={<SkipForward size={24} color="#006C2D" />}
      onPress={onNext}
      size="medium"
    />

    <ControlButton
      source={<Repeat size={20} color="#006C2D" />}
      onPress={onRepeat}
      size="small"
    />
  </View>
);
