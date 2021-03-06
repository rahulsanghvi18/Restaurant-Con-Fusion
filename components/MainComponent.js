import React, { Component } from "react";
import Home from "./HomeComponent";
import Menu from "./MenuComponent";
import Dishdetail from "./DishdetailComponent";
import Contact from "./ContactComponent";
import About from "./AboutComponent";
import Favorites from "./FavoriteComponent";
import { View, Image, StyleSheet, ScrollView, Text, ToastAndroid } from "react-native";
import { createStackNavigator, createDrawerNavigator, DrawerItems, SafeAreaView } from "react-navigation";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from "../redux/ActionCreators";
import Reservation from "./ReservationComponent";
import Login from "./loginComponent";
import NetInfo from "@react-native-community/netinfo";

const MapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders,
    };
};

const mapDispatchToProps = (dispatch) => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
});

const MenuNavigator = createStackNavigator(
    {
        Menu: {
            screen: () => <Menu />,
            navigationOptions: ({ navigation }) => {
                const data = {
                    title: "Menu",
                    headerLeft: <Icon name="menu" size={26} color="white" onPress={() => navigation.toggleDrawer()} />,
                };
                return data;
            },
        },
        Dishdetail: { screen: () => <Dishdetail />, navigationOptions: { title: "Dish Details" } },
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
        Home: {
            screen: () => <Home />,
            navigationOptions: ({ navigation }) => {
                const data = {
                    title: "Home",
                    headerLeft: <Icon name="menu" size={26} color="white" onPress={() => navigation.toggleDrawer()} />,
                };
                return data;
            },
        },
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
        About: {
            screen: () => <About />,
            navigationOptions: ({ navigation }) => {
                const data = {
                    title: "About",
                    headerLeft: <Icon name="menu" size={26} color="white" onPress={() => navigation.toggleDrawer()} />,
                };
                return data;
            },
        },
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
        Contact: {
            screen: () => <Contact />,
            navigationOptions: ({ navigation }) => {
                const data = {
                    title: "Contact",
                    headerLeft: <Icon name="menu" size={26} color="white" onPress={() => navigation.toggleDrawer()} />,
                };
                return data;
            },
        },
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

const ReservationNavigator = createStackNavigator(
    {
        Reservation: {
            screen: () => <Reservation />,
            navigationOptions: ({ navigation }) => {
                const data = {
                    title: "Reserve Table",
                    headerLeft: <Icon name="menu" size={26} color="white" onPress={() => navigation.toggleDrawer()} />,
                };
                return data;
            },
        },
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

const FavoritesNavigator = createStackNavigator(
    {
        Favorites: {
            screen: () => <Favorites />,
            navigationOptions: ({ navigation }) => {
                const data = {
                    title: "My Favourites",
                    headerLeft: <Icon name="menu" size={26} color="white" onPress={() => navigation.toggleDrawer()} />,
                };
                return data;
            },
        },
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

const LoginNavigator = createStackNavigator(
    {
        Login: {
            screen: Login,
            navigationOptions: ({ navigation }) => {
                const data = {
                    title: "Login",
                    headerLeft: <Icon name="menu" size={26} color="white" onPress={() => navigation.toggleDrawer()} />,
                };
                return data;
            },
        },
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

const CustomDrawerContentComponent = (props) => {
    return (
        <ScrollView>
            <SafeAreaView style={styles.container} forceInset={{ top: "always", horizontal: "never" }}>
                <View style={styles.drawerHeader}>
                    <View style={{ flex: 1 }}>
                        <Image source={require("./images/logo.png")} style={styles.drawerImage} />
                    </View>
                    <View style={{ flex: 2 }}>
                        <Text style={styles.drawerHeaderText}>Ristornate Con Fusion</Text>
                    </View>
                </View>
                <DrawerItems {...props} />
            </SafeAreaView>
        </ScrollView>
    );
};

const MainNavigator = createDrawerNavigator(
    {
        Login: {
            screen: LoginNavigator,
            navigationOptions: {
                title: "Login",
                drawerLabel: "Login",
                drawerIcon: ({ tintColor }) => {
                    return <Icon name="sign-in" type="font-awesome" size={24} color={tintColor} />;
                },
            },
        },
        Home: {
            screen: HomeNavigator,
            navigationOptions: {
                title: "Home",
                drawerLabel: "Home",
                drawerIcon: ({ tintColor }) => {
                    return <Icon name="home" type="font-awesome" size={24} color={tintColor} />;
                },
            },
        },
        About: {
            screen: AboutNavigator,
            navigationOptions: {
                title: "About Us",
                drawerLabel: "About Us",
                drawerIcon: ({ tintColor }) => {
                    return <Icon name="info-circle" type="font-awesome" size={24} color={tintColor} />;
                },
            },
        },
        Menu: {
            screen: MenuNavigator,
            navigationOptions: {
                title: "list",
                drawerLabel: "Menu",
                drawerIcon: ({ tintColor }) => {
                    return <Icon name="home" type="font-awesome" size={24} color={tintColor} />;
                },
            },
        },
        ContactUs: {
            screen: ContactNavigator,
            navigationOptions: {
                title: "Contact Us",
                drawerLabel: "Contact Us",
                drawerIcon: ({ tintColor }) => {
                    return <Icon name="address-card" type="font-awesome" size={22} color={tintColor} />;
                },
            },
        },
        Reservation: {
            screen: ReservationNavigator,
            navigationOptions: {
                title: "Reserve Table",
                drawerLabel: "Reserve Table",
                drawerIcon: ({ tintColor }) => {
                    return <Icon name="cutlery" type="font-awesome" size={24} color={tintColor} />;
                },
            },
        },
        Favorites: {
            screen: FavoritesNavigator,
            navigationOptions: {
                title: "My Favorites",
                drawerLabel: "My Favorites",
                drawerIcon: ({ tintColor }) => {
                    return <Icon name="heart" type="font-awesome" size={24} color={tintColor} />;
                },
            },
        },
    },
    {
        initialRouteName: "Home",
        drawerBackgroundColor: "#D1C4E9",
        contentComponent: CustomDrawerContentComponent,
    }
);

class Main extends Component {
    constructor(props) {
        super(props);
        this.eventListener;
    }

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
        NetInfo.fetch().then((state) => {
            ToastAndroid.show("Inital Network connectvity type: " + state.type, ToastAndroid.LONG);
        });
        this.eventListener = NetInfo.addEventListener(this.handleConnectivityChange);
    }

    handleConnectivityChange = (connectionInfo) => {
        switch (connectionInfo.type) {
            case "none":
                ToastAndroid.show("You are offline!", ToastAndroid.LONG);
            case "wifi":
                ToastAndroid.show("You are connected to wifi!", ToastAndroid.LONG);
            case "cellular":
                ToastAndroid.show("You are connected to cellular Network!", ToastAndroid.LONG);
            case "unknown":
                ToastAndroid.show("You have a unknown connection!", ToastAndroid.LONG);
            default:
        }
    };

    componentWillUnmount() {
        this.eventListener();
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <MainNavigator />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerHeader: {
        backgroundColor: "#512DA8",
        height: 140,
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        flexDirection: "row",
    },
    drawerHeaderText: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60,
    },
});

export default connect(MapStateToProps, mapDispatchToProps)(Main);
