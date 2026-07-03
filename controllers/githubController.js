const db = require("../config/db");
const { fetchGitHubProfile } = require("../services/githubService");

const getAllProfiles = (req, res) => {
    db.query("SELECT * FROM profiles", (err, result) => {
        if (err) return res.status(500).json(err);

        res.json(result);
    });
};

const getProfile = (req, res) => {

    const { username } = req.params;

    db.query(
        "SELECT * FROM profiles WHERE username=?",
        [username],
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            if (result.length === 0)
                return res.status(404).json({
                    message: "Profile not found"
                });

            res.json(result[0]);
        }
    );
};

const analyzeUser = async (req, res) => {
    try {
        const { username } = req.params;

        const data = await fetchGitHubProfile(username);

        const sql = `
        INSERT INTO profiles
        (
            username,
            name,
            bio,
            followers,
            following,
            public_repos,
            public_gists,
            profile_url,
            avatar_url,
            created_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            name = VALUES(name),
            bio = VALUES(bio),
            followers = VALUES(followers),
            following = VALUES(following),
            public_repos = VALUES(public_repos),
            public_gists = VALUES(public_gists),
            profile_url = VALUES(profile_url),
            avatar_url = VALUES(avatar_url),
            created_at = VALUES(created_at)
        `;

        db.query(
            sql,
            [
                data.login,
                data.name,
                data.bio,
                data.followers,
                data.following,
                data.public_repos,
                data.public_gists,
                data.html_url,
                data.avatar_url,
                new Date(data.created_at),
            ],
            (err) => {
                if (err) {
                    return res.status(500).json({ 
                        message: "Database Error"
                    });
                }

                res.json({
                    message: "Profile analyzed successfully",
                    profile: data.login,
                });
            }
        );
    } catch (error) {
        console.error(error.message);
        res.status(error.response?.status || 500).json({
            message : error.response?.status === 404 ? "GitHub user not found" : "Internal Server Error",
        });
    }
};

module.exports = {
    analyzeUser,
    getAllProfiles,
    getProfile,
};