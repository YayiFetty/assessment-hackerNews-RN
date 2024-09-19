import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSQLiteContext } from "expo-sqlite/next";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";

const LoginScreen = () => {
  const db = useSQLiteContext();
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigateToRegister = () => {
    navigation.navigate("registerS");
  };

  const handleLogin = async () => {
    const { email, password } = form;

    if (email.length === 0 || password.length === 0) {
      Alert.alert("Attention", "Please enter both email and password");
      return;
    }

    setIsSubmitting(true);
    try {
      const user = await db.getFirstAsync(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );

      if (!user) {
        Alert.alert("Error", "Email does not exist!");
        return;
      }

      const validUser = await db.getFirstAsync(
        "SELECT * FROM users WHERE email = ? AND password = ?",
        [email, password]
      );

      if (validUser) {
        setForm({
          email: "",
          password: "",
        });
        navigation.navigate("successS"); 
      } else {
        Alert.alert("Error", "Incorrect password");
      }
    } catch (error) {
      console.log("Error during login: ", error);
      Alert.alert("Error", "An error occurred during login. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            keyboardShouldPersistTaps="handled"
          >
            <Image
              source={require("../../assets/onb1.png")}
              style={[styles.image, { width }]}
              resizeMode="contain"
            />
            <View style={styles.formContainer}>
              <Text style={styles.title}>Log in</Text>

              <FormField
                title="Email"
                value={form.email}
                handleChangeText={(e) => setForm({ ...form, email: e })}
                otherStyle={styles.inputSpacing}
                keyboardType="email-address"
              />
              <FormField
                title="Password"
                value={form.password}
                handleChangeText={(e) => setForm({ ...form, password: e })}
                otherStyle={styles.inputSpacing}
                secureTextEntry
              />

              <CustomButton
                title="Sign In"
                handlePress={handleLogin}
                containerStyle={styles.inputSpacing}
                isLoading={isSubmitting}
              />
              <View style={styles.footer}>
                <Text style={styles.footerText}>Don't Have an Account?</Text>
                <TouchableOpacity onPress={navigateToRegister}>
                  <Text style={styles.signUpLink}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 16,
  },
  formContainer: {
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  image: {
    height: 300,
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    color: "#493d8a",
    fontFamily: "pop-b",
    marginBottom: 24,
  },
  inputSpacing: {
    marginTop: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  footerText: {
    fontSize: 16,
    color: "#7b7b8b",
    fontFamily: "pop-r",
  },
  signUpLink: {
    fontSize: 16,
    fontFamily: "pop-m",
    color: "#FF6347",
    marginLeft: 8,
  },
});

export default LoginScreen;