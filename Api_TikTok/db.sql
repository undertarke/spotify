create database api_tiktok;

use api_tiktok;

CREATE TABLE `users` (
  `id` INTEGER AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(255) UNIQUE NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `username` VARCHAR(255) UNIQUE NOT NULL,
  `avatar` VARCHAR(255),
  `bio` varchar(255)
);

CREATE TABLE `videos` (
  `id` INTEGER AUTO_INCREMENT PRIMARY KEY,
  `user_id` INTEGER,
  `title` VARCHAR(255),
  `description` TEXT,
  `hashtags` VARCHAR(255),
  `privacy_level` ENUM('public', 'private', 'friends') DEFAULT 'public',
  `video_url` VARCHAR(255),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
);

CREATE TABLE `comments` (
  `id` INTEGER AUTO_INCREMENT PRIMARY KEY,
  `user_id` INTEGER NOT NULL,
  `video_id` INTEGER NOT NULL,
  `content` TEXT NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`) ON DELETE CASCADE
);

CREATE TABLE `likes` (
  `id` INTEGER AUTO_INCREMENT PRIMARY KEY,
  `user_id` INTEGER NOT NULL,
  `video_id` INTEGER NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`) ON DELETE CASCADE
);

CREATE TABLE `followers` (
  `id` INTEGER AUTO_INCREMENT PRIMARY KEY,
  `follower_user_id` INTEGER NOT NULL,
  `following_user_id` INTEGER NOT NULL,
  FOREIGN KEY (`follower_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`following_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
);

CREATE TABLE `messages` (
  `id` INTEGER AUTO_INCREMENT PRIMARY KEY,
  `sender_user_id` INTEGER NOT NULL,
  `receiver_user_id` INTEGER NOT NULL,
  `content` TEXT NOT NULL,
  `message_type` ENUM('text', 'image', 'video', 'file') NOT NULL,
  FOREIGN KEY (`sender_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`receiver_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
);

CREATE TABLE `notifications` (
  `id` INTEGER AUTO_INCREMENT PRIMARY KEY,
  `user_id` INTEGER NOT NULL,
  `message` TEXT NOT NULL,
  `type` ENUM('like', 'comment', 'follow', 'message') NOT NULL,
  `is_read` BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
);

CREATE TABLE `bookmarks` (
  `id` INTEGER AUTO_INCREMENT PRIMARY KEY,
  `user_id` INTEGER NOT NULL,
  `video_id` INTEGER NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`) ON DELETE CASCADE
);

ALTER TABLE `notifications` ADD COLUMN `is_enabled` BOOLEAN DEFAULT TRUE;
