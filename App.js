<script src="http://localhost:8097"></script>
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import { ScreenOrientation } from "expo";
import Border from './screens/Border'
import SplashScreen from "./screens/SplashScreen";
import HomeScreen from "./screens/HomeScreen";
import MenuScreen from "./screens/MenuScreen";
import GameScreen from "./screens/GameScreen";

API = "http://localhost:3000/categories";

export default function App() {
  const [gameState, setGameState] = useState("splash");
  const [categories, setCategories] = useState(null);
  const [chosenCategory, setChosenCategory] = useState(0)

  // fetch categories and empty array to stop refetches 
  useEffect(() => {
      async function fetchData() {
          const res = await fetch(API);
          res.json().then(result => setCategories(result));
      }

      fetchData();
  }, []);

  // set screen orientation 
  useEffect(() => {
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
    );
  });

  // change screen to home screen
  function goHome() {
    setGameState("home");
  }

  // change screen to menu screen
  function goMenu() {
    setGameState("menu");
  }

  function goGame() {
    setGameState('game')
  }

  function chooseCategory(id) {
    setChosenCategory(id)
  }

  // switch statement of which screen to render
  function screenChoice() {
    switch (gameState) {
      case "splash":
        return <SplashScreen goHome={goHome} />;
      case "home":
        return <HomeScreen goMenu={goMenu} />;
      case "menu":
        return <MenuScreen categories={categories} goGame={goGame} chooseCategory={chooseCategory}/>;
      case "game":
        return <GameScreen chosenCategory={chooseCategory}/>;
      default:
        return <HomeScreen />;
    }
  }

  return (
      <GameScreen categories={categories} />
  );
}

const styles = StyleSheet.create({
});
