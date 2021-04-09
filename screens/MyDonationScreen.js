import React ,{Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import {Card,Header,Icon} from 'react-native-elements';
import db from '../config';
import firebase from 'firebase';
import { SnapshotViewIOS } from 'react-native';

export default class MyDonationsScreen  extends Component{
static navigationOptions={Header:null};
constructor(){
    super();
    this.state={
        userId: firebase.auth().currentUser.email,
        allDonations:[],
        donerName:[],
    }
    this.requestRef= null;
}
getAllDonations =()=>{

    this.requestRef=db.collection("all_donations").where("donor_id" ,'==', this.state.userId) 
    onSnapShot((snapshot)=>{
        var allDonations=snapshot.docs.map(document=>document.data());
        this.setState({
            allDonations:allDonations
        })
        
    })
}

keyExtractor = (item, index) => index.toString()
renderItem=({item,i})=>{
    return(
        <View>
            <Icon></Icon>
        </View>
    )
}
    render(){

return( 
    <View><Text>My Donations Screen</Text></View>
)

}
}
