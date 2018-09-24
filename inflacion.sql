-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-09-2018 a las 05:25:34
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
-- Estructura de tabla para la tabla `inflacion`
--

CREATE TABLE `inflacion` (
  `id` int(11) NOT NULL,
  `mes` varchar(12) NOT NULL,
  `anio` varchar(5) NOT NULL,
  `valor` decimal(10,2) DEFAULT NULL,
  `porcen_mensual` decimal(10,2) NOT NULL,
  `porcen_acumulada` decimal(10,2) NOT NULL,
  `porcen_acumvsanioanterior` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `inflacion`
--

INSERT INTO `inflacion` (`id`, `mes`, `anio`, `valor`, `porcen_mensual`, `porcen_acumulada`, `porcen_acumvsanioanterior`) VALUES
(1, '9', '2018', '99.20', '1.25', '5.98', '10.70'),
(2, '10', '2018', '99.90', '4.25', '5.97', '10.69'),
(5, '12', '2018', '99.99', '9.99', '19.99', '21.99');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `inflacion`
--
ALTER TABLE `inflacion`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `inflacion`
--
ALTER TABLE `inflacion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
