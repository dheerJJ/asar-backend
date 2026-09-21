const express = require("express");
const router = express.Router();
const { query } = require("../config/db");

router.post("/users", async (req, res) => {
  const { name, email } = req.body;

  // Validation check
  if (!name || !email) {
    return res.status(400).json({ error: "Name aur Email dono zaroori hain!" });
  }

  try {
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
    if (error.code === "23505") {
      return res
        .status(400)
        .json({ error: "Yeh email pehle se database mein maujood hai." });
    }

    res.status(500).json({ error: "Server mein kuch takleef hai." });
  }
});

module.exports = router;
