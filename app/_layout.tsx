import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { ActivityIndicator } from "react-native";
export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'appFont': require('./../assets/fonts/Montserrat-Regular.ttf'),
    'appBoldFont': require('./../assets/fonts/Montserrat-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }
  return <Stack />;
}
