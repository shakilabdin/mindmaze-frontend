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
    const [askedQuestions, setAskedQuestions] = useState([]);

    const API = `http://localhost:3000/categories/3`;

    // fetch all questions in chosen category
    const fetchQuestions = async () => {
        const apiCall = await fetch(API);
        const questions = await apiCall.json();
        setAllQuestions(questions.questions);
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    useEffect(() => {
        chooseQuestion();
    }, [allQuestions]);

    function chooseQuestion() {
        let question = allQuestions[Math.floor(Math.random() * allQuestions.length)];
        console.log(question)
        setCurrentQuestion(question);
        question && timerHandler(question.difficulty);
    }

    function lowerScore() {
        setTimer(prevState => prevState - 1)
    }

    // let pointsInterval = setInterval(lowerScore, 1000)

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
                <Text>Timer: {timer}</Text>
            </View>
            <View style={styles.answerContainers}>
                <Text>{currentQuestion && currentQuestion.question}</Text>
                {currentQuestion ? (
                    <Button title={currentQuestion.correct_choice} onPress={chooseQuestion} />
                ) : null}
                {currentQuestion ? (
                    <Button title={currentQuestion.first_incorrect} onPress={chooseQuestion}/>
                ) : null}
                {currentQuestion ? (
                    <Button title={currentQuestion.second_incorrect} onPress={chooseQuestion}/>
                ) : null}
                {currentQuestion ? (
                    <Button title={currentQuestion.third_incorrect} onPress={chooseQuestion}/>
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
