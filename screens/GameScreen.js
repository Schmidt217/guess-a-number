import { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Alert, ScrollView, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Card from "../components/Card";
import MainButton from "../components/MainButton";
import NumberContainer from "../components/NumberContainer";
import TitleText from "../components/TitleText";
import BodyText from "../components/BodyText";

const generateRandomBetween = (min, max, exclude) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	const rndNum = Math.floor(Math.random() * (max - min)) + min;
	if (rndNum === exclude) {
		return generateRandomBetween(min, max, exclude);
	} else {
		return rndNum;
	}
};

const renderListItem = (value, numOfRound) => {
	return (
		<View key={value} style={styles.listItem}>
			<BodyText>Round #{numOfRound}</BodyText>
			<BodyText>{value}</BodyText>
		</View>
	);
};

const GameScreen = (props) => {
	const initialGuess = generateRandomBetween(1, 100, props.userChoice);
	const [currentGuess, setCurrentGuess] = useState(initialGuess);
	const [pastGuesses, setPastGuesses] = useState([initialGuess]);
	const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
		Dimensions.get("window").height
	);
	const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
		Dimensions.get("window").width
	);

	useEffect(() => {
		const updateLayout = () => {
			setAvailableDeviceWidth(Dimensions.get("window").width);
			setAvailableDeviceHeight(Dimensions.get("window").height);
		};
		Dimensions.addEventListener("change", updateLayout);
		return () => {
			Dimensions.removeEventListener("change", updateLayout);
		};
	});

	const currentLow = useRef(1);
	const currentHigh = useRef(100);

	const { userChoice, onGameOver } = props;

	useEffect(() => {
		if (currentGuess === userChoice) {
			onGameOver(pastGuesses.length);
		}
	}, [currentGuess, userChoice, onGameOver]);

	const nextGuessHandler = (direction) => {
		if (
			(direction === "lower" && currentGuess < userChoice) ||
			(direction === "greater" && currentGuess > userChoice)
		) {
			console.log("lies");
			Alert.alert("Don't lie!", "You know that is wrong...", [
				{ text: "Sorry!", style: "cancel" },
			]);
			return;
		}
		if (direction === "lower") {
			currentHigh.current = currentGuess;
		} else {
			currentLow.current = currentGuess + 1;
		}
		const nextNumber = generateRandomBetween(
			currentLow.current,
			currentHigh.current,
			currentGuess
		);
		setCurrentGuess(nextNumber);
		setPastGuesses((curPastGuesses) => [nextNumber, ...curPastGuesses]);
	};

	if (availableDeviceHeight < 500) {
		return (
			<View style={styles.screen}>
				<TitleText>Opponent's Guess</TitleText>
				<View style={styles.controls}>
					<MainButton onPress={nextGuessHandler.bind(this, "lower")}>
						<Ionicons name="md-remove" size={24} color="white" />
					</MainButton>
					<NumberContainer>{currentGuess}</NumberContainer>
					<MainButton onPress={nextGuessHandler.bind(this, "greater")}>
						<Ionicons name="md-add" size={24} color="white" />
					</MainButton>
				</View>

				<View style={styles.listContainer}>
					<ScrollView contentContainerStyle={styles.list}>
						{pastGuesses.map((guess, index) =>
							renderListItem(guess, pastGuesses.length - index)
						)}
					</ScrollView>
				</View>
			</View>
		);
	}

	return (
		<View style={styles.screen}>
			<TitleText>Opponent's Guess</TitleText>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card style={styles.buttonContainer}>
				<MainButton onPress={nextGuessHandler.bind(this, "lower")}>
					<Ionicons name="md-remove" size={24} color="white" />
				</MainButton>
				<MainButton onPress={nextGuessHandler.bind(this, "greater")}>
					<Ionicons name="md-add" size={24} color="white" />
				</MainButton>
			</Card>
			<View style={styles.listContainer}>
				<ScrollView contentContainerStyle={styles.list}>
					{pastGuesses.map((guess, index) =>
						renderListItem(guess, pastGuesses.length - index)
					)}
				</ScrollView>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: "center",
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: Dimensions.get("window").height > 600 ? 30 : 10,
		width: 400,
		maxWidth: "90%",
	},
	controls: {
		flexDirection: "row",
		justifyContent: "space-around",
		width: "80%",
		alignItems: "center",
	},
	listItem: {
		borderColor: "#ccc",
		borderWidth: 1,
		padding: 15,
		marginVertical: 10,
		backgroundColor: "white",
		flexDirection: "row",
		justifyContent: "space-between",
		width: "60%",
	},
	list: {
		flexGrow: 1,
		alignItems: "center",
		justifyContent: "flex-end",
	},
	listContainer: {
		flex: 1,
		width: Dimensions.get("window").width > 400 ? "60%" : "80%",
	},
});

export default GameScreen;
