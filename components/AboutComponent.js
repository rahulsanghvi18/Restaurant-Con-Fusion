import React from "react";
import { Card, ListItem, Text } from "react-native-elements";
import { FlatList, ScrollView } from "react-native";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { Loading } from "./LoadingComponent";
import * as Animatable from "react-native-animatable";

const MapStateToProps = (state) => {
    return {
        leaders: state.leaders,
    };
};

class About extends React.Component {
    history() {
        return (
            <Card title="Our History">
                <Text>
                    Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique
                    brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.
                    Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you
                    visit us.
                    {"\n\n"}
                    The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured
                    for the first time the world's best cuisines in a pan.
                </Text>
            </Card>
        );
    }

    render() {
        const renderMenuItem = ({ item, index }) => {
            return <ListItem key={index} title={item.name} subtitle={item.description} leftAvatar={{ source: { uri: baseUrl + item.image } }} />;
        };

        return (
            <>
                {this.history()}
                <ScrollView style={{ marginTop: 15 }}>
                    <Animatable.View animation="fadeInDown" duration={1000}>
                        <Card title="Corporate Leadership">
                            {(() => {
                                if (this.props.leaders.isLoading) {
                                    return <Loading />;
                                } else {
                                    return (
                                        <FlatList
                                            data={this.props.leaders.leaders}
                                            renderItem={renderMenuItem}
                                            keyExtractor={(item) => item.id.toString()}
                                        />
                                    );
                                }
                            })()}
                        </Card>
                    </Animatable.View>
                </ScrollView>
            </>
        );
    }
}

export default connect(MapStateToProps)(About);
