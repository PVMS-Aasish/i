import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity,KeyboardAvoidingView,TextInput, Image } from 'react-native';
import { ListItem, Icon } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';
import RecieverDetailsScreen  from '../screens/RecieverDetailsScreen';

export default class BookDonateScreen extends Component{
  constructor(){
    super()
    this.state = {
      requestedBooksList : []
    }
  this.requestRef= null
  }

  getRequestedBooksList =()=>{
    this.requestRef = db.collection("requested_books")
    .onSnapshot((snapshot)=>{
    var requestedBooksList = snapshot.docs.map(document => document.data());
      this.setState({
        requestedBooksList : requestedBooksList
      });
    })
  }

  componentDidMount(){
    this.getRequestedBooksList()
  }

  componentWillUnmount(){
    this.requestRef();
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ({item, i}) =>{
    return (
          <View style={{borderBottomWidth: 2, flexDirection: "row",justifyContent: "space-between", padding:10}}>
            <View>
            <Image style={{height:50,width:50}} source={{uri: item.image_link}}/>
            <Text style={{fontWeight: 'bold'}}>{item.book_name}</Text>
            <Text>{item.reason_to_request}</Text>
            </View>
            <View style={{marginLeft: 'auto'}}>
           <TouchableOpacity style={styles.button}
            onPress ={()=>{
              this.props.navigation.navigate("RecieverDetails",{"details": item})
            }}
>
                <Text style={{color:'white'}}>View</Text>
            </TouchableOpacity>
          </View>
          </View>
         
    )
  }

  render(){
    return(
      <View style={{flex:1}}>
        <MyHeader title="Donate Books" navigation ={this.props.navigation}/>
        <View style={{flex:1}}>
          {
          
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.requestedBooksList}
                renderItem={this.renderItem}
              />
               }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  subContainer:{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  },
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
     }
  }
})