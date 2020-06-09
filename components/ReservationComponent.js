import React from "react";
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Alert } from "react-native";
import { Card } from "react-native-elements";
import DatePicker from "react-native-datepicker";
import * as Animatable from "react-native-animatable";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import * as Calendar from "expo-calendar";

class Reservation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            guests: 1,
            smoking: false,
            date: "",
        };
    }

    handleReservation() {
        console.log(JSON.stringify(this.state));
        Alert.alert(
            "Your reservation OK?",
            "Number of Guests: " + this.state.guests + "\n" + "Smoking? " + this.state.smoking + "\n" + "Date and Time: " + this.state.date,
            [
                {
                    text: "Cancel",
                    onPress: () => {
                        this.resetForm();
                    },
                    style: "cancel",
                },
                {
                    text: "OK",
                    onPress: () => {
                        this.presentLocalNotification(this.state.date);
                        this.addReservationToCalendar(this.state.date);
                        this.resetForm();
                    },
                },
            ],
            { cancelable: false }
        );
    }

    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: "",
        });
    }

    async obtainNotificationPermission() {
        let permissions = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permissions.status !== "granted") {
            permissions = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permissions.status !== "granted") {
                Alert.alert("Permission not granted to show alert");
            }
        }
        return permissions;
    }

    async presentLocalNotification(date) {
        await this.obtainNotificationPermission();
        Notifications.presentLocalNotificationAsync({
            title: "Your Reservation",
            body: "Reservation for " + date + " requested",
            ios: {
                sound: true,
            },
            android: {
                sound: true,
                vibrate: true,
                color: "#512DA8",
            },
        });
    }

    async obtainCalendarPermission() {
        let permissions = await Permissions.getAsync(Permissions.CALENDAR);
        if (permissions.status !== "granted") {
            permissions = await Permissions.askAsync(Permissions.CALENDAR);
            if (permissions.status !== "granted") {
                Alert.alert("Permission not granted to show alert");
            }
        }
        return permissions;
    }

    async addReservationToCalendar(date) {
        let permissions = await this.obtainCalendarPermission();
        console.log(permissions);
        var StartDate = new Date(date);
        var EndDate = new Date(date);
        EndDate.setHours(EndDate.getHours() + 2).toString();
        EndDate = new Date(EndDate);
        const { status } = await Calendar.getCalendarPermissionsAsync();
        if (status === "granted") {
            const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT)
                .then((item) => item.filter((el) => el.accessLevel === "owner")[0])
                .then((item) => {
                    Calendar.createEventAsync(item.id, {
                        title: "Con Fusion",
                        startDate: StartDate,
                        endDate: EndDate,
                        location: "121, Clear Water Bay Road, Clear Water Bay, Kowloon, HONG KONG",
                        timeZone: "GMT-5.5",
                    })
                        .then((status) => console.log(status))
                        .catch((error) => console.error);
                })
                .catch((error) => console.log(error));
        }
    }

    render() {
        return (
            <Animatable.View animation="zoomIn" duration={1000}>
                <ScrollView>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Number of Guests</Text>
                        <Picker
                            style={styles.formItem}
                            selectedValue={this.state.guests}
                            onValueChange={(itemValue, itemIndex) => this.setState({ guests: itemValue })}
                        >
                            <Picker.Item label="1" value="1" />
                            <Picker.Item label="2" value="2" />
                            <Picker.Item label="3" value="3" />
                            <Picker.Item label="4" value="4" />
                            <Picker.Item label="5" value="5" />
                            <Picker.Item label="6" value="6" />
                        </Picker>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Smoking/Non-smoking?</Text>
                        <Switch
                            style={styles.formItem}
                            value={this.state.smoking}
                            onTintColor="#512DA8"
                            onValueChange={(value) => this.setState({ smoking: value })}
                        ></Switch>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Date and time</Text>
                        <DatePicker
                            style={{ flex: 2, marginRight: 20 }}
                            date={this.state.date}
                            format=""
                            mode="datetime"
                            placeholder="select date and time"
                            minDate="2017-01-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: "absolute",
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0,
                                },
                                dateInput: {
                                    marginLeft: 36,
                                },
                            }}
                            onDateChange={(date) => {
                                this.setState({ date: date });
                            }}
                        />
                    </View>
                    <View style={styles.formRow}>
                        <Button
                            title="Reserve"
                            color="#512DA8"
                            onPress={() => this.handleReservation()}
                            accessibilityLabel="Learn more about this purple button"
                        />
                    </View>
                </ScrollView>
            </Animatable.View>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        flexDirection: "row",
        margin: 20,
    },
    formLabel: {
        fontSize: 18,
        flex: 2,
    },
    formItem: {
        flex: 1,
    },
    modal: {
        justifyContent: "center",
        margin: 20,
    },
    modalTitle: {
        fontWeight: "bold",
        backgroundColor: "#512DA8",
        color: "white",
        marginBottom: 20,
    },
    modalText: {
        fontSize: 18,
        margin: 10,
    },
});

export default Reservation;
