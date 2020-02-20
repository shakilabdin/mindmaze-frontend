import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import { ScreenOrientation } from "expo";
import SplashScreen from "./screens/SplashScreen";
import HomeScreen from "./screens/HomeScreen";
import MenuScreen from "./screens/MenuScreen";
import GameScreen from "./screens/GameScreen";

const { width, height } = Dimensions.get("window");

export default function App() {
  const [gameState, setGameState] = useState("splash");

  useEffect(() => {
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
    );
  });

  function goHome() {
    setGameState("home");
  }

  function goMenu() {
    setGameState("menu");
  }

  function screenChoice() {
    switch (gameState) {
      case "splash":
        return <SplashScreen goHome={goHome} />;
      case "home":
        return <HomeScreen goMenu={goMenu} />;
      case "menu":
        return <MenuScreen />;
      case "game":
        return <GameScreen />;
      default:
        return <HomeScreen />;
    }
  }

  return (
      <Image
        style={styles.canvas}
        source={require("./assets/border.png")}
      />
  );
}

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    // remove width and height to override fixed static size
    width: null,
    height: null,
    resizeMode: "stretch"
  }
});
