import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput,TouchableOpacity,Alert,Image,Modal,ScrollView,KeyboardAvoidingView } from 'react-native';
import db from "../config";
import firebase from 'firebase';
export default class WelcomeScreen extends Component {
  constructor(){

super();
this.state={
  emailId:'',
  password:'',
  isModalVisible:'true',
  firstName:'',
  lastName:'',
  address:'',
  contact:'',
  confirmPassword:''
  
}

  }
  showModal=()=>{
return(
  <Modal animationType="fade" transparent={true} visible={this.state.isModalVisible}>
  <View style={styles.modalContainer}>
  <ScrollView style={{width:'100%'}}>
  <KeyboardAvoidingView>
  <Text style={styles.modalTitle}>REGISTRATION</Text>
<TextInput style={styles.formTextInput}
placeholder={"First Name"}
maxLength={8}
onChangeText={(text)=>{this.setState({firstName:text})}}/>

<TextInput style={styles.formTextInput}
placeholder={"Last Name"}
maxLength={8}   
onChangeText={(text)=>{this.setState({lastName:text})}}/>

<TextInput style={styles.formTextInput}
placeholder={"Contact"}
maxLength={10}
keyboardType={'numeric'}
onChangeText={(text)=>{this.setState({contact:text})}}/>

<TextInput style={styles.formTextInput}
placeholder={"Address"}
multiline={true}
onChangeText={(text)=>{this.setState({address:text})}}/>

<TextInput style={styles.formTextInput}
placeholder={"Email-ID"}
keyboardType={'email-address'}
onChangeText={(text)=>{this.setState({emailId:text})}}/>

<TextInput style={styles.formTextInput}
placeholder={"Password"}
secureTextEntry={true}
onChangeText={(text)=>{this.setState({password:text})}}/>

<TextInput style={styles.formTextInput}
placeholder={" Confirm Password"}
secureTextEntry={true}
onChangeText={(text)=>{this.setState({confirmPassword:text})}}/>

<View style={styles.modalBackButton}>
<TouchableOpacity style={styles.registerButton}
onPress={()=>this.userSignUp(this.state.emailId,this.state.password,this.state.confirmPassword)}>
<Text style={styles.registerButtonText}>REGISTER</Text>
</TouchableOpacity></View>
<View style={styles.modalBackButton}>
<TouchableOpacity style={styles.cancelButton}
onPress={()=>this.setState({'isModalVisible':false})}>
<Text style={styles.cancelButtonText}>CANCEL</Text>
</TouchableOpacity>
</View>
  </KeyboardAvoidingView>
  </ScrollView>
  </View>
  </Modal>
)

  }
  userLogin = (emailId, password)=>{
    firebase.auth().signInWithEmailAndPassword(emailId, password)
    .then(()=>{
      this.props.navigation.navigate('DonateBooks')
    })
    .catch((error)=> {
      var errorCode = error.code;
      var errorMessage = error.message;
      return Alert.alert(errorMessage)
    })
  } 
 userSignUp = (emailId, password,confirmPassword)=>{
   if(password!==confirmPassword){
     return Alert.alert("password does not match \n check your password")
   }else{
    firebase.auth().createUserWithEmailAndPassword(emailId, password)
    .then(()=>{
      db.collection('users').add({
        firstName:this.state.firstName,
         lastName:this.state.lastName,
          contact:this.state.contact,
           emailId:this.state.emailId,
           address:this.state.address
      })
      return Alert.alert(
        'User Added Successfully',
        '',
        [
          {text: 'OK', onPress: () => this.setState({"isModalVisible" : false})},
        ]
    );
 })
    .catch((error)=> {
      var errorCode = error.code;
      var errorMessage = error.message;
      return Alert.alert(errorMessage)
    })

   }

  }
  
  
  render() {
    return (
      <View style={styles.container}>
<View>{this.showModal()}</View>
        <View style={styles.profileContainer}>
        <Image source={require("../assets/santa.png")} style={{width:130,height:130}}/>
        <Text style={styles.title}>Book Santa</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TextInput 
        style={styles.loginbox}
        placeholder="abc@example.com"
        keyboardType='email-address'
        onChangeText={(text)=>{
          this.setState({emilId:text})
        }}
        
        />
         <TextInput 
        style={styles.loginbox}
        placeholder="password"
          secureTextEntry={true}
           onChangeText={(text)=>{
          this.setState({password:text})
        }}
        />
        <TouchableOpacity 
        style={[styles.button,{marginBottom:20,marginTop:20}]}
        onPress = {()=>{this.userLogin(this.state.emailId, this.state.password)}}>
           <Text style={styles.buttonText}>Login</Text>
</TouchableOpacity>
 <TouchableOpacity 
 style={styles.button}
 onPress={()=>this.setState({ isModalVisible:true})}>
           <Text style={styles.buttonText}>Sign Up</Text>

</TouchableOpacity>



      </View>      
      </View>
    );
  }
}

const styles=StyleSheet.create({

container:{
flex:1,
backgroundColor:'lightblue',
},
title:{

  fontSize:60,
  fontWeight:"bold",
  paddingBottom:35,
  color:'red',
  paddingLeft:15,
},

loginbox:{
width:300,
height:40,
borderBottomWidth:1.5,
borderColor:'brown',
fontSize:20,
margin:10,
paddingLeft:10,

},
button:{
  width:300,
height:50,
justifyContent:'center',
alignItems:'center',
borderRadius:25,
backgroundColor:'yellow',
shadowColor:'black',
shadowOffset:{width:0,height:8},
shadowOpacity:0.5,
shadowRadius:10.3,
elevation:16,

},
buttonText:{
color:'black',
fontWeight:"bold",
fontSize:20,
},
buttonContainer:{
  flex:1,
  alignItems:'center',
},
profileContainer:{
  flex:1,
  justifyContent:'center',
  alignItems:'center',

},
loginbox:{
width:300,
height:50,
borderBottomWidth:1.5,
borderColor:'black',
fontSize:20,
margin:10,
paddingLeft:10,

},
keyboardAvoidingView:{

  flex:1,
  justifyContent:'center',
  alignItems:'center'
},
modalContainer:{
  flex:1,
  width:300,
  height:50,
  backgroundColor:'orange',
  borderRadius:25,
  marginLeft:30,
  marginRight:30,
  marginTop:80,
  marginBottom:80
},
formTextInput:{
  width:"75%",
height:40,
alignSelf:'center',
borderColor:'white',
borderRadius:10,
borderWidth:1,
marginTop:20,
padding:10,
},
registerButton:{
  width:200,
  height:40,
  justifyContent:'center',
  alignItems:'center',
  borderRadius:10,
borderWidth:1,
marginTop:30,
},
registerButtonText:{
color:'black',
fontSize:15,
fontWeight:'bold',

},
cancelButton:{
  width:200,
  height:40,
  justifyContent:'center',
  alignItems:'center',
  borderRadius:10,
borderWidth:1,
marginTop:5,
}

})