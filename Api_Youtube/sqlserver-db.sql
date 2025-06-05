CREATE DATABASE api_youtube;

use api_youtube;

CREATE TABLE [users] (
  [id] INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
  [email] NVARCHAR(255),
  [password] NVARCHAR(255),
  [username] NVARCHAR(255),
  [avatar] NVARCHAR(255),
  [bio] NVARCHAR(255)
)
GO

CREATE TABLE [videos] (
  [id] INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
  [user_id] INT,
  [title] NVARCHAR(255),
  [description] TEXT,
  [hashtags] NVARCHAR(255),
  [privacy_level] NVARCHAR(255) DEFAULT 'public',
  [video_url] NVARCHAR(255),
  [related_video_ids] NVARCHAR(255) NULL,
  [duration_in_seconds] INT,
  [views_count] INT DEFAULT 0,
  [video_type] NVARCHAR(10),
  [category_id] INT NULL,
  CONSTRAINT chk_video_type CHECK (video_type IN ('short', 'long'))
)
GO

CREATE TABLE [categories] (
  [id] INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
  [name] NVARCHAR(255)
)
GO

CREATE TABLE [history_videos] (
  [id] INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
  [user_id] INT,
  [video_id] INT,
  [view_time] DATETIME DEFAULT CURRENT_TIMESTAMP
)
GO

CREATE TABLE [comments] (
  [id] INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
  [user_id] INT,
  [video_id] INT,
  [content] TEXT
)
GO

CREATE TABLE [likes] (
  [id] INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
  [user_id] INT,
  [video_id] INT
)
GO

CREATE TABLE [followers] (
  [id] INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
  [follower_user_id] INT,
  [following_user_id] INT
)
GO

CREATE TABLE [bookmarks] (
  [id] INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
  [user_id] INT,
  [video_id] INT
)
GO

ALTER TABLE [videos] ADD FOREIGN KEY ([user_id]) REFERENCES [users] ([id])
GO

ALTER TABLE [likes] ADD FOREIGN KEY ([user_id]) REFERENCES [users] ([id])
GO

ALTER TABLE [likes] ADD FOREIGN KEY ([video_id]) REFERENCES [videos] ([id])
GO

ALTER TABLE [comments] ADD FOREIGN KEY ([user_id]) REFERENCES [users] ([id])
GO

ALTER TABLE [comments] ADD FOREIGN KEY ([video_id]) REFERENCES [videos] ([id])
GO

ALTER TABLE [followers] ADD FOREIGN KEY ([follower_user_id]) REFERENCES [users] ([id])
GO

ALTER TABLE [followers] ADD FOREIGN KEY ([following_user_id]) REFERENCES [users] ([id])
GO

ALTER TABLE [history_videos] ADD FOREIGN KEY ([user_id]) REFERENCES [users] ([id])
GO

ALTER TABLE [history_videos] ADD FOREIGN KEY ([video_id]) REFERENCES [videos] ([id])
GO

ALTER TABLE [bookmarks] ADD FOREIGN KEY ([user_id]) REFERENCES [users] ([id])
GO

ALTER TABLE [bookmarks] ADD FOREIGN KEY ([video_id]) REFERENCES [videos] ([id])
GO

ALTER TABLE [videos] ADD FOREIGN KEY ([category_id]) REFERENCES [categories] ([id])
GO
