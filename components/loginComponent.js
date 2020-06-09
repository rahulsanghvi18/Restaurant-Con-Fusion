import React, { Component } from "react";
import { View, StyleSheet, Text, ScrollView, Image } from "react-native";
import { Button, Input, CheckBox, Icon } from "react-native-elements";
import * as SecureStore from "expo-secure-store";
import { createBottomTabNavigator } from "react-navigation";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { baseUrl } from "../shared/baseUrl";
import * as ImageManipulator from "expo-image-manipulator";

class LoginTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            remember: false,
        };
    }

    handleLogin() {
        console.log(JSON.stringify(this.state));
        if (this.state.remember) {
            SecureStore.setItemAsync("userinfo", JSON.stringify({ username: this.state.username, password: this.state.password })).catch((error) =>
                console.log("Could not save user Info", error)
            );
        } else {
            SecureStore.deleteItemAsync("userinfo").catch((error) => console.log("Could not delete user Info", error));
        }
    }

    componentDidMount() {
        SecureStore.getItemAsync("userinfo").then((userdata) => {
            let userinfo = JSON.parse(userdata);
            if (userinfo) {
                this.setState({
                    username: userinfo.username,
                    password: userinfo.password,
                    remember: true,
                });
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Input
                    placeholder="Username"
                    leftIcon={{ type: "font-awesome", name: "user-o" }}
                    onChangeText={(username) => this.setState({ username: username })}
                    value={this.state.username}
                    containerStyle={styles.formInput}
                />
                <Input
                    placeholder="Password"
                    leftIcon={{ type: "font-awesome", name: "key" }}
                    onChangeText={(password) => this.setState({ password: password })}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                />
                <CheckBox
                    title="Remember Me"
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({ remember: !this.state.remember })}
                    containerStyle={styles.formCheckBox}
                />
                <View styles={styles.formButton}>
                    <Button
                        onPress={() => this.handleLogin()}
                        title="Login"
                        color="#512DA8"
                        icon={<Icon name="sign-in" type="font-awesome" color="white" size={24} />}
                        buttonStyle={{ backgroundColor: "#512DA8" }}
                    />
                </View>
                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.props.navigation.navigate("Register")}
                        title="Register"
                        clear
                        icon={<Icon name="user-plus" type="font-awesome" color="white" size={24} />}
                        titleStyle={{ color: "blue" }}
                    />
                </View>
            </View>
        );
    }
}

class RegisterTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            firstname: "",
            lastname: "",
            email: "",
            remember: false,
            imageUrl: baseUrl + "images/logo.png",
        };
        this.handleRegister = this.handleRegister.bind(this);
        this.processImage = this.processImage.bind(this);
    }

    handleRegister() {
        console.log(JSON.stringify(this.state));
        if (this.state.remember)
            SecureStore.setItemAsync("userinfo", JSON.stringify({ username: this.state.username, password: this.state.password })).catch((error) =>
                console.log("Could not save user info", error)
            );
    }

    getImageFromCamera = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (cameraPermission.status === "granted" && cameraRollPermission.status === "granted") {
            let capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
            });
            if (!capturedImage.cancelled) {
                this.processImage(capturedImage.uri);
            }
        }
    };

    getImageFromGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            this.processImage(result.uri);
        }
    };

    processImage = async (imageUri) => {
        let processedImage = await ImageManipulator.manipulateAsync(imageUri, [{ resize: { width: 400 } }], { format: "png" });
        this.setState({ imageUrl: processedImage.uri });
    };

    render() {
        return (
            <ScrollView>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: this.state.imageUrl }} loadingIndicatorSource={require("./images/logo.png")} style={styles.image} />
                    <View style={{ marginHorizontal: 10 }}>
                        <Button title="Camera" onPress={this.getImageFromCamera} />
                    </View>
                    <View style={{ marginHorizontal: 10 }}>
                        <Button title="Gallery" onPress={this.getImageFromGallery} />
                    </View>
                </View>
                <View style={styles.container}>
                    <Input
                        placeholder="Username"
                        leftIcon={{ type: "font-awesome", name: "user-o" }}
                        onChangeText={(username) => this.setState({ username: username })}
                        value={this.state.username}
                        containerStyle={styles.formInput}
                    />
                    <Input
                        placeholder="Password"
                        leftIcon={{ type: "font-awesome", name: "key" }}
                        onChangeText={(password) => this.setState({ password: password })}
                        value={this.state.password}
                        containerStyle={styles.formInput}
                    />
                    <Input
                        placeholder="Firstname"
                        leftIcon={{ type: "font-awesome", name: "user-o" }}
                        onChangeText={(firstname) => this.setState({ firstname: firstname })}
                        value={this.state.firstname}
                        containerStyle={styles.formInput}
                    />
                    <Input
                        placeholder="Lastname"
                        leftIcon={{ type: "font-awesome", name: "user-o" }}
                        onChangeText={(lastname) => this.setState({ lastname: lastname })}
                        value={this.state.lastname}
                        containerStyle={styles.formInput}
                    />
                    <Input
                        placeholder="Email"
                        leftIcon={{ type: "font-awesome", name: "envelope-o" }}
                        onChangeText={(email) => this.setState({ email: email })}
                        value={this.state.email}
                        containerStyle={styles.formInput}
                    />
                    <CheckBox
                        title="Remember Me"
                        center
                        checked={this.state.remember}
                        onPress={() => this.setState({ remember: !this.state.remember })}
                        containerStyle={styles.formCheckBox}
                    />
                    <View styles={styles.formButton}>
                        <Button
                            onPress={this.handleRegister}
                            title="Register"
                            color="#512DA8"
                            icon={<Icon name="user-plus" type="font-awesome" color="white" size={24} />}
                            buttonStyle={{ backgroundColor: "#512DA8" }}
                        />
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const Login = createBottomTabNavigator({
    Login: {
        screen: LoginTab,
        navigationOptions: {
            title: "Login",
            tabBarIcon: ({ tintColor }) => <Icon name="sign-in" type="font-awesome" size={24} iconStyle={{ color: tintColor }} />,
        },
    },
    Register: {
        screen: RegisterTab,
        navigationOptions: {
            title: "Register",
            tabBarIcon: ({ tintColor }) => <Icon name="user-plus" type="font-awesome" size={24} iconStyle={{ color: tintColor }} />,
        },
    },
});

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        margin: 20,
    },
    imageContainer: {
        flex: 1,
        flexDirection: "row",
        margin: 20,
    },
    image: {
        margin: 10,
        width: 80,
        height: 60,
    },
    formInput: {
        margin: 20,
    },
    formCheckBox: {
        margin: 20,
        backgroundColor: null,
    },
    formButton: {
        margin: 60,
    },
});

export default Login;
