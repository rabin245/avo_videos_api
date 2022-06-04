const con = require("../startup/db");

async function getVideos() {
  const [data] = await con.promise().query(
    `SELECT 
    videos.*,  
    CASE WHEN VL.list_id IS NOT NULL THEN 
    JSON_ARRAYAGG(JSON_OBJECT('id', VL.list_id, 'name', VL.name, 'link', VL.link))
    ELSE NULL END AS video_list
    FROM videos LEFT JOIN video_list AS VL
    ON videos.id = VL.video_id
    GROUP BY videos.id;`
  );
  console.log(data);
  return data;
}

async function getVideoById(id) {
  const [[data]] = await con.promise().query(
    `SELECT 
        videos.*, 
        CASE VL.list_id THEN 
        JSON_ARRAYAGG(JSON_OBJECT('id', VL.list_id, 'name', VL.name, 'link', VL.link))
        ELSE NULL END AS video_list
        FROM videos LEFT JOIN video_list AS VL
        ON videos.id = VL.video_id
        WHERE videos.id = ?
        GROUP BY videos.id;`,
    [id]
  );
  console.log(data);
  return data;
}

async function postVideo(video) {
  const [data] = await con.promise().query(
    `INSERT INTO videos (name, description)
      VALUES (?, ?)`,
    [video.name, video.description]
  );
  console.log(data.insertId);

  const promise = video.video_list.map((v) => {
    con
      .promise()
      .query(`INSERT INTO video_list (name, link, video_id) VALUES (?, ?, ?)`, [
        v.name,
        v.link,
        data.insertId,
      ]);
  });

  await Promise.all(promise);
  console.log(promise);
  return getVideoById(data.insertId);
}

module.exports = { getVideos, getVideoById, postVideo };
