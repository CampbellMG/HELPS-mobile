import React from 'react';
import {StyleSheet, Text, View, Image, TextInput, TouchableOpacity} from 'react-native';
import {PRIMARY} from "../../res/Colours";

export class Login extends React.Component<{}, {}> {
    render() {
        return (
            <View style={styles.container}>
                <View style={{
                    borderWidth: 5,
                    borderColor: PRIMARY,
                    paddingVertical: 30,
                    paddingHorizontal: 60,
                    borderRadius: 1000,
                    alignSelf: 'center',
                    marginBottom: 128
                }}>
                    <Image source={require('../../../assets/uts.png')} style={{
                        height: 125,
                        width: 74
                    }}/>
                </View>
                <Text style={{fontSize: 16}}>Email</Text>
                <TextInput style={{
                    borderWidth: 2,
                    borderColor: PRIMARY,
                    borderRadius: 10,
                    marginBottom: 32,
                    marginTop: 8,
                    fontSize: 16,
                    padding: 8,
                    paddingHorizontal: 16
                }}/>
                <Text style={{fontSize: 16}}>Password</Text>
                <TextInput  style={{
                    borderWidth: 2,
                    borderColor: PRIMARY,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 32,
                    marginTop: 8,
                    fontSize: 16,
                    padding: 8,
                    paddingHorizontal: 16
                }}/>
                <TouchableOpacity style={{backgroundColor: PRIMARY, padding: 15, borderRadius: 10, marginTop: 32}}>
                    <Text style={{fontSize: 30, color: 'white', textAlign: 'center'}}>Login</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'center',
        padding: 32
    },
});
