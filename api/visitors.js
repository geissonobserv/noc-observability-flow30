import supabase from './_supabase.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'POST') {
      const { session_id } = req.body;
      if (!session_id) return res.status(400).json({ error: 'session_id required' });

      // Vercel provides geo headers (city may be URL-encoded)
      const country = decodeURIComponent(req.headers['x-vercel-ip-country-name'] || req.headers['x-vercel-ip-country'] || 'Desconhecido');
      const region = decodeURIComponent(req.headers['x-vercel-ip-country-region'] || '');
      const city = decodeURIComponent(req.headers['x-vercel-ip-city'] || 'Desconhecido');

      // Check if visitor exists
      const { data: existing } = await supabase
        .from('visitors')
        .select('id')
        .eq('session_id', session_id)
        .maybeSingle();

      if (existing) {
        // Update last_seen
        const { data, error } = await supabase
          .from('visitors')
          .update({ city, region, country, last_seen: new Date().toISOString() })
          .eq('id', existing.id)
          .select()
          .single();
        if (error) throw error;
        return res.status(200).json(data);
      } else {
        // Insert new visitor
        const { data, error } = await supabase
          .from('visitors')
          .insert({ session_id, city, region, country, last_seen: new Date().toISOString() })
          .select()
          .single();
        if (error) throw error;
        return res.status(200).json(data);
      }
    }

    if (req.method === 'GET') {
      // Get visitors from last 5 minutes
      const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
      const { data, error } = await supabase
        .from('visitors')
        .select('*')
        .gte('last_seen', fiveMinAgo)
        .order('last_seen', { ascending: false });
      if (error) throw error;
      return res.status(200).json(data);
    }

    if (req.method === 'DELETE') {
      // Clean up old visitors (older than 10 min)
      const tenMinAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();
      const { error } = await supabase
        .from('visitors')
        .delete()
        .lt('last_seen', tenMinAgo);
      if (error) throw error;
      return res.status(200).json({ ok: true });
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error:', err);
    res.status(500).json({ error: err.message });
  }
}
