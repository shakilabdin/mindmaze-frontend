<script src="http://localhost:8097"></script>;
import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { ScreenOrientation } from "expo";
import { Provider as PaperProvider } from "react-native-paper";
import { Audio } from "expo-av";
import SplashScreen from "./screens/SplashScreen";
import HomeScreen from "./screens/HomeScreen";
import MenuScreen from "./screens/MenuScreen";
import GameScreen from "./screens/GameScreen";
import EndGameScreen from "./screens/EndGameScreen";
import MazeScreen from "./screens/MazeScreen"

const API = "http://localhost:3000/";

export default function App() {
    const [gameState, setGameState] = useState("splash");
    const [categories, setCategories] = useState(null);
    const [user, setUser] = useState({ id: 0, name: "" });
    const [chosenCategory, setChosenCategory] = useState(1);
    const [scoredPoints, setScoredPoints] = useState(0);
    console.disableYellowBox = true;

    // fetch categories and empty array to stop re-fetches
    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`${API}/categories`);
            res.json().then(result => setCategories(result));
        }

        fetchData();
    }, []);

    // set screen orientation
    useEffect(() => {
        ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
        );
    });

    // start bgm
    useEffect(() => {
        (async () => {
            const soundObject = new Audio.Sound();
            try {
                await soundObject.loadAsync(require("./assets/bgm.mp3"));
                await soundObject.setIsLoopingAsync(true);
                await soundObject.playAsync();
                // Your sound is playing!
            } catch (error) {
                // An error occurred!
            }
        })();
    }, []);

    // change screen to home screen
    function goHome() {
        setGameState("home");
    }

    // change screen to menu screen
    function goMenu() {
        setGameState("menu");
    }

    // change screen to game screen
    function goGame() {
        setGameState("game");
    }

    function goEndGame() {
        setGameState("endgame");
    }

    // switch statement of which screen to render
    function screenChoice() {
        switch (gameState) {
            case "splash":
                return <SplashScreen goHome={goHome} />;
            case "home":
                return (
                    <HomeScreen goMenu={goMenu} user={user} setUser={setUser} />
                );
            case "menu":
                return (
                    <MenuScreen
                        categories={categories}
                        goGame={goGame}
                        goHome={goHome}
                        setChosenCategory={setChosenCategory}
                    />
                );
            case "game":
                return (
                    <GameScreen
                        chosenCategory={chosenCategory}
                        goHome={goHome}
                        goEndGame={goEndGame}
                        setScoredPoints={setScoredPoints}
                        user={user}
                    />
                );
            case "endgame":
                return (
                    <EndGameScreen
                        scoredPoints={scoredPoints}
                        goHome={goHome}
                        goMenu={goMenu}
                        setUser={setUser}
                        chosenCategory={chosenCategory}
                        user={user}
                    />
                );
            default:
                return <HomeScreen />;
        }
    }

    // function to post game *********WIP***********
    function postGame(score) {
        let bodyObj = {
            user_id: user.id,
            category_id: chosenCategory,
            score: score
        };

        let postObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                accepts: "application/json"
            },
            body: JSON.stringify(bodyObj)
        };
        fetch(`${API}/games`, postObj);
    }

    return (
        <PaperProvider>
            <View style={styles.root}>
                {screenChoice()}
                {/* <MazeScreen /> */}
            </View>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1
    }
});
