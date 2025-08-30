// src/app/Book.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "../../api"; 

const profileImage = require("../../assets/images/undraw_female-avatar_7t6k.png");

interface BookType {
  _id: string;
  title: string;
  author: string;
  isbn: string;
  available: number;
  photo?: string;
  borrowedByMe?: boolean;
  borrowId?: string | null;
}

const Book: React.FC = () => {
  const [books, setBooks] = useState<BookType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  // Fetch books from API
  const fetchBooks = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await API.get("/books", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(res.data);
    } catch (err: any) {
      console.error(err);
      Alert.alert("Error", err.response?.data?.message || "Failed to fetch books");
    }
  };

  // Borrow a book
  const handleBorrow = async (bookId: string) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await API.post(
        "/borrow",
        { bookId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setBooks(prev =>
        prev.map(book =>
          book._id === bookId
            ? {
                ...book,
                borrowedByMe: true,
                borrowId: res.data._id,
                available: book.available - 1,
              }
            : book
        )
      );

      Alert.alert("Success", "Book borrowed successfully!");
    } catch (err: any) {
      console.error(err);
      Alert.alert("Error", err.response?.data?.message || "Failed to borrow book");
    }
  };

  // Return a book
  const handleReturn = async (borrowId: string) => {
    try {
      const token = await AsyncStorage.getItem("token");
      await API.post(
        "/borrow/return",
        { borrowId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setBooks(prev =>
        prev.map(book =>
          book.borrowId === borrowId
            ? {
                ...book,
                borrowedByMe: false,
                borrowId: null,
                available: book.available + 1,
              }
            : book
        )
      );

      Alert.alert("Success", "Book returned successfully!");
    } catch (err: any) {
      console.error(err);
      Alert.alert("Error", err.response?.data?.message || "Failed to return book");
    }
  };

  // Filter books by search term
  const filteredBooks = books.filter(
    book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#f3f4f6" }}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <Text style={styles.logo}>BOOKVault</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="🔍 Search books by title or author..."
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <TouchableOpacity onPress={() => setProfileOpen(!profileOpen)}>
          <Image source={profileImage} style={styles.profileImage} />
        </TouchableOpacity>
      </View>

      {/* Book List */}
      <ScrollView contentContainerStyle={styles.container}>
        {filteredBooks.length > 0 ? (
          filteredBooks.map(book => (
            <View key={book._id} style={styles.bookCard}>
              {/* Left: Book Details */}
              <View style={styles.bookInfo}>
                <Text style={styles.bookTitle}>{book.title}</Text>
                <Text style={styles.bookAuthor}>by {book.author}</Text>
                <Text style={styles.bookISBN}>ISBN: {book.isbn}</Text>
                <Text style={styles.bookAvailability}>
                  {book.available > 0 ? (
                    <Text style={{ color: "green", fontWeight: "bold" }}>
                      {book.available} available
                    </Text>
                  ) : (
                    <Text style={{ color: "red", fontWeight: "bold" }}>
                      Not available
                    </Text>
                  )}
                </Text>

                {book.borrowedByMe ? (
                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: "green" }]}
                    onPress={() => handleReturn(book.borrowId!)}
                  >
                    <Text style={styles.buttonText}>Return</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={[
                      styles.button,
                      book.available > 0
                        ? { backgroundColor: "orange" }
                        : { backgroundColor: "#ccc" },
                    ]}
                    disabled={book.available === 0}
                    onPress={() => handleBorrow(book._id)}
                  >
                    <Text style={styles.buttonText}>Borrow</Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Right: Book Image */}
              <View style={styles.bookImageContainer}>
                {book.photo ? (
                  <Image
                    source={{ uri: `http://192.168.100.52:5000${book.photo}` }}
                    style={styles.bookImage}
                  />
                ) : (
                  <Text style={{ color: "#555" }}>No Cover Available</Text>
                )}
              </View>
            </View>
          ))
        ) : (
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No books found
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

export default Book;

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    marginTop: 32,
    borderBottomColor: "#ccc",
  },
  logo: { fontSize: 20, fontWeight: "bold", color: "black", marginRight: 16 },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    backgroundColor: "#f9f9f9",
  },
  profileImage: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, borderColor: "#ccc" },
  container: { padding: 16 },
  bookCard: {
    flexDirection: "row",
    backgroundColor: "white",
    marginBottom: 12,
    borderRadius: 15,
    overflow: "hidden",
    elevation: 3,
  },
  bookInfo: { flex: 1, padding: 12, justifyContent: "space-between" },
  bookTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 4 },
  bookAuthor: { color: "#555", marginBottom: 2 },
  bookISBN: { color: "#555", marginBottom: 4 },
  bookAvailability: { marginBottom: 8 },
  bookImageContainer: {
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  bookImage: { width: 80, height: 120, resizeMode: "cover", margin: 8 },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
    alignSelf: "flex-start",
  },
  buttonText: { color: "white", fontWeight: "bold", fontSize: 12 },
});
