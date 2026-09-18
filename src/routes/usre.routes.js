const express = require("express");
const router = express.Router();
const { query } = require("../config/db"); // Aapka db connection path

// POST: Naya user add karne ke liye
router.post("/users", async (req, res) => {
  const { name, email } = req.body;

  // Validation check
  if (!name || !email) {
    return res.status(400).json({ error: "Name aur Email dono zaroori hain!" });
  }

  try {
    // Parameterized SQL Query (SQL Injection se bachne ke liye $1, $2 ka use)
    const sqlText =
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *";
    const values = [name, email];

    const result = await query(sqlText, values);

    // Success response jo saved data return karega
    res.status(201).json({
      message: "🎉 Data successfully save ho gaya database mein!",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("❌ Insertion error:", error.message);

    // Agar same email dobara save karne ki koshish karein (Unique Constraint Error)
    if (error.code === "23505") {
      return res
        .status(400)
        .json({ error: "Yeh email pehle se database mein maujood hai." });
    }

    res.status(500).json({ error: "Server mein kuch takleef hai." });
  }
});

module.exports = router;  
