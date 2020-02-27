<script src="http://localhost:8097"></script>;
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import { ScreenOrientation } from "expo";
import { Provider as PaperProvider } from "react-native-paper";
import SplashScreen from "./screens/SplashScreen";
import HomeScreen from "./screens/HomeScreen";
import MenuScreen from "./screens/MenuScreen";
import GameScreen from "./screens/GameScreen";

API = "http://localhost:3000/";

export default function App() {
    const [gameState, setGameState] = useState("splash");
    const [categories, setCategories] = useState(null);
    const [user, setUser] = useState("");
    const [chosenCategory, setChosenCategory] = useState(0);

    // fetch categories and empty array to stop refetches
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

    // switch statement of which screen to render
    function screenChoice() {
        switch (gameState) {
            case "splash":
                return <SplashScreen goHome={goHome} />;
            case "home":
                return <HomeScreen goMenu={goMenu} />;
            case "menu":
                return (
                    <MenuScreen
                        categories={categories}
                        goGame={goGame}
                        setChosenCategory={setChosenCategory}
                    />
                );
            case "game":
                return <GameScreen chosenCategory={chooseCategory} />;
            case "endgame":
                return null;
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


    console.log(chosenCategory)
    
    return (
        <PaperProvider>
            <View style={styles.root}>
                {/* <SplashScreen /> */}
                {/* <HomeScreen /> */}
                <MenuScreen categories={categories} setChosenCategory={setChosenCategory}/>
                {/* <GameScreen categories={categories} /> */}
            </View>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1
    }
});
