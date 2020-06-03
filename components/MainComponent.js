import React, { Component } from "react";
import Home from "./HomeComponent";
import Menu from "./MenuComponent";
import Dishdetail from "./DishdetailComponent";
import { View } from "react-native";
import { createStackNavigator, createDrawerNavigator } from "react-navigation";
import Contact from "./ContactComponent";
import About from "./AboutComponent";

const MenuNavigator = createStackNavigator(
    {
        Menu: { screen: Menu, navigationOptions: { title: "Menu" } },
        Dishdetail: { screen: Dishdetail, navigationOptions: { title: "Dish Details" } },
    },
    {
        initialRouteName: "Menu",
        navigationOptions: {
            headerStyle: {
                backgroundColor: "#512DA8",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                color: "#fff",
            },
        },
    }
);

const HomeNavigator = createStackNavigator(
    {
        Home: { screen: Home, navigationOptions: { title: "Home" } },
    },
    {
        navigationOptions: {
            headerStyle: {
                backgroundColor: "#512DA8",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                color: "#fff",
            },
        },
    }
);

const AboutNavigator = createStackNavigator(
    {
        About: { screen: About, navigationOptions: { title: "About Us" } },
    },
    {
        navigationOptions: {
            headerStyle: {
                backgroundColor: "#512DA8",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                color: "#fff",
            },
        },
    }
);

const ContactNavigator = createStackNavigator(
    {
        Contact: { screen: Contact },
    },
    {
        navigationOptions: {
            headerStyle: {
                backgroundColor: "#512DA8",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                color: "#fff",
            },
        },
    }
);

const MainNavigator = createDrawerNavigator(
    {
        Home: {
            screen: HomeNavigator,
            navigationOptions: {
                title: "Home",
                drawerLabel: "Home",
            },
        },
        About: {
            screen: AboutNavigator,
            navigationOptions: {
                title: "About Us",
                drawerLabel: "About Us",
            },
        },
        Menu: {
            screen: MenuNavigator,
            navigationOptions: {
                title: "Menu",
                drawerLabel: "Menu",
            },
        },
        ContactUs: {
            screen: ContactNavigator,
            navigationOptions: {
                title: "Contact Us",
                drawerLabel: "Contact Us",
            },
        },
    },
    {
        drawerBackgroundColor: "#D1C4E9",
    }
);

class Main extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <MainNavigator />
            </View>
        );
    }
}

export default Main;
