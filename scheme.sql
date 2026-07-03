CREATE DATABASE github_analyzer;

USE github_analyzer;

CREATE TABLE profiles (

id INT AUTO_INCREMENT PRIMARY KEY,

username VARCHAR(100) UNIQUE,

name VARCHAR(255),

bio TEXT,

followers INT,

following INT,

public_repos INT,

public_gists INT,

profile_url VARCHAR(255),

avatar_url VARCHAR(255),

created_at DATETIME,

analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);