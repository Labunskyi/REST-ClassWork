-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Июл 05 2019 г., 15:38
-- Версия сервера: 10.1.37-MariaDB
-- Версия PHP: 7.3.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `users`
--

-- --------------------------------------------------------

--
-- Структура таблицы `car`
--

CREATE TABLE `car` (
  `CarId` int(100) NOT NULL,
  `Brand` varchar(100) NOT NULL,
  `Model` varchar(100) NOT NULL,
  `Capacity` varchar(100) NOT NULL,
  `Year` int(100) NOT NULL,
  `Colour` varchar(100) NOT NULL,
  `Speed` int(100) NOT NULL,
  `Price` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `car`
--

INSERT INTO `car` (`CarId`, `Brand`, `Model`, `Capacity`, `Year`, `Colour`, `Speed`, `Price`) VALUES
(1, 'Mersedes', 'S600', '6.0', 2017, '1', 250, 100000),
(2, 'BMW', '130', '2.0', 2001, '2', 200, 2000),
(3, 'Mersedes', '100', '2.0', 2017, '3', 200, 50000),
(4, 'Nissan', 'Primera', '2.0', 2016, '4', 200, 30000),
(5, 'Opel', 'Vectra', '2.0', 2010, '1', 200, 30000),
(6, 'BMW', '230', '2.3', 2010, '1', 200, 10000),
(7, 'Opel', 'Corsa', '2.0', 2010, '2', 230, 10000),
(8, 'Toyota', 'Corolla', '2.1', 2010, '1', 200, 10000),
(9, 'BMW', '320', '3.2', 1990, '3', 210, 5000),
(10, 'Mersedes', 'S600', '3.0', 2017, '1', 200, 50);

-- --------------------------------------------------------

--
-- Структура таблицы `colour`
--

CREATE TABLE `colour` (
  `ColourId` int(100) NOT NULL,
  `Color` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `colour`
--

INSERT INTO `colour` (`ColourId`, `Color`) VALUES
(1, 'white'),
(2, 'red'),
(3, 'black'),
(4, 'blue');

-- --------------------------------------------------------

--
-- Структура таблицы `order`
--

CREATE TABLE `order` (
  `OrderId` int(100) NOT NULL,
  `CarId` int(100) NOT NULL,
  `UserId` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Payment` enum('cash','credit card') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `order`
--

INSERT INTO `order` (`OrderId`, `CarId`, `UserId`, `Name`, `Payment`) VALUES
(103, 1, 87, 'v', 'cash'),
(104, 3, 87, 'v', 'cash'),
(105, 3, 88, 'v', 'credit card'),
(106, 4, 87, 'v', 'credit card');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `UserId` int(11) NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`UserId`, `username`, `password`, `token`) VALUES
(87, 's', '1', 'c4ca4238a0b923820dcc509a6f75849b'),
(88, 's3', '2', 'c81e728d9d4c2f636f067f89cc14862c'),
(89, 's4', '3', 'eccbc87e4b5ce2fe28308fd9f2a7baf3');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `car`
--
ALTER TABLE `car`
  ADD PRIMARY KEY (`CarId`);

--
-- Индексы таблицы `colour`
--
ALTER TABLE `colour`
  ADD PRIMARY KEY (`ColourId`);

--
-- Индексы таблицы `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`OrderId`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserId`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `car`
--
ALTER TABLE `car`
  MODIFY `CarId` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT для таблицы `colour`
--
ALTER TABLE `colour`
  MODIFY `ColourId` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `order`
--
ALTER TABLE `order`
  MODIFY `OrderId` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `UserId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
