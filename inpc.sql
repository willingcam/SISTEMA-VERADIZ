-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-09-2018 a las 05:26:05
-- Versión del servidor: 10.1.34-MariaDB
-- Versión de PHP: 7.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `veradiz`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inpc`
--

CREATE TABLE `inpc` (
  `id` int(11) NOT NULL,
  `anio` int(5) NOT NULL,
  `mes` int(11) NOT NULL,
  `valor` decimal(10,2) DEFAULT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `inpc`
--

INSERT INTO `inpc` (`id`, `anio`, `mes`, `valor`, `fecha`) VALUES
(1, 2016, 6, '4.20', '2018-09-22'),
(2, 2016, 12, '79.00', '2018-09-22'),
(3, 2018, 9, '89.30', '2018-09-22');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `inpc`
--
ALTER TABLE `inpc`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `inpc`
--
ALTER TABLE `inpc`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
