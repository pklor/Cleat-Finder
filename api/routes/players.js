import express from 'express';
import { supabase } from '../utils/supabaseClient.js';
const router = express.Router();

// GET all players
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('players').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// GET player by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('players').select('*').eq('player_id', id).single();
  if (error) return res.status(404).json({ error: 'Player not found' });
  res.json(data);
});

// POST add player
router.post('/', async (req, res) => {
  const { player_first_name, player_last_name, player_birthday } = req.body;
  const { data, error } = await supabase.from('players').insert([{ player_first_name, player_last_name, player_birthday }]).select();
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data[0]);
});

// PUT update player
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const { data, error } = await supabase.from('players').update(updates).eq('player_id', id).select();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
});

// DELETE player
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('players').delete().eq('player_id', id);
  if (error) return res.status(400).json({ error: error.message });
  res.status(204).send();
});

export default router;
