drop table carData;
create table carData(
  carId int(20) AUTO_INCREMENT PRIMARY KEY,
  maker varchar(50), model varchar(100),
  grade varchar(100),
  bodyColor varchar(100),
  price int(10),
  navi char(1),
  kawa char(1),
  sr char(1)
);

insert into carData(
  maker,
  model,
  grade,
  bodyColor,
  price,
  navi,
  kawa,
  sr
) values (
  '日産',
  'ノート',
  'e-Power X',
  'プレミアムホライゾンオレンジ',
  2000000,
  "1",
  "",
  "1"
);
