// src/app/auth/Signup.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { FontAwesome5 } from "@expo/vector-icons";
import Layout from "../layout";
import { useNavigation } from "@react-navigation/native";

const Register: React.FC = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (field: string, value: string) => {
    setUserData({ ...userData, [field]: value });
  };

  const handleRegister = async () => {
    const { name, email, password, role } = userData;

    // Frontend validation
    if (!name || !email || !password || !role) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if (!/^[A-Za-z\s]+$/.test(name)) {
      Alert.alert("Error", "Name can only contain letters and spaces");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    console.log("Sending to backend:", userData);

    try {
      const res = await fetch("http://192.168.1.66:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await res.json();
      console.log("Backend response:", data);

      if (!res.ok) {
        Alert.alert("Signup Failed", data.message || "Registration failed");
      } else {
        Alert.alert("Success", data.message || "Registered successfully!");
        navigation.navigate("Login" as never);
      }
    } catch (err) {
      Alert.alert("Error", "Something went wrong");
      console.error(err);
    }
  };

  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <Text style={styles.title}>SIGN UP</Text>
          <Text style={styles.subtitle}>Sign Up. Step In. Stand Out</Text>

          {/* Name Input */}
          <View style={styles.inputContainer}>
            <FontAwesome5 name="user" size={20} color="#000" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={userData.name}
              onChangeText={(text) => handleChange("name", text)}
            />
          </View>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <FontAwesome5 name="envelope" size={20} color="#000" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              value={userData.email}
              onChangeText={(text) => handleChange("email", text)}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <FontAwesome5 name="lock" size={20} color="#000" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={userData.password}
              onChangeText={(text) => handleChange("password", text)}
            />
          </View>

          {/* Role Picker */}
          <View style={styles.inputContainer}>
            <FontAwesome5 name="book-open" size={20} color="#000" style={styles.icon} />
            <Picker
              selectedValue={userData.role}
              onValueChange={(value) => handleChange("role", value)}
              style={styles.picker}
            >
              <Picker.Item label="Select Role" value="" />
              <Picker.Item label="Librarian" value="librarian" />
              <Picker.Item label="Borrower" value="borrower" />
            </Picker>
          </View>

          {/* Signup Button */}
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          {/* Login Link */}
          <TouchableOpacity onPress={() => navigation.navigate("Login" as never)}>
            <Text style={styles.link}>
              <Text style={styles.normalText}>Already have an account? </Text>
              <Text style={styles.linkHighlight}>Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Layout>
  );
};

export default Register;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
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
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
  },
  picker: {
    flex: 1,
    borderWidth: 0,
    height: 50,
  },
  button: {
    backgroundColor: "#fb923c",
    paddingVertical: 15,
    borderRadius: 15,
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  link: {
    textAlign: "center",
    marginTop: 15,
  },
  normalText: {
    color: "#000",
    fontWeight: "normal",
  },
  linkHighlight: {
    color: "#fb923c",
    fontWeight: "bold",
  },
});
