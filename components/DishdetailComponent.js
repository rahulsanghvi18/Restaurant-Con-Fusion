import React from "react";
import { Text, View, ScrollView, FlatList, Modal, Button, Alert, PanResponder } from "react-native";
import { Card, Icon, Rating, Input } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { withNavigation } from "react-navigation";
import { postFavorite } from "../redux/ActionCreators";
import { postComment } from "../redux/ActionCreators";
import * as Animatable from "react-native-animatable";

const MapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites,
    };
};

const mapDispatchToProps = (dispatch) => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (comment) => dispatch(postComment(comment)),
});

function RenderDish(props) {
    const dish = props.dish;
    const reconizeDrag = ({ MoveX, MoveY, dy, dx }) => {
        if (dx < -200) return true;
        else return false;
    };

    var view;
    const handleViewRef = (ref) => (view = ref);

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderEnd: (e, gestureState) => {
            if (reconizeDrag(gestureState))
                Alert.alert(
                    "Add to favorites?",
                    "Are you sure you wish to add" + dish.name + "to your favorites?",
                    [
                        {
                            text: "Cancel",
                            onPress: () => {
                                console.log("Cancelled pressed");
                            },
                            style: "cancel",
                        },
                        {
                            text: "OK",
                            onPress: () => (props.favorite ? console.log("Already favourite") : props.onPress()),
                        },
                    ],
                    { cancelable: false }
                );
            return true;
        },
        onPanResponderGrant: () => {
            view.rubberBand(1000).then((endState) => console.log(endState.finished ? "finished" : "Cancelled"));
        },
    });

    if (dish != null) {
        return (
            <Animatable.View animation="fadeInDown" duration={1000} {...panResponder.panHandlers} ref={handleViewRef}>
                <Card featuredTitle={dish.name} image={{ uri: baseUrl + dish.image }}>
                    <Text style={{ margin: 10 }}>{dish.description}</Text>
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
                        <Icon
                            raised
                            reverse
                            name={props.favorite ? "heart" : "heart-o"}
                            type="font-awesome"
                            color="#f50"
                            onPress={() => (props.favorite ? console.log("Already favourite") : props.onPress())}
                        />
                        <Icon
                            raised
                            reverse
                            name="pencil"
                            type="font-awesome"
                            color="#7301ED"
                            style={{ flexWrap: "wrap" }}
                            onPress={props.toggleModal}
                        />
                    </View>
                </Card>
            </Animatable.View>
        );
    } else {
        return <View></View>;
    }
}

function RenderComments(props) {
    const comments = props.comments;
    const renderCommentItem = ({ item, index }) => {
        return (
            <View key={index} style={{ margin: 10 }}>
                <Text style={{ fontSize: 14 }}>{item.comment}</Text>
                <View style={{ alignSelf: "flex-start" }}>
                    <Rating startingValue={item.rating} ratingCount={5} imageSize={16} />
                </View>
                <Text style={{ fontSize: 12 }}>{"--" + item.author + ", " + item.date}</Text>
            </View>
        );
    };
    return (
        <Animatable.View animation="fadeInUp" duration={1000}>
            <Card title="Comments">
                <FlatList data={comments} renderItem={renderCommentItem} keyExtractor={(item) => item.id.toString()} />
            </Card>
        </Animatable.View>
    );
}

class Dishdetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favourites: [],
            showModal: false,
            rating: 5,
            author: "",
            comment: "",
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    toggleModal() {
        this.setState({ showModal: !this.state.showModal });
    }

    render() {
        const dishId = this.props.navigation.getParam("dishId", "");
        return (
            <ScrollView>
                <RenderDish
                    dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some((el) => el === dishId)}
                    onPress={() => this.markFavorite(dishId)}
                    toggleModal={this.toggleModal}
                />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
                <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={this.state.showModal}
                    onDismiss={() => {
                        this.toggleModal();
                    }}
                >
                    <Rating
                        startingValue={this.state.rating}
                        ratingCount={5}
                        imageSize={45}
                        showRating
                        onFinishRating={(rating) => this.setState({ rating: rating })}
                        style={{ marginTop: 20, marginBottom: 20 }}
                    />
                    <Input
                        placeholder="Author"
                        leftIcon={{ type: "font-awesome", name: "user" }}
                        onChangeText={(text) => this.setState({ author: text })}
                    />
                    <Input
                        placeholder="Comment"
                        leftIcon={{ type: "font-awesome", name: "comments" }}
                        onChangeText={(text) => this.setState({ comment: text })}
                    />
                    <View style={{ margin: 15 }}>
                        <Button
                            title="SUBMIT"
                            color="#512DA8"
                            onPress={() => {
                                console.log(JSON.stringify(this.state));
                                this.props.postComment({
                                    dishId: +dishId,
                                    rating: this.state.rating,
                                    comment: this.state.comment,
                                    author: this.state.author,
                                });
                                this.setState({ rating: 5, author: "", comment: "" });
                                this.toggleModal();
                            }}
                        />
                    </View>
                    <View style={{ margin: 15 }}>
                        <Button
                            title="CANCEL"
                            onPress={() => {
                                this.toggleModal();
                            }}
                        />
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

export default withNavigation(connect(MapStateToProps, mapDispatchToProps)(Dishdetail));
