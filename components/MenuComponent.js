import React, { Component } from "react";
import { FlatList, Text, View } from "react-native";
import { Tile } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { withNavigation } from "react-navigation";
import Loading from "./LoadingComponent";
import { postComment } from "../redux/ActionCreators";
import * as Animatable from "react-native-animatable";

const MapStateToProps = (state) => {
    return {
        dishes: state.dishes,
    };
};

class Menu extends Component {
    render() {
        const renderMenuItem = ({ item, index }) => {
            return (
                <Animatable.View animation="fadeInRightBig" duration={1000}>
                    <Tile
                        key={index}
                        title={item.name}
                        caption={item.description}
                        featured
                        onPress={() => this.props.navigation.navigate("Dishdetail", { dishId: item.id })}
                        imageSrc={{ uri: baseUrl + item.image }}
                    />
                </Animatable.View>
            );
        };

        const ans = (() => {
            if (this.props.dishes.isLoading) {
                return <Loading />;
            } else if (this.props.dishes.errMess) {
                return (
                    <View>
                        <Text>{this.props.dishes.errMess}</Text>
                    </View>
                );
            } else {
                return <FlatList data={this.props.dishes.dishes} renderItem={renderMenuItem} keyExtractor={(item) => item.id.toString()} />;
            }
        })();

        return ans;
    }
}

export default withNavigation(connect(MapStateToProps)(Menu));
