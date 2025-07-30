import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { useEffect, useRef, useState } from "react";

interface QuoteObject {
  quote: string;
  author: string;
  id: string;
}

export default function HomeScreen() {
  const [quoteObject, setQuoteObject] = useState<QuoteObject | null>(null);

  // why used this? because since react 18 in strict mode it lauch useEffect with empty dependecy twice, it shall not be happening at product but in development it throw sometimes errors on dupicated run or data misleads
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/quotes/random");
        const data = (await response.json()) as QuoteObject;

        if (data && data.quote) {
          setQuoteObject(data);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back!</Text>
      <Text>The quote of today is:</Text>
      {quoteObject && quoteObject?.quote.length > 0 && (
        <View style={styles.box}>
          <Text>{quoteObject?.quote}</Text>
          <Text style={styles.author}>Autor: {quoteObject?.author}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  box: {
    alignItems: "center",
    justifyContent: "center",
  },
  author: {
    fontStyle: "italic",
  },
});
