import React from "react";
import { StyleSheet, Image, View, Text } from "react-native";
import colors from "../constants/colors";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton";

const GameOver = (props) => {
	return (
		<View style={styles.screen}>
			<TitleText>The Game is Over!</TitleText>
			<View style={styles.imageContainer}>
				<Image
					source={require("../assets/success.png")}
					style={styles.image}
					resizeMode="cover"
				/>
			</View>
			<View style={styles.resultsContainer}>
				<BodyText style={styles.resultText}>
					Your phone needed <Text style={styles.highlight}>{props.rounds}</Text>{" "}
					to guess the number{" "}
					<Text style={styles.highlight}>{props.userNumber}</Text>
				</BodyText>
			</View>
			<MainButton onPress={props.newGame}>NEW GAME</MainButton>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	imageContainer: {
		borderRadius: 150,
		borderWidth: 3,
		borderColor: "black",
		width: 300,
		height: 300,
		overflow: "hidden",
		marginVertical: 30,
	},
	image: {
		width: "100%",
		height: "100%",
	},
	resultsContainer: {
		marginHorizontal: 30,
		marginVertical: 15,
	},
	resultText: {
		textAlign: "center",
		fontSize: 20,
	},
	highlight: {
		color: colors.primary,
		fontFamily: "open-sans-bold",
	},
});

export default GameOver;
