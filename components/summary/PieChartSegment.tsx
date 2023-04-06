import React from "react";
import { Circle } from "react-native-svg";
import Animated, {
  interpolate,
  useAnimatedProps,
} from "react-native-reanimated";

const size = 200;
const strokeWidth = 4;
const center = size / 2;
const radius = (size - strokeWidth) / 2;
const circumference = 2 * Math.PI * radius;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const PieChartSegment: React.FC<{
  color: string;
  angle: number;
  percent: number;
  progress: Animated.SharedValue<number>;
}> = ({ color, angle, percent, progress }) => {
  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = interpolate(
      progress.value,
      [0, 1],
      [circumference, circumference * (1 - percent)],
    );
    const rotateAngle = interpolate(progress.value, [0, 1], [0, angle]);

    return {
      strokeDashoffset,
      transform: [
        { translateX: center },
        { translateY: center },
        { rotate: `${rotateAngle}deg` },
        { translateX: -center },
        { translateY: -center },
      ],
    };
  });

  return (
    <AnimatedCircle
      cx={center}
      cy={center}
      r={radius}
      strokeWidth={strokeWidth}
      stroke={color}
      strokeDasharray={circumference}
      originX={center}
      originY={center}
      // @ts-ignore
      animatedProps={animatedProps}
    />
  );
};

export default PieChartSegment;
