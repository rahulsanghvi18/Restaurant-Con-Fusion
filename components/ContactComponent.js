import React from "react";
import { Card, Text } from "react-native-elements";

class Contact extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card title="Contact Information" titleStyle={{ fontSize: 20 }}>
                <Text style={{ fontSize: 15 }}>
                    121, Clear Water Bay Road{"\n\n"}Clear Water Bay, Kowloon{"\n\n"}HONG KONG{"\n\n"}Tel: +852 1234 5678{"\n\n"}Fax: +852 8765 4321
                    {"\n\n"}
                    Email:confusion@food.net
                </Text>
            </Card>
        );
    }
}

export default Contact;
