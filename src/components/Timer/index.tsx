import { Text, View } from "react-native";

import styles from "./styles";

export default function Timer({ time }: TimerProps) {
  const formattedMinutes = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");
  const formattedSeconds = (time % 60).toString().padStart(2, "0");
  return (
    <View style={styles.container}>
      <Text style={styles.time}>
        {formattedMinutes}:{formattedSeconds}
      </Text>
    </View>
  );
}

type TimerProps = {
  time: number;
};
