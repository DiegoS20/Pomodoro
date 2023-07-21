import { useState, useEffect, useRef } from "react";
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Audio } from "expo-av";

import Header, { OPTIONS, TIMES } from "./src/components/Header";
import colors from "./src/resources/colors";
import Timer from "./src/components/Timer";

type CurrentTime = (typeof OPTIONS)[number];

export default function App() {
  const [time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState<CurrentTime>("Pomodoro");
  const [isActive, setIsActive] = useState(false);
  const timerInterval = useRef<NodeJS.Timer>();

  useEffect(() => {
    if (isActive) {
      timerInterval.current = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else clearInterval(timerInterval.current);

    return () => clearInterval(timerInterval.current);
  }, [isActive]);

  useEffect(() => {
    if (time > 0) return;

    clearInterval(timerInterval.current);
    setIsActive(false);
    setTime(TIMES[currentTime] * 60);
  }, [time]);

  const handleStartStop = () => {
    playSound();
    setIsActive((prevState) => !prevState);
  };

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/click.mp3")
    );

    await sound.playAsync();
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors[currentTime] }]}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: 15,
          paddingTop: Platform.OS == "android" ? 30 : undefined,
        }}
      >
        <Text style={styles.text}>Pomodoro</Text>
        <Header
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          setTime={setTime}
        />
        <Timer time={time} />
        <TouchableOpacity style={styles.StopStartBtn} onPress={handleStartStop}>
          <Text style={styles.StopStartText}>
            {isActive ? "STOP" : "START"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
  },
  StopStartText: {
    color: "#fff",
    fontWeight: "bold",
  },
  StopStartBtn: {
    backgroundColor: "#333333",
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
    alignItems: "center",
  },
});
