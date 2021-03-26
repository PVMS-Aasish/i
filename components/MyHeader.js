import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput,TouchableOpacity,Alert,Image,Modal,ScrollView,KeyboardAvoidingView } from 'react-native';
import {Header,Icon,Badge} from 'react-native-elements'
const MyHeader=props=>{
    return(

        <Header centerComponent={{text:props.title, style:{color:'black',fontSize:20,fontWeight:'bold'}}}
      backgroundColor="lightblue"/>
    )
};
export default MyHeader;