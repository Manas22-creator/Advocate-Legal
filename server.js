import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './server/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Inquiries
  app.post('/api/inquiries', (req, res) => {
    const { name, email, phone, subject, message } = req.body;
    try {
      const stmt = db.prepare('INSERT INTO inquiries (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)');
      const info = stmt.run(name, email, phone, subject, message);
      res.json({ success: true, id: info.lastInsertRowid });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to submit inquiry' });
    }
  });

  app.get('/api/inquiries', (req, res) => {
    try {
      const inquiries = db.prepare('SELECT * FROM inquiries ORDER BY created_at DESC').all();
      res.json(inquiries);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch inquiries' });
    }
  });

  // Appointments
  app.post('/api/appointments', (req, res) => {
    const { name, email, phone, date, time, type } = req.body;
    try {
      const stmt = db.prepare('INSERT INTO appointments (name, email, phone, date, time, type) VALUES (?, ?, ?, ?, ?, ?)');
      const info = stmt.run(name, email, phone, date, time, type);
      res.json({ success: true, id: info.lastInsertRowid });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to book appointment' });
    }
  });

  app.get('/api/appointments', (req, res) => {
    try {
      const appointments = db.prepare('SELECT * FROM appointments ORDER BY date ASC, time ASC').all();
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch appointments' });
    }
  });

  // Testimonials
  app.get('/api/testimonials', (req, res) => {
    try {
      const testimonials = db.prepare('SELECT * FROM testimonials ORDER BY created_at DESC').all();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch testimonials' });
    }
  });

  // Team Members
  app.get('/api/team', (req, res) => {
    try {
      const team = db.prepare('SELECT * FROM team_members ORDER BY created_at ASC').all();
      res.json(team);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch team members' });
    }
  });

  app.post('/api/team', (req, res) => {
    const { name, role, description, image_url } = req.body;
    try {
      const stmt = db.prepare('INSERT INTO team_members (name, role, description, image_url) VALUES (?, ?, ?, ?)');
      const info = stmt.run(name, role, description, image_url);
      res.json({ success: true, id: info.lastInsertRowid });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add team member' });
    }
  });

  app.put('/api/team/:id', (req, res) => {
    const { id } = req.params;
    const { name, role, description, image_url } = req.body;
    try {
      const stmt = db.prepare('UPDATE team_members SET name = ?, role = ?, description = ?, image_url = ? WHERE id = ?');
      stmt.run(name, role, description, image_url, id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update team member' });
    }
  });

  app.delete('/api/team/:id', (req, res) => {
    const { id } = req.params;
    try {
      const stmt = db.prepare('DELETE FROM team_members WHERE id = ?');
      stmt.run(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete team member' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { 
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR === 'true' ? false : true,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
