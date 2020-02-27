import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Button
} from "react-native";

const GameScreen = props => {
    const [allQuestions, setAllQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [timer, setTimer] = useState(0);
    const [points, setPoints] = useState(0);
    const [askedQuestions, setAskedQuestions] = useState(0);
    const [choices, setChoices] = useState([]);

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
        if (askedQuestions <= 10) {
            let question =
                allQuestions[Math.floor(Math.random() * allQuestions.length)];
            setCurrentQuestion(question);
            setAskedQuestions(askedQuestions + 1);
            if (question) {
                let c = [
                    question.correct_choice,
                    question.first_incorrect,
                    question.second_incorrect,
                    question.third_incorrect
                ]
                shuffle(c)
                setChoices(c);
                timerHandler(question.difficulty);
            }  
        } else {
            console.log("game over");
        }
    }

    // on incorrect choice lose 15 points
    function incorrectHandler() {
        if (timer > 15) {
            setTimer(timer - 15);
        } else {
            setTimer(0);
        }
    }

    // on correct choice setPoints and retrieve a new question
    function correctHandler() {
        setPoints(points + timer);
        chooseQuestion();
    }

    function answerHandler(answer) {
        if (currentQuestion.correct_choice === answer) {
            correctHandler()
        } else {
            incorrectHandler()
        }
    }

    // function to set time based on difficulty
    function timerHandler(difficulty) {
        switch (difficulty) {
            case "easy":
                setTimer(30);
                break;
            case "medium":
                setTimer(45);
                break;
            case "hard":
                setTimer(60);
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
            <View>
                <Text>Points: {points}</Text>
                <Text>Timer: {timer} </Text>
            </View>
            <View style={styles.answerContainers}>
                <Text>{currentQuestion && currentQuestion.question}</Text>
                {currentQuestion ? (
                    <Button
                        title={choices[0]}
                        onPress={() => answerHandler(choices[0])}
                    />
                ) : null}
                {currentQuestion ? (
                    <Button
                        title={choices[1]}
                        onPress={() => answerHandler(choices[1])}
                    />
                ) : null}
                {currentQuestion ? (
                    <Button
                        title={choices[2]}
                        onPress={() => answerHandler(choices[2])}
                    />
                ) : null}
                {currentQuestion ? (
                    <Button
                        title={choices[3]}
                        onPress={() => answerHandler(choices[3])}
                    />
                ) : null}
            </View>
        </View>
    );
};

styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    answerContainers: {
        justifyContent: "center",
        width: "40%"
    }
});

export default GameScreen;
