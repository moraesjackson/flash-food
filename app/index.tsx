import Colors from "@/services/Colors";
import { axiosClient } from "@/services/GlobalApi";
import { useSSO, useUser } from "@clerk/clerk-expo";
import * as AuthSession from "expo-auth-session";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React, { useCallback, useEffect } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export const useWarmUpBrowser = () => {
  useEffect(() => {
    console.log("🔥 useWarmUpBrowser iniciado");
    console.log("📱 Plataforma:", Platform.OS);

    if (Platform.OS === "android") return;

    void WebBrowser.warmUpAsync();

    return () => {
      console.log("🧹 Browser coolDown");
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function Index() {
  useWarmUpBrowser();

  const { startSSOFlow } = useSSO();
  const navigation = useNavigation();
  const router = useRouter();
  const { user } = useUser();
  console.log(user);

  useEffect(() => {
    console.log("🚀 Tela Index carregada");

    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    user && CreateNewUser();
  }, [user]);

  const CreateNewUser=  async()=>{
    try{
      const result =await axiosClient.post('/user-lists', {
        data:{
        fullName: user?.fullName,
        email: user?.primaryEmailAddress?.emailAddress
        }
      })
      console.log(result.data);
    }catch(e)
    {
      console.log(e);
    }
  }

const onPress = useCallback(async () => {
  try {
    const redirectUri = AuthSession.makeRedirectUri({
      scheme: "flashfood",
    });

    console.log("Iniciando fluxo SSO...");

    // CHAMAR APENAS UMA VEZ
    const { createdSessionId, setActive } = await startSSOFlow({
      strategy: "oauth_google",
      redirectUrl: redirectUri,
    });

    if (createdSessionId && setActive) {
      console.log("Sessão criada com sucesso!");
      await setActive({ session: createdSessionId });
      router.replace("/"); // Certifique-se de que essa rota existe
    } else {
      console.log("Fluxo interrompido: Verifique se o e-mail já existe ou se faltam dados.");
    }

} catch (err: any) { // Adicionamos o ': any' aqui para permitir o acesso às propriedades
  console.error("❌ ERRO DETALHADO:");

  // Verificamos se o erro veio do Clerk (que sempre traz uma array 'errors')
  if (err?.errors) {
    err.errors.forEach((e: any) => {
      console.log("Mensagem do Clerk:", e.longMessage || e.message);
    });
  } else {
    // Caso seja um erro de rede ou do navegador
    console.log("Erro inesperado:", JSON.stringify(err, null, 2));
  }
}
}, [startSSOFlow]);

  return (
    <LinearGradient
      colors={[Colors.PRIMARY, Colors.PRIMARY_DARK]} 
      style={styles.container}
    >
      <Image
        source={require("./../assets/images/shop-preview-1771891846887.png")}
        style={{
          width: "100%",
          height: 270,
          marginTop: 130,
          marginBottom: 25,
        }}
      />

      <Text style={styles.heading}>Welcome to</Text>
      <Text style={styles.heading}>Market Connect</Text>

      <View
        style={{
          padding: 20,
          backgroundColor: Colors.WHITE,
          borderRadius: 20,
        }}
      >
        <Text
          style={{
            fontFamily: "appFont",
            fontSize: 20,
            textAlign: "center",
          }}
        >
          Explore the best local businesses near you.
        </Text>

        <TouchableOpacity
          onPress={onPress}
          style={[
            styles.button,
            {
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          <Image
            source={require("./../assets/images/google.png")}
            style={{
              width: 20,
              height: 20,
              marginRight: 10,
            }}
          />
          <Text
            style={{
              fontFamily: "appFont",
              fontSize: 20,
              textAlign: "center",
            }}
          >
            Sign In With Google
          </Text>
        </TouchableOpacity>

        <View
          style={[
            styles.button,
            {
              backgroundColor: Colors.PRIMARY,
              borderColor: Colors.PRIMARY,
            },
          ]}
        >
          <Text
            style={{
              fontFamily: "appFont",
              fontSize: 20,
              textAlign: "center",
              color: Colors.WHITE,
            }}
          >
            Skip
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.PRIMARY,
    height: "100%",
    padding:20
  },
  heading: {
    fontFamily: "appFontBold",
    fontSize: 30,
    color: Colors.WHITE,
    textAlign: "center",
  },
  button: {
    borderWidth: 1,
    borderRadius: 99,
    padding: 15,
    marginTop: 20,
  },
});