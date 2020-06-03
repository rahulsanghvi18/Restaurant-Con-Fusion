import React from "react";
import { Card, Text, ListItem } from "react-native-elements";
import { FlatList } from "react-native";
import { LEADERS } from "../shared/leaders";

class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            leaders: LEADERS,
        };
    }

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
            return <ListItem key={index} title={item.name} subtitle={item.description} leftAvatar={{ source: require("./images/alberto.png") }} />;
        };

        return (
            <>
                {this.history()}
                <Card title="Corporate Leadership" />
                <FlatList data={this.state.leaders} renderItem={renderMenuItem} keyExtractor={(item) => item.id.toString()} />
            </>
        );
    }
}

export default About;
