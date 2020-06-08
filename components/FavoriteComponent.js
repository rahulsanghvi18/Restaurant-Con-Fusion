import React from "react";
import { View, FlatList, Text, Alert } from "react-native";
import { ListItem } from "react-native-elements";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { baseUrl } from "../shared/baseUrl";
import { Loading } from "./LoadingComponent";
import SwipeOut from "react-native-swipeout";
import { deleteFavorite } from "../redux/ActionCreators";
import * as Animatable from "react-native-animatable";

const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        favorites: state.favorites,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId)),
    };
};

class Favorites extends React.Component {
    render() {
        const renderMenuItem = ({ item, index }) => {
            const rightButton = [
                {
                    text: "Delete",
                    type: "delete",
                    onPress: () => {
                        Alert.alert(
                            "Delete Favorite?",
                            "Are you sure you wish to delete the favorite dish " + item.name + " ? ",
                            [
                                { text: "Cancel", onPress: () => console.log(item.name + "Not deleted"), style: "cancel" },
                                {
                                    text: "OK",
                                    onPress: () => this.props.deleteFavorite(item.id),
                                },
                            ],
                            { cancelable: false }
                        );
                    },
                },
            ];

            return (
                <SwipeOut right={rightButton} autoClose={true}>
                    <Animatable.View animation="fadeInRightBig" duration={1000}>
                        <ListItem
                            key={index}
                            title={item.name}
                            subtitle={item.description}
                            hideChevron={true}
                            onPress={() => this.props.navigation.navigate("Dishdetail", { dishId: item.id })}
                            leftAvatar={{ source: { uri: baseUrl + item.image } }}
                        />
                    </Animatable.View>
                </SwipeOut>
            );
        };
        if (this.props.dishes.isLoading) {
            return <Loading />;
        } else if (this.props.dishes.errMess) {
            return (
                <View>
                    <Text>{this.dishes.errMess}</Text>
                </View>
            );
        } else {
            return (
                <FlatList
                    data={this.props.dishes.dishes.filter((dish) => this.props.favorites.some((el) => el === dish.id))}
                    renderItem={renderMenuItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            );
        }
    }
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(Favorites));
