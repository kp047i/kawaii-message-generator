CREATE TABLE `messages`
(
  id bigint auto_increment,
  image varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO messages (`image`) VALUES ('test1');