import express from 'express';
import { supabase } from '../utils/supabaseClient.js';
const router = express.Router();

// GET all posts
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('posts').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// POST create post
router.post('/', async (req, res) => {
  const { post_title, post_body } = req.body;
  const { data, error } = await supabase.from('posts').insert([{ post_title, post_body }]).select();
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data[0]);
});

export default router;
