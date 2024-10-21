CREATE TABLE users (
  id   BIGINT  NOT NULL AUTO_INCREMENT,
  user_id varchar(255) UNIQUE NOT NULL,
  name varchar(255) NOT NULL,
  address varchar(255) NOT NULL,
  email varchar(255) UNIQUE NOT NULL,
  password varchar(255) NOT NULL,
  sex integer NOT NULL,
  birthday varchar(255) NOT NULL,
  role varchar(255) NOT NULL,
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
  deleted_at TIMESTAMP DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE user_notes (
  user_id varchar(255) NOT NULL,
  note_id varchar(255) NOT NULL,
  inserted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, note_id),
  FOREIGN KEY (user_id) REFERENCES users (user_id),
  FOREIGN KEY (note_id) REFERENCES notes (note_id)
);

-- user
INSERT INTO users (user_id, name, address, email, password, sex, birthday, role) VALUES ('user_id_1', 'test_user_1', '東京都', 'test-user-01@example.com', '$2b$10$GssY.7nDerKnybhYwAJBE.GQbhxatGa9cJOlyAzF1nVFAz2dghjyK', 1, '1990-01-01', 'user');
INSERT INTO users (user_id, name, address, email, password, sex, birthday, role) VALUES ('user_id_2', 'test_user_2', '大阪府', 'test-user-02@example.com', '$2b$10$1m8es18X8eCKa8VIUvwTnuJ4Vs.F40ECXEj/bpJw1b23qT9hqs8ey', 0, '1992-03-14', 'user');
INSERT INTO users (user_id, name, address, email, password, sex, birthday, role) VALUES ('user_id_3', 'test_user_3', '北海道', 'test-user-03@example.com', '$2b$10$P11WBf9/1kUVL0xZiZu5QeKNIu89bHbIvYzBhffRTbGRYaQ4rwEkC', 1, '1990-10-26', 'admin');
-- note
INSERT INTO notes (note_id, title, tags, content) VALUES ('note_id_1', 'test note 1', 'test', 'test note 1');
INSERT INTO notes (note_id, title, tags, content) VALUES ('note_id_2', 'test note 2', 'タイトル', 'コンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツ');
INSERT INTO notes (note_id, title, tags, content) VALUES ('note_id_3', 'test note 3', '## Title', 'コンテンツ　コンテンツ　コンテンツ\nコンテンツ　コンテンツ　コンテンツ\nコンテンツ　コンテンツ　コンテンツ\n');
-- note owned by user
INSERT INTO user_notes (user_id, note_id) VALUES ('user_id_1', 'note_id_1');
INSERT INTO user_notes (user_id, note_id) VALUES ('user_id_2', 'note_id_2');
INSERT INTO user_notes (user_id, note_id) VALUES ('user_id_3', 'note_id_3');

