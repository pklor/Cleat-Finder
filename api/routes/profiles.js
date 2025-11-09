import express from 'express';
import { supabase } from '../server.js';
const router = express.Router();

// GET all profiles
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('profiles').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// GET profile by user_id
router.get('/:user_id', async (req, res) => {
  const { user_id } = req.params;
  const { data, error } = await supabase.from('profiles').select('*').eq('user_id', user_id).single();
  if (error) return res.status(404).json({ error: 'Profile not found' });
  res.json(data);
});

// POST create profile
router.post('/', async (req, res) => {
  const { user_id, handle, display_name, avatar_url, bio } = req.body;
  const { data, error } = await supabase.from('profiles').insert([{ user_id, handle, display_name, avatar_url, bio }]).select();
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data[0]);
});

// PUT update profile
router.put('/:user_id', async (req, res) => {
  const { user_id } = req.params;
  const updates = req.body;
  const { data, error } = await supabase.from('profiles').update(updates).eq('user_id', user_id).select();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
});

// DELETE profile
router.delete('/:user_id', async (req, res) => {
  const { user_id } = req.params;
  const { error } = await supabase.from('profiles').delete().eq('user_id', user_id);
  if (error) return res.status(400).json({ error: error.message });
  res.status(204).send();
});

export default router;
