import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import Layout from "../layout";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootStackParamList } from "../index"; // 👈 import your stack types

type LoginScreenNavProp = NativeStackNavigationProp<RootStackParamList, "Login">;

const Login: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavProp>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      const res = await fetch("http://192.168.1.66:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        Alert.alert("Login Failed", data.message);
        return;
      }

      // Store token locally
      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("user", JSON.stringify(data.user));

      Alert.alert("Success", "Logged in successfully!");

      // ✅ Properly typed navigation
      if (data.user.role === "borrower") {
        navigation.navigate("Book", { user: data.user });
      } else {
        Alert.alert("Notice", "Only borrowers can access books.");
      }
    } catch (err) {
      Alert.alert("Error", "Something went wrong");
      console.error(err);
    }
  };

  
  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>LOGIN</Text>
          <Text style={styles.subtitle}>
            Welcome Back! Let’s Pick Up Where You Left Off.
          </Text>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <FontAwesome5
              name="envelope"
              size={20}
              color="#000"
              style={styles.icon}
            />
            <TextInput
              placeholder="Email"
              keyboardType="email-address"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <FontAwesome5
              name="lock"
              size={20}
              color="#000"
              style={styles.icon}
            />
            <TextInput
              placeholder="Password"
              secureTextEntry
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {/* Login Button */}
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          {/* Signup Link */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Register" as never)}
          >
            <Text style={styles.link}>
              Don't have an account?{" "}
              <Text style={styles.linkHighlight}>Sign Up</Text>
            </Text>
          </TouchableOpacity>

          {/* Social Login */}
          <Text style={styles.orText}>Or signup with</Text>
          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome5 name="whatsapp" size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome5 name="facebook" size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome5 name="twitter" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f2f2f2",
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    color: "#555",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    height: 50,
  },
  icon: { marginRight: 10 },
  input: { flex: 1, fontSize: 16 },
  loginButton: {
    backgroundColor: "#fb923c",
    paddingVertical: 15,
    borderRadius: 15,
    marginBottom: 10,
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  link: { textAlign: "center", fontSize: 14, color: "#555", marginBottom: 15 },
  linkHighlight: { color: "#fb923c", fontWeight: "bold" },
  orText: { textAlign: "center", marginVertical: 10, color: "#555" },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 5,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
});
