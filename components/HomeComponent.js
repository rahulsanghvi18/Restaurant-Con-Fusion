import React from "react";
import { ScrollView, Text } from "react-native";
import { Card, View } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { Loading } from "./LoadingComponent";

const MapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        promotions: state.promotions,
        leaders: state.leaders,
    };
};

function RenderItem(props) {
    if (props.isLoading) {
        return <Loading />;
    } else if (props.errMess) {
        return (
            <View>
                <Text>{props.errMess}</Text>
            </View>
        );
    } else {
        const item = props.item;
        if (item != null) {
            return (
                <Card featuredTitle={item.name} featuredSubtitle={item.designation} image={{ uri: baseUrl + item.image }}>
                    <Text style={{ margin: 10 }}>{item.description}</Text>
                </Card>
            );
        } else {
            return <View></View>;
        }
    }
}

class Home extends React.Component {
    render() {
        return (
            <ScrollView>
                <RenderItem
                    item={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                    isLoading={this.props.dishes.isLoading}
                    errMess={this.props.dishes.errMess}
                />
                <RenderItem
                    item={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                    isLoading={this.props.promotions.isLoading}
                    errMess={this.props.promotions.errMess}
                />
                <RenderItem
                    item={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                    isLoading={this.props.leaders.isLoading}
                    errMess={this.props.leaders.errMess}
                />
            </ScrollView>
        );
    }
}

export default connect(MapStateToProps)(Home);