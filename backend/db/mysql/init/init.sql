CREATE TABLE users (
  id   BIGINT  NOT NULL AUTO_INCREMENT,
  user_id varchar(255) UNIQUE NOT NULL,
  name varchar(255) NOT NULL,
  address varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  sex integer NOT NULL,
  birthday varchar(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE notes (
  id   BIGINT  NOT NULL AUTO_INCREMENT,
  note_id varchar(255) UNIQUE NOT NULL,
  title varchar(255) NOT NULL,
  tags varchar(255) NOT NULL,
  content text NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE user_notes (
  user_id varchar(255) NOT NULL,
  note_id varchar(255) NOT NULL,
  PRIMARY KEY (user_id, note_id),
  FOREIGN KEY (user_id) REFERENCES users (user_id),
  FOREIGN KEY (note_id) REFERENCES notes (note_id)
);

INSERT INTO users (user_id, name,address,birthday,sex, email, password, created_at, updated_at) VALUES ('d4a6e9b6-f079-45c9-b6d0-565cf4280596', 'admin','tokyo','2000-01-30',0, 'hoge@piyo,.com', '234546', '2021-01-01 00:00:00', '2021-01-01 00:00:00');
INSERT INTO users (user_id, name,address,birthday,sex, email, password, created_at, updated_at) VALUES ('d4a6e9b6-f079-45c9-b6d0-565cf4280597', 'admin','tokyo','2000-01-30',0, 'hoge@piyo,.com', '46366436', '2021-01-01 00:00:00', '2021-01-01 00:00:00');
INSERT INTO users (user_id, name,address,birthday,sex, email, password, created_at, updated_at) VALUES ('d4a6e9b6-f079-45c9-b6d0-565cf4280598', 'admin','tokyo','2000-01-30',0, 'hoge@piyo,.com', '46346', '2021-01-01 00:00:00', '2021-01-01 00:00:00');
INSERT INTO users (user_id, name,address,birthday,sex, email, password, created_at, updated_at) VALUES ('d4a6e9b6-f079-45c9-b6d0-565cf4280599', 'admin','tokyo','2000-01-30',0, 'hoge@piyo,.com', '456357', '2021-01-01 00:00:00', '2021-01-01 00:00:00');
INSERT INTO users (user_id, name,address,birthday,sex, email, password, created_at, updated_at) VALUES ('d4a6e9b6-f079-45c9-b6d0-565cf4280510', 'admin','tokyo','2000-01-30',0, 'hoge@piyo,.com', '357576575', '2021-01-01 00:00:00', '2021-01-01 00:00:00');
INSERT INTO users (user_id, name,address,birthday,sex, email, password, created_at, updated_at) VALUES ('d4a6e9b6-f079-45c9-b6d0-565cf4280512', 'admin','tokyo','2000-01-30',0, 'hoge@piyo,.com', '337574634643', '2021-01-01 00:00:00', '2021-01-01 00:00:00');
INSERT INTO users (user_id, name,address,birthday,sex, email, password, created_at, updated_at) VALUES ('d4a6e9b6-f079-45c9-b6d0-565cf4280513', 'admin','tokyo','2000-01-30',0, 'hoge@piyo,.com', '347345743', '2021-01-01 00:00:00', '2021-01-01 00:00:00');
INSERT INTO notes (note_id, title,tags, content, created_at, updated_at) VALUES ('d4a6e9b6-f079-45c9-b6d0-565cf4280522', 'Welcome to Note App','tag_a,tag_b,tag_c', 'This is a note app', '2021-01-01 00:00:00', '2021-01-01 00:00:00');
INSERT INTO notes (note_id, title,tags, content, created_at, updated_at) VALUES ('d4a6e9b6-f079-45c9-b6d0-565cf4280523', 'Welcome to Note App','tag_a,tag_b,tag_c', 'This is a note app', '2021-01-01 00:00:00', '2021-01-01 00:00:00');
INSERT INTO notes (note_id, title,tags, content, created_at, updated_at) VALUES ('d4a6e9b6-f079-45c9-b6d0-565cf4280524', 'Welcome to Note App','tag_a,tag_b,tag_c', 'This is a note app', '2021-01-01 00:00:00', '2021-01-01 00:00:00');
INSERT INTO notes (note_id, title,tags, content, created_at, updated_at) VALUES ('d4a6e9b6-f079-45c9-b6d0-565cf4280525', 'Welcome to Note App','tag_a,tag_b,tag_c', 'This is a note app', '2021-01-01 00:00:00', '2021-01-01 00:00:00');
INSERT INTO notes (note_id, title,tags, content, created_at, updated_at) VALUES ('d4a6e9b6-f079-45c9-b6d0-565cf4280527', 'Welcome to Note App','tag_a,tag_b,tag_c', 'This is a note app', '2021-01-01 00:00:00', '2021-01-01 00:00:00');
INSERT INTO notes (note_id, title,tags, content, created_at, updated_at) VALUES ('d4a6e9b6-f079-45c9-b6d0-565cf4280528', 'Welcome to Note App','tag_a,tag_b,tag_c', 'This is a note app', '2021-01-01 00:00:00', '2021-01-01 00:00:00');
INSERT INTO notes (note_id, title,tags, content, created_at, updated_at) VALUES ('d4a6e9b6-f079-45c9-b6d0-565cf4280529', 'Welcome to Note App','tag_a,tag_b,tag_c', 'This is a note app', '2021-01-01 00:00:00', '2021-01-01 00:00:00');
INSERT INTO notes (note_id, title,tags, content, created_at, updated_at) VALUES ('d4a6e9b6-f079-45c9-b6d0-565cf4280521', 'Welcome to Note App','tag_a,tag_b,tag_c', 'This is a note app', '2021-01-01 00:00:00', '2021-01-01 00:00:00');
INSERT INTO user_notes (user_id, note_id) VALUES ('d4a6e9b6-f079-45c9-b6d0-565cf4280596', 'd4a6e9b6-f079-45c9-b6d0-565cf4280522');
INSERT INTO user_notes (user_id, note_id) VALUES ('d4a6e9b6-f079-45c9-b6d0-565cf4280596', 'd4a6e9b6-f079-45c9-b6d0-565cf4280523');
INSERT INTO user_notes (user_id, note_id) VALUES ('d4a6e9b6-f079-45c9-b6d0-565cf4280596', 'd4a6e9b6-f079-45c9-b6d0-565cf4280524');
INSERT INTO user_notes (user_id, note_id) VALUES ('d4a6e9b6-f079-45c9-b6d0-565cf4280596', 'd4a6e9b6-f079-45c9-b6d0-565cf4280525');
INSERT INTO user_notes (user_id, note_id) VALUES ('d4a6e9b6-f079-45c9-b6d0-565cf4280596', 'd4a6e9b6-f079-45c9-b6d0-565cf4280527');
