import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(process.cwd(), 'database.sqlite');
console.log(`Initializing database at: ${dbPath}`);
const db = new Database(dbPath);

// Initialize database schema
db.exec(`
  CREATE TABLE IF NOT EXISTS inquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    type TEXT NOT NULL,
    status TEXT DEFAULT 'scheduled',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS testimonials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_name TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS team_members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Insert some initial data if empty
const teamCount = db.prepare('SELECT COUNT(*) as count FROM team_members').get();
if (teamCount.count === 0) {
  db.exec(`
    INSERT INTO team_members (name, role, description, image_url) VALUES 
    ('Adv. Priya Sharma', 'Bombay High Court', 'Handles complex litigation and corporate matters at the Bombay side.', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop'),
    ('Adv. Sneha Desai', 'Thane District Court', 'Manages civil and criminal proceedings across the Thane jurisdiction.', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop'),
    ('Ananya Patel', 'Legal Intern', 'Assists with legal research, drafting, and case preparation.', 'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?q=80&w=400&auto=format&fit=crop');
  `);
}

const testimonialCount = db.prepare('SELECT COUNT(*) as count FROM testimonials').get();
if (testimonialCount.count === 0) {
  db.exec(`
    INSERT INTO testimonials (client_name, content) VALUES 
    ('Rajesh Sharma', 'The advocate provided excellent guidance for our family property dispute. Highly recommended.'),
    ('Priya Desai', 'Professional, knowledgeable, and very responsive. Helped us navigate a complex corporate legal issue.');
  `);
}

export default db;
