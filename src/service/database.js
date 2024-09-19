import * as SQLite from 'expo-sqlite/next';

const initializeDatabase = async (db) => {
  try {
    console.log('Starting database initialization...');
    
    // Set WAL mode
    await db.execAsync(`PRAGMA journal_mode = WAL;`);
    console.log('WAL mode set.');

    // Delete existing users table
    //await deleteTable(db, 'users');

    // Create new users table
    await createUsersTable(db);

    console.log('Database initialization completed successfully.');
    await checkTableStructure(db);
    await listTables(db);
  } catch (error) {
    console.error('Error during database initialization:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    throw error;
  }
};

// const deleteTable = async (db, tableName) => {
//   try {
//     console.log(`Attempting to delete table: ${tableName}`);
//     await db.execAsync(`DROP TABLE IF EXISTS ${tableName};`);
//     console.log(`Table ${tableName} deleted successfully.`);
//   } catch (error) {
//     console.error(`Error deleting table ${tableName}:`, error);
//     throw error;
//   }
// };

const createUsersTable = async (db) => {
  try {
    console.log('Creating new users table...');
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        password TEXT
      );
    `);
    console.log('New users table created successfully.');
  } catch (error) {
    console.error('Error creating users table:', error);
    throw error;
  }
};

const checkTableStructure = async (db) => {
  try {
    console.log('Checking table structure...');
    
    // Method 1: Using execAsync
    const result1 = await db.execAsync('PRAGMA table_info(users);');
    console.log('Table structure (execAsync):', JSON.stringify(result1, null, 2));

    // Method 2: Using getAllAsync
    const result2 = await db.getAllAsync('PRAGMA table_info(users);');
    console.log('Table structure (getAllAsync):', JSON.stringify(result2, null, 2));

    // Method 3: Direct query
    const result3 = await db.getAllAsync('SELECT * FROM users LIMIT 1;');
    console.log('Sample data:', JSON.stringify(result3, null, 2));

  } catch (error) {
    console.error('Error checking table structure:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
  }
};

const listTables = async (db) => {
  try {
    console.log('Listing all tables in the database...');
    const tables = await db.getAllAsync("SELECT name FROM sqlite_master WHERE type='table';");
    console.log('Tables in database:', JSON.stringify(tables, null, 2));
    return tables;
  } catch (error) {
    console.error('Error listing tables:', error);
    throw error;
  }
};

export { initializeDatabase, createUsersTable, checkTableStructure, listTables };