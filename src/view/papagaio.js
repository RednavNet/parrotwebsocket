import React from 'react'
import { Component } from 'react';
import { View, FlatList, StyleSheet, TextInput, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';




export default class PapagaioView extends Component {

    _onOpen = (evt) => {
        if (this.state == null) {
            this.setState({ message: '' });
            return;
        }
        websocket.send(this.state.message);
    }

    _onClose = (evt) => {

        this.setState({ message: '', isLoading: false });

        setTimeout(() => {
            this.flatListRef.scrollToEnd();
        }, 500);
    }

    _onMessage = (evt) => {
        this._writeToScreen(evt.data);
        websocket.close();

    }

    _onError = (evt) => {
        this.setState({ message: '', isLoading: false });

        setTimeout(() => {
            Alert.alert('Oops! Houve algum erro tente novamente em alguns instantes');
          }, 100);

    }

    _doSend = (message) => {
        this.setState({ isLoading: true });
        var wsUri = "wss://echo.websocket.org/";
        websocket = new WebSocket(wsUri);
        var me = this;
        websocket.onopen = function (evt) { me._onOpen(evt) };
        websocket.onclose = function (evt) { me._onClose(evt) };
        websocket.onmessage = function (evt) { me._onMessage(evt) };
        websocket.onerror = function (evt) { me._onError(evt) };
        this._writeToScreen(message);
    }

    _writeToScreen = (message) => {
        if (this.state === null || this.state.messages == null) {
            var messages = [];
            messages.push(message);
            this.setState({ messages: messages });
        } else
            this.state.messages.push(message);
    }

    _keyExtractor = (item, index) => index.toString();

    _renderItem = ({ item, index }) => {
        if (index % 2 == 0)
            return (
                <View style={styles.chatBox}>
                    <ListItem
                        title={item}
                        subtitle={'EU'}
                        leftAvatar={{ source: require('../images/user.jpg') }}
                    />
                </View>
            );
        else
            return (
                <View style={styles.chatBox}>
                    <ListItem
                        title={item}
                        subtitle={'PAPAGAIO'}
                        rightAvatar={{ source: require('../images/papagaio.png') }}
                    />
                </View>
            );



    };

    render() {

        var messages = [];
        var isLoading = false;
        var message = '';
        if (this.state != null) {
            if (this.state.messages != null)
                messages = this.state.messages;

            if (this.state.isLoading != null)
                isLoading = this.state.isLoading

            if (this.state.message != null)
                message = this.state.message
        }

        return (


            <View style={{ backgroundColor: '#679267', flex: 1, justifyContent: 'flex-end' }}>
                <Spinner
                    visible={isLoading}
                    textContent={'Chamando o papagaio'}
                    textStyle={styles.chatLoading}
                    color={'#FFF'}
                />
                <View style={{ flex: 5 }}>
                    <FlatList
                        data={messages}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                        extraData={this.state}
                        ref={(ref) => { this.flatListRef = ref; }}
                    />
                </View>
                <TextInput
                    onChangeText={(text) => this.setState({ message: text })}
                    style={styles.chatInput}
                    editable={!isLoading}
                    value={message}
                    placeholder={'Fale com o papagaio por aqui!'}
                    onSubmitEditing={() => {
                        this._doSend(this.state.message);
                    }}
                />
            </View>

        );

    }
}
let websocket = null;
const styles = StyleSheet.create({
    chatBox: {
        backgroundColor: '#FFF',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.46,
        shadowRadius: 11.14,
        elevation: 17,
        margin: 5,
        borderRadius: 10,
        width: '95%',
        alignSelf: 'center'
    }, chatText: {
        fontSize: 18,
        margin: 10
    }, chatInput: {
        backgroundColor: '#FFF',
        margin: 5,
    }, chatLoading: {
        color: '#679267',
        backgroundColor: '#FFF',
        textAlign: 'center',
        textAlignVertical: 'center',
        borderRadius: 10,
        width: 300,
        height: 100
    }
});


