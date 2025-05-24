import pool from "../config/db.js";

const listSchool = async (req, res) => {
  const { latitude, longitude } = req.query; // pass latitude and longitude of user as query params

  if(latitude === undefined || longitude === undefined){
    return res.status(400).json({message : "Params cannot be empty. Provide both latitude and longitude"});
  }
  try {
    // fetching the list of School based on proximity to the user's location,
    const resultList = await pool.query(
      `SELECT *,
        (
          6371 * 2 * ASIN(
          SQRT(
            POWER(SIN(RADIANS((latitude - ?) / 2)), 2) +
            COS(RADIANS(?)) * COS(RADIANS(latitude)) *
            POWER(SIN(RADIANS((longitude - ?) / 2)), 2)
          )
        )
      ) AS distance_km
        FROM schoolTable
        ORDER BY distance_km ASC`,
      [latitude, latitude, longitude]
    );

    if(resultList[0].length === 0){
      return res.status(200).json({message : "No School enlisted till now"});
    }
    res.status(200).json(resultList[0]);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error", success: false });
  }
};

export default listSchool;