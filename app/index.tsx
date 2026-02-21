import Colors from "@/services/Colors";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Index() {

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View
      style={styles.container}
    >
      <Image source={require('./../assets/images/shop.jpg')}
      style={{
        width: '100%',
        height: 270, 
        marginTop: 130,
        marginBottom: 25
      }} 
    />

    <Text style={styles.heading}>Welcome to</Text>
    <Text style={styles.heading}>Market Connect</Text>

    <View style={{
      padding: 20,
      backgroundColor: Colors.WHITE,
      borderRadius: 20
      }}>

        <Text style={{
          fontFamily: 'appFont',
          fontSize: 20,
          textAlign: 'center',
        }}>Explore the best local businesses near you.</Text>

        <View style={[styles.button,{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 3,

        }]}>
          <Image source={require('./../assets/images/google.png')}
          style={{
            width: 20,
            height: 20,
            marginRight: 10,
          }}
          />
          <Text style={{
            fontFamily: 'appFont',
            fontSize: 20,
            textAlign: 'center',
          }}>Sign In With Google</Text>
        </View>

       <View style={[styles.button, { backgroundColor: Colors.PRIMARY, borderColor: Colors.PRIMARY }]}>
          <Text style={{
            fontFamily: 'appFont',
            fontSize: 20,
            textAlign: 'center',
            color: Colors.WHITE,
          }}>Skip</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.PRIMARY,
    height: '100%',
  },
  heading:{
    fontFamily: 'appFontBold',
    fontSize: 30,
    color: Colors.WHITE,
    textAlign: 'center',
  },
  button: {
    borderWidth: 1,
    borderRadius: 99,
    padding: 15,
    marginTop: 20,
  }
});
