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
    const [points, setPoints] = useState(0)
    const [askedQuestions, setAskedQuestions] = useState([]);

    const API = `http://localhost:3000/categories/1`;

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
            setTimer(timer - 1)
        } else {
            chooseQuestion()
        }
    }

    useEffect(() => {
        let insideTimer = setInterval(lowerScore, 1000)

        return function anything() {
            clearInterval(insideTimer)
        }

    })

    // function used to set current question to random question, add remaining time to points, and set timer based on difficulty
    function chooseQuestion() {
        let question = allQuestions[Math.floor(Math.random() * allQuestions.length)];
        console.log(question)
        setPoints(points + timer)
        setCurrentQuestion(question);
        question && timerHandler(question.difficulty);
    }

    // on incorrect choice lose 15 points
    function incorrect() {
        setTimer(timer - 15)
    }


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

    return (
        <View style={styles.container}>
            <View>
                <Text>Points: {points}</Text>
                <Text>Timer: {timer} </Text>
            </View>
            <View style={styles.answerContainers}>
                <Text>{currentQuestion && currentQuestion.question}</Text>
                {currentQuestion ? (
                    <Button title={currentQuestion.correct_choice} onPress={chooseQuestion} />
                ) : null}
                {currentQuestion ? (
                    <Button title={currentQuestion.first_incorrect} onPress={incorrect}/>
                ) : null}
                {currentQuestion ? (
                    <Button title={currentQuestion.second_incorrect} onPress={incorrect}/>
                ) : null}
                {currentQuestion ? (
                    <Button title={currentQuestion.third_incorrect} onPress={incorrect}/>
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
