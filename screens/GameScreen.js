import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, Button } from "react-native";

const GameScreen = props => {
    const [allQuestions, setAllQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [timer, setTimer] = useState(0);
    const [points, setPoints] = useState(0);
    const [askedQuestions, setAskedQuestions] = useState(-1);
    const [choices, setChoices] = useState([]);
    const [chances, setChances] = useState(0)

    let API = `http://localhost:3000/categories/${props.chosenCategory}`;

    // fetch all questions in chosen category
    const fetchQuestions = async () => {
        const apiCall = await fetch(API);
        const questions = await apiCall.json();
        setAllQuestions(questions.questions);
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    // after fetching questions choose a random question
    useEffect(() => {
        chooseQuestion();
    }, [allQuestions]);

    // function to lower timer every 1 sec
    function lowerScore() {
        if (timer > 0) {
            setTimer(timer - 1);
        } else {
            chooseQuestion();
        }
    }

    useEffect(() => {
        let insideTimer = setInterval(lowerScore, 1000);

        return function anything() {
            clearInterval(insideTimer);
        };
    });

    // function used to set current question to random question and set timer based on difficulty
    function chooseQuestion() {
        if (askedQuestions < 10) {
            let question =
                allQuestions[Math.floor(Math.random() * allQuestions.length)];
            setCurrentQuestion(question);
            setAskedQuestions(askedQuestions + 1);
            setChances(0)
            if (question) {
                let c = [
                    question.correct_choice,
                    question.first_incorrect,
                    question.second_incorrect,
                    question.third_incorrect
                ];
                shuffle(c);
                setChoices(c);
                timerHandler(question.difficulty);
            }
        } else {
            props.goEndGame();
            props.setScoredPoints(points);
        }
    }

    // on incorrect choice lose 15 points
    function incorrectHandler() {
        if (timer > 10) {
            setTimer(timer - 10);
        } else {
            setTimer(0);
        }
    }

    // on correct choice setPoints and retrieve a new question
    function correctHandler() {
        setPoints(points + timer);
        chooseQuestion();
    }

    function answerHandler(answer, index) {
        if (currentQuestion.correct_choice === answer) {
            correctHandler();
        } else {
            if (chances < 1) {
                setChances(chances + 1)
                incorrectHandler();
            } else {chooseQuestion()}
        }
    }

    // function to set time based on difficulty
    function timerHandler(difficulty) {
        switch (difficulty) {
            case "easy":
                setTimer(20);
                break;
            case "medium":
                setTimer(30);
                break;
            case "hard":
                setTimer(40);
                break;
            default:
                break;
        }
    }

    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("../assets/question_template.jpg")}
                resizeMode="stretch"
                style={styles.image}
                imageStyle={styles.image_imageStyle}
            >
                <View style={styles.question}>
                    <Text>Question: {askedQuestions}</Text>
                    <Text>{currentQuestion && currentQuestion.question}</Text>
                    <Text style={styles.timer}>Timer: {timer} </Text>
                </View>
                <View style={styles.choicesContainer}>
                    {currentQuestion ? (
                        <View style={styles.button}>
                            <Button
                                title={choices[0]}
                                onPress={() => answerHandler(choices[0], 0)}
                            />
                        </View>
                    ) : null}
                    {currentQuestion ? (
                        <View style={styles.button}>
                            <Button
                                title={choices[1]}
                                onPress={() => answerHandler(choices[1], 1)}
                            />
                        </View>
                    ) : null}
                    {currentQuestion ? (
                        <View style={styles.button}>
                            <Button
                                title={choices[2]}
                                onPress={() => answerHandler(choices[2], 2)}
                            />
                        </View>
                    ) : null}
                    {currentQuestion ? (
                        <View style={styles.button}>
                            <Button
                                title={choices[3]}
                                onPress={() => answerHandler(choices[3], 3)}
                            />
                        </View>
                    ) : null}
                </View>
                <View style={styles.profileContainer}>
                    <Text style={styles.name}>{props.user.name}</Text>
                    <Text style={styles.points}> {points} </Text>
                    <Button title="Quit Game" color='red' onPress={props.goHome}/>
                </View>
            </ImageBackground>
        </View>
    );
};

styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        width: 896,
        height: 414
    },
    image_imageStyle: {},
    question: {
        width: 244,
        height: 115,
        marginTop: 92,
        marginLeft: 284
    },
    timer: {
        color: 'red',
        fontSize: 20
    },
    choicesContainer: {
        width: 417,
        height: 10,
        marginTop: 77,
        marginLeft: 188,
        padding: 0
    },
    button: {
        height: 30,
        padding: 0
    },
    profileContainer: {
        marginLeft: 680,
        alignItems: "center",
        // justifyContent: "center"
    },
    name: {
        fontSize: 20
    },
    points: {
        color: 'blue',
        fontSize: 40
    }
});

export default GameScreen;
