import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

export default function useExpoFonts() {
  const [fontsLoaded] = useFonts({
    "pop-b": require("../assets/fonts/Poppins-Bold.ttf"),
    "pop-m": require("../assets/fonts/Poppins-Medium.ttf"),  
    "pop-r": require("../assets/fonts/Poppins-Regular.ttf"),    
    "pop-eb": require("../assets/fonts/Poppins-ExtraBold.ttf"), 
    
  });

  useEffect(() => {
    async function prepare() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      } else {
        await SplashScreen.preventAutoHideAsync();
      }
    }
    prepare();
  }, [fontsLoaded]);

  return !fontsLoaded; // Return true if fonts are not loaded yet
}
