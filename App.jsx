// import React from "react";
// import { View, ActivityIndicator } from "react-native";
// import useExpoFonts from "./hooks/useExpoFont";
// import RootNavigation from "./src/screens/RootNavigation";
// import { SQLiteProvider } from "expo-sqlite/next";
// import {useEffect } from "react"

// //initialize the database
// const initializeDatabase = async(db) => {
//   try {
//       await db.execAsync(`
//           PRAGMA journal_mode = WAL;
//           CREATE TABLE IF NOT EXISTS users (
//               id INTEGER PRIMARY KEY AUTOINCREMENT,
//               email TEXT UNIQUE,
//               password TEXT
//           );
//       `);
//       console.log('Database initialized !');
//   } catch (error) {
//       console.log('Error while initializing the database : ', error);
//   }

//   const checkTableStructure = async (db) => {
//     try {
//       const result = await db.execAsync('PRAGMA table_info(users);');
//       console.log('Table structure:', result[0].rows._array);
//     } catch (error) {
//       console.error('Error checking table structure:', error);
//     }
//   };
  
// };


// export default function App() {
//   // Load custom fonts using a custom hook
//   const isLoading = useExpoFonts();


//   if (isLoading) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" color="#493d8a" />
//       </View>
//     );
//   }

  

//   // Render the app when fonts are loaded
//   return (
//     <View style={{ flex: 1 }}>
//       {/* SQLiteProvider initializes the SQLite context and the database */}
//       <SQLiteProvider databaseName="auth.db" onInit={initializeDatabase}>
//         <RootNavigation />
//       </SQLiteProvider>
//     </View>
//   );
// }


import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import useExpoFonts from "./hooks/useExpoFont";
import RootNavigation from "./src/screens/RootNavigation";
import { SQLiteProvider } from "expo-sqlite/next";
import { initializeDatabase } from "./src/service/database";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [dbError, setDbError] = useState(null);
  const fontsLoaded = useExpoFonts();

  useEffect(() => {
    if (fontsLoaded) {
      setIsLoading(false);
    }
  }, [fontsLoaded]);

  const handleDatabaseInit = async (db) => {
    try {
      await initializeDatabase(db);
    } catch (error) {
      console.error('Error in handleDatabaseInit:', error);
      setDbError(error.message);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#493d8a" />
      </View>
    );
  }

  if (dbError) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Database Error: {dbError}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <SQLiteProvider databaseName="auth.db" onInit={handleDatabaseInit}>
        <RootNavigation />
      </SQLiteProvider>
    </View>
  );
}