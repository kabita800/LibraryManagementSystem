import { useRoute } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../index"; 
import { View, Text } from "react-native";


type BookRouteProp = RouteProp<RootStackParamList, "Book">;

const Book: React.FC = () => {
  const route = useRoute<BookRouteProp>();
  const { user } = route.params;

  return (
    <View>
      <Text>Welcome, {user.name}</Text>
    </View>
  );
};

export  default Book;