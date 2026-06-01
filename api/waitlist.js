import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY

const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false },
    })
  : null

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!supabase) {
    console.error('Missing Supabase configuration')
    return res.status(500).json({ error: 'Supabase configuration is missing' })
  }

  const body = req.body ?? {}
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''

  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Email is invalid' })
  }

  try {
    const { data: existing, error: existingError } = await supabase
      .from('waitlist')
      .select('id')
      .eq('email', email)
      .maybeSingle()

    if (existingError) {
      console.error('Supabase select error:', existingError)
      return res.status(500).json({ error: 'Failed to check waitlist status' })
    }

    if (existing) {
      return res.status(200).json({ success: true, message: 'Already registered' })
    }

    const { error: insertError } = await supabase
      .from('waitlist')
      .insert({ email })
      .select('id')
      .single()

    if (insertError) {
      if (
        insertError.code === '23505' ||
        /duplicate/i.test(insertError.message || '') ||
        /duplicate/i.test(insertError.details || '')
      ) {
        return res.status(200).json({ success: true, message: 'Already registered' })
      }

      console.error('Supabase insert error:', insertError)
      return res.status(500).json({ error: 'Failed to register email' })
    }

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Waitlist error:', error)
    return res.status(500).json({ error: 'Failed to add waitlist email' })
  }
}
