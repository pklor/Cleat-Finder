import express from 'express';
import { supabase } from '../utils/supabaseClient.js';
const router = express.Router();

// GET quizzes
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('quizzes').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// POST add quiz
router.post('/', async (req, res) => {
  const { quiz_title, quiz_category, quiz_content } = req.body;
  const { data, error } = await supabase.from('quizzes').insert([{ quiz_title, quiz_category, quiz_content }]).select();
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data[0]);
});

export default router;
