const con = require("../startup/db").promise();
const transaction = require("./transaction");

async function getVideos() {
  const [data] = await con.query(
    `SELECT
    videos.*,
    CASE WHEN VL.id IS NOT NULL THEN
    JSON_ARRAYAGG(JSON_OBJECT('id', VL.id, 'name', VL.name, 'link', VL.link))
    ELSE NULL END AS video_list
    FROM videos LEFT JOIN video_list AS VL
    ON videos.id = VL.video_id
    GROUP BY videos.id;`
  );

  return data;
}

async function getVideoById(id) {
  const [[data]] = await con.query(
    `SELECT 
        videos.*, 
        CASE WHEN VL.id IS NOT NULL THEN 
        JSON_ARRAYAGG(JSON_OBJECT('id', VL.id, 'name', VL.name, 'link', VL.link))
        ELSE NULL END AS video_list
        FROM videos LEFT JOIN video_list AS VL
        ON videos.id = VL.video_id
        WHERE videos.id = ?
        GROUP BY videos.id;`,
    [id]
  );

  if (!data) throw new Error("Video not found");

  return data;
}

async function postVideo(video) {
  const queries = async (con) => {
    const [data] = await con.query(
      `INSERT INTO videos (name, description)
        VALUES (?, ?)`,
      [video.name, video.description]
    );

    const promise = video.video_list.map((v) => {
      con.query(
        `INSERT INTO video_list (name, link, video_id) VALUES (?, ?, ?)`,
        [v.name, v.link, data.insertId]
      );
    });

    await Promise.all(promise);

    return getVideoById(data.insertId);
  };

  return transaction(queries);
}

async function updateVideo(id, video) {
  const queries = async (con) => {
    const [data] = await con.query(
      `UPDATE videos SET name = ?, description = ? WHERE id = ?`,
      [video.name, video.description, id]
    );

    const [current_videolist] = await con.query(
      "SELECT * FROM video_list WHERE video_id = ?",
      [id]
    );

    const currentVideoName = current_videolist.map(({ name }) => name);
    const newVideoName = video.video_list.map(({ name }) => name);

    const toInsert = [];
    const toDelete = [];
    const toUpdate = [];

    video.video_list.forEach((newVideo) => {
      if (!currentVideoName.includes(newVideo.name)) {
        toInsert.push(
          con.query(
            `INSERT INTO video_list (name, link, video_id) VALUES (?, ?, ?)`,
            [newVideo.name, newVideo.link, id]
          )
        );

        return;
      }

      toUpdate.push(
        con.query(`UPDATE video_list SET link=? WHERE name=? AND video_id=?`, [
          newVideo.link,
          newVideo.name,
          id,
        ])
      );
    });

    current_videolist.forEach((vid) => {
      if (!newVideoName.includes(vid.name)) {
        toDelete.push(
          con.query(`DELETE FROM video_list WHERE id = ?`, [vid.id])
        );
      }
    });

    await Promise.all(toInsert);
    await Promise.all(toUpdate);
    await Promise.all(toDelete);

    return getVideoById(id);
  };

  return transaction(queries);
}

async function deleteVideo(id) {
  const [data] = await con.query(`DELETE FROM videos WHERE id = ?`, [id]);

  return data;
}

async function updateVideoStatus(id, status) {
  const [data] = await con.query(`UPDATE videos SET active = ? WHERE id = ?`, [
    status,
    id,
  ]);

  return getVideoById(id);
}

module.exports = {
  getVideos,
  getVideoById,
  postVideo,
  updateVideo,
  deleteVideo,
  updateVideoStatus,
};
