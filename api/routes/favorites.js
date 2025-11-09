import express from 'express';
import { supabase } from '../server.js';
const router = express.Router();

// GET all favorites for a user
router.get('/', async (req, res) => {
  const { user_id } = req.query;
  if (!user_id) {
    return res.status(400).json({ error: 'user_id query parameter is required' });
  }
  
  const { data, error } = await supabase
    .from('favorite_players')
    .select('*, players(*)')
    .eq('user_id', user_id);
  
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// POST add favorite
router.post('/', async (req, res) => {
  const { user_id, player_id } = req.body;
  if (!user_id || !player_id) {
    return res.status(400).json({ error: 'user_id and player_id are required' });
  }
  
  const { data, error } = await supabase
    .from('favorite_players')
    .insert([{ user_id, player_id }])
    .select();
  
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data[0]);
});

// DELETE remove favorite
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase
    .from('favorite_players')
    .delete()
    .eq('id', id);
  
  if (error) return res.status(400).json({ error: error.message });
  res.status(204).send();
});

export default router;
