import { Dispatch, SetStateAction } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import styles from "./styles";

export default function Header({
  currentTime,
  setCurrentTime,
  setTime,
}: HeaderProps) {
  const handlePress = (option: OptionsType) => {
    const newTime = TIMES[option];
    setCurrentTime(option);
    setTime(newTime * 60);
  };

  return (
    <View style={{ flexDirection: "row" }}>
      {OPTIONS.map((o, i) => (
        <TouchableOpacity
          key={i}
          style={[
            styles.itemStyle,
            currentTime != o && { borderColor: "transparent" },
          ]}
          onPress={() => handlePress(o)}
        >
          <Text style={{ fontWeight: "bold" }}>{o}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export const OPTIONS = ["Pomodoro", "Short Break", "Long Break"] as const;

export const TIMES = {
  Pomodoro: 25,
  "Short Break": 5,
  "Long Break": 15,
} as const;

type OptionsType = (typeof OPTIONS)[number];
type HeaderProps = {
  currentTime: OptionsType;
  setCurrentTime: Dispatch<SetStateAction<OptionsType>>;
  setTime: Dispatch<SetStateAction<number>>;
};
