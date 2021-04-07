import React ,{Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import {Card,Header,Icon} from 'react-native-elements';
import db from '../config';
import firebase from 'firebase';
import { SnapshotViewIOS } from 'react-native';

export default class RecieverDetailsScreen extends Component{
    constructor(props){

        super(props);
        this.state={
            userId:firebase.auth().currentUser.email,
            recieverId:this.props.navigation.getParam('details')["user_id"],
            requestId:this.props.navigation.getParam('details')["request_id"],
            bookName:this.props.navigation.getParam('details')["book_name"],
            reason_for_requesting  : this.props.navigation.getParam('details')["reason_to_request"],
            recieverName    : "",
            recieverContact : '',
      recieverAddress : '',
      recieverRequestDocId : ''

        }

    }
get recieverDetails (){
    db.collection('users').where('email_Id','==',this.state.recieverId).get()
    .then(Snapshot=>{
        Snapshot.forEach(doc=>{
            this.setState({
           recieverName: doc.data().first_Name,
           recieverAddress: doc.data().address,
           recieverContact: doc.data().contact,            
                  
                
            })
        })
    });
  
    db.collection('requested_books').where('request_id','==',this.state.requestId).get()
    .then(snapshot=>{
        snapshot.forEach(doc=>{
            this.setState({receiverRequestDocId:doc.id})
        })
    })
    updateBookStatus=()=>{
     db.collection('all_donations').add({
         book_name:this.state.bookName,
         request_id:this.state.requestId,
         requested_by:this.state.recieverName,
         donor_id:this.state.userId,
         request_status:"donor Intersted"
     })
     

    }
} 
    render(){

return(
<View style={styles.container}>
<View style={{flex:0.1}}>
    <Header
     leftComponent={<Icon name='arrow-left' type='feather' color='yellow' 
     onPress={()=>this.props.navigation.goBack()}/>}
     centerComponent={{text:"DonateBooks", style:{color:'black',fontSize:20,fontWeight:'bold'}}}
     backgroundColor='lightblue'/>
</View>
<View style={{flex:0.3}}>
    <Card title={"Book Information"} titleStyle={{fontSize:20}}>
        <Card>
        <Text style={{fontWeight:'bold'}}>name:{this.state.bookName}</Text>
        </Card>
        <Card>
        <Text style={{fontWeight:'bold'}}>Reason:{this.state.reason_for_requesting}</Text>
        </Card>
    </Card>
</View>
<View style={{flex:0.3}}>
    <Card title={"Receiver Information"} titleStyle={{fontSize:20}}>
        <Card>
        <Text style={{fontWeight:'bold'}}>name:{this.state.receiverName}</Text>
        </Card>
        <Card>
        <Text style={{fontWeight:'bold'}}>contact:{this.state.contact}</Text>
        </Card>
        <Card>
        <Text style={{fontWeight:'bold'}}>Address:{this.state.address}</Text>
        </Card>
    </Card>
</View>
<Text>Reciever Details Screen</Text>
</View>
)

    }
} 