import pool from "../config/db.js";

const addSchool = async (req, res) => {
  try {
    const schoolDetail = req.body;

    const add = await pool.query(
      `INSERT INTO schoolTable (name, address, latitude, longitude)
       VALUES (?, ?, ?, ?)`
      ,
      [
        schoolDetail.name,
        schoolDetail.address,
        schoolDetail.latitude,
        schoolDetail.longitude
      ]
    );

    if (add[0].affectedRows === 1) {
      return res.status(201).json({ message: "School details added", success: true });
    }
    
    return res.status(400).json({ message: "Insert failed", success: false });
  } catch (error) {
    
    if(error.errno === 1062){
      return res.status(500).json({message : `${error.sqlMessage.split(" ")[7]} cannot be duplicate`})
    }
    console.log(error.sqlMessage)
    return res.status(500).json({ message:` ${error.message.split(" ")[1]} cannot be empty`, success: false });
  }
};

export default addSchool;
