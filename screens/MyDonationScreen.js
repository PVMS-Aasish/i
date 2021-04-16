import React ,{Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import {Card,Header,Icon} from 'react-native-elements';
import db from '../config';
import firebase from 'firebase';
import { SnapshotViewIOS } from 'react-native';
import { FlatList } from 'react-native';

export default class MyDonationsScreen  extends Component{
static navigationOptions={Header:null};

constructor(){
    super()
    this.state = {
      userId : firebase.auth().currentUser.email,
      allDonations : []
    }
    this.requestRef= null
  }


  getAllDonations =()=>{
    this.requestRef = db.collection("all_donations").where("donor_id" ,'==', this.state.userId)
    .onSnapshot((snapshot)=>{
      var allDonations = snapshot.docs.map(document => document.data());
      this.setState({
        allDonations : allDonations,
      });
    })
  }
keyExtractor = (item, index) => index.toString()
renderItem=({item,i})=>{
    return(
        <View style={{borderBottomWidth: 2, flexDirection: "row",  justifyContent: "space-between",padding:10}}>
            <Icon name="book" type="font-awesome" color ='#696969'/>
            <Text style={{fontWeight: 'bold'}}>{item.book_name}</Text>
            <Text>{"\n Requested By: "+ item.requested_by +"\n Status:"+ item.request_statu }</Text> 
            <TouchableOpacity style={styles.button}>
            <Text style={{color:'#ffff', fontSize:12}}>Send Book</Text> 
            </TouchableOpacity>
        </View>
    )
}
componentDidMount(){
     this.getAllDonations()   
     }
     componentWillUnmount(){
      this.requestRef();
    }
    render(){

return(       
    <View style={{flex:1}}>
      <MyHeader navigation={this.props.navigation} title="My Donations"/>
      <View style={{flex:1}}>
      { this.state.allDonations.length === 0
      ?(<View style={styles.subtitle}>
        <Text style={{ fontSize: 20}}>List of all book Donations</Text> 
        </View>   )
        :(<FlatList keyExtractor = {this.keyExtractor} data={this.state.allDonations} renderItem={this.renderItem} />)

      }
        </View>
    </View>
)

}
}

const styles = StyleSheet.create({
  button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     },
    elevation : 16
  },
  subtitle :{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  }
})