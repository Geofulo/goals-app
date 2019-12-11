import React, { Component, useState } from "react";
import { StyleSheet, View, AsyncStorage } from "react-native";
import { ApplicationProvider, Button, List } from "@ui-kitten/components";
import { mapping, light as lightTheme } from "@eva-design/eva";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

class App extends Component {
	constructor(props) {
		super(props);
		this.getdata = this.getdata.bind(this);
		this.state = {
			courseGoals: [],
			showModal: false
		};
	}

	componentDidMount() {
		this.getdata();
	}

	async getdata() {
		const value = await AsyncStorage.getItem("my_goals");

		this.setState({
			courseGoals: JSON.parse(value)
		});
	}

	render() {
		const addGoalHandler = async goalTitle => {
			try {
				let courses = this.state.courseGoals;

				if (courses === null) {
					courses = [];
				}

				courses.push({ id: Math.random().toString(), title: goalTitle });

				let jsonObj = JSON.stringify(courses);
				await AsyncStorage.setItem("my_goals", jsonObj);

				await this.getdata();
			} catch (e) {}

			updateShowModalStatus(false);
		};

		const deleteGoalHandler = async goalId => {
			let courses = this.state.courseGoals.filter(goal => goal.id !== goalId);

			let jsonObj = JSON.stringify(courses);
			await AsyncStorage.setItem("my_goals", jsonObj);

			await this.getdata();
		};

		const updateShowModalStatus = status => {
			this.setState({
				showModal: status
			});
		};

		return (
			<ApplicationProvider mapping={mapping} theme={lightTheme}>
				<View style={styles.container}>
					<GoalInput
						isModalVisible={this.state.showModal}
						onAdd={addGoalHandler}
						onCancel={() => updateShowModalStatus(false)}
					/>
					<List
						data={this.state.courseGoals}
						keyExtractor={item => item.id}
						renderItem={itemData => <GoalItem goal={itemData.item} onDelete={deleteGoalHandler} />}
						style={styles.list}
					/>
					<Button onPress={() => updateShowModalStatus(true)}>Add Goal</Button>
				</View>
			</ApplicationProvider>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		padding: 40,
		paddingTop: 80
	},
	list: {
		marginVertical: 20,
		backgroundColor: "transparent"
	}
});

export default App;
