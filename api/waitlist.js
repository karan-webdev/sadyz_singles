import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const email = (req.body?.email || "").trim().toLowerCase()

    // basic validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email" })
    }

    // insert only (let DB handle duplicates via UNIQUE constraint)
    const { error } = await supabase
      .from("waitlist")
      .insert([{ email }])

    // handle duplicate email
    if (error) {
      if (error.code === "23505") {
        return res.status(200).json({
          success: true,
          isNew: false,
          message: "Already registered",
        })
      }

      console.error("Supabase error:", error)
      return res.status(500).json({ error: "Failed to register email" })
    }

    return res.status(200).json({
      success: true,
      isNew: true
    })
    
  } catch (err) {
    console.error("Server error:", err)
    return res.status(500).json({ error: "Server error" })
  }
}