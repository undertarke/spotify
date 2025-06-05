CREATE TABLE `users` (
  `id` integer PRIMARY KEY,
  `email` varchar(255),
  `password` varchar(255),
  `username` varchar(255),
  `avatar` varchar(255),
  `bio` varchar(255)
);

CREATE TABLE `videos` (
  `id` integer PRIMARY KEY,
  `user_id` integer,
  `title` varchar(255),
  `description` text,
  `hashtags` varchar(255),
  `privacy_level` varchar(255) DEFAULT 'public',
  `video_url` varchar(255),
  `related_video_ids` text,
  `duration_in_seconds` integer,
  `likes_count` integer DEFAULT 0,
  `comments_count` integer DEFAULT 0,
  `views_count` integer DEFAULT 0,
  `video_type` ENUM(short,long),
  `category_id` integer
);

CREATE TABLE `categories` (
  `id` integer PRIMARY KEY,
  `name` varchar(255)
);

CREATE TABLE `history_videos` (
  `id` integer PRIMARY KEY,
  `user_id` integer,
  `video_id` integer,
  `view_time` timestamp DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `comments` (
  `id` integer PRIMARY KEY,
  `user_id` integer,
  `video_id` integer,
  `content` text
);

CREATE TABLE `likes` (
  `id` integer PRIMARY KEY,
  `user_id` integer,
  `video_id` integer
);

CREATE TABLE `followers` (
  `id` integer PRIMARY KEY,
  `follower_user_id` integer,
  `following_user_id` integer
);

CREATE TABLE `bookmarks` (
  `id` integer PRIMARY KEY,
  `user_id` integer,
  `video_id` integer
);

ALTER TABLE `videos` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `likes` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `likes` ADD FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`);

ALTER TABLE `followers` ADD FOREIGN KEY (`follower_user_id`) REFERENCES `users` (`id`);

ALTER TABLE `followers` ADD FOREIGN KEY (`following_user_id`) REFERENCES `users` (`id`);

ALTER TABLE `videos` ADD FOREIGN KEY (`id`) REFERENCES `videos` (`related_video_ids`);

ALTER TABLE `history_videos` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `history_videos` ADD FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`);

ALTER TABLE `bookmarks` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `bookmarks` ADD FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`);

ALTER TABLE `videos` ADD FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);
