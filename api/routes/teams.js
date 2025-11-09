import express from 'express';
import { supabase } from '../server.js';
const router = express.Router();

router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('teams').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.post('/', async (req, res) => {
  const { team_name, team_founded } = req.body;
  const { data, error } = await supabase.from('teams').insert([{ team_name, team_founded }]).select();
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data[0]);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('teams').select('*').eq('team_id', id).single();
  if (error) return res.status(404).json({ error: 'Team not found' });
  res.json(data);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const { data, error } = await supabase.from('teams').update(updates).eq('team_id', id).select();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('teams').delete().eq('team_id', id);
  if (error) return res.status(400).json({ error: error.message });
  res.status(204).send();
});

export default router;
