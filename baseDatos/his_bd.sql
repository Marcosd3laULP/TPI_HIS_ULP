-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-05-2025 a las 02:34:34
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `his_bd`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `atenciones`
--

CREATE TABLE `atenciones` (
  `ID_paciente` int(11) NOT NULL,
  `ID_Profesional` int(11) NOT NULL,
  `Fecha` date NOT NULL,
  `Motivo` text NOT NULL,
  `Diagnostico` text NOT NULL,
  `Indicaciones` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pacientes`
--

CREATE TABLE `pacientes` (
  `ID_paciente` int(11) NOT NULL,
  `Nombre` text NOT NULL,
  `Apellido` text NOT NULL,
  `DNI` int(8) NOT NULL,
  `Seguro` text NOT NULL,
  `Domicilio` text NOT NULL,
  `Telefono` int(8) NOT NULL,
  `Antecedentes` text DEFAULT NULL,
  `Tratamientos` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesionalessalud`
--

CREATE TABLE `profesionalessalud` (
  `ID_Profesional` int(11) NOT NULL,
  `Nombre` text NOT NULL,
  `Apellido` text NOT NULL,
  `Rol` text NOT NULL,
  `Especialidad` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `atenciones`
--
ALTER TABLE `atenciones`
  ADD KEY `ID_paciente` (`ID_paciente`),
  ADD KEY `ID_Profesional` (`ID_Profesional`);

--
-- Indices de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`ID_paciente`),
  ADD UNIQUE KEY `DNI` (`DNI`);

--
-- Indices de la tabla `profesionalessalud`
--
ALTER TABLE `profesionalessalud`
  ADD PRIMARY KEY (`ID_Profesional`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `ID_paciente` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `profesionalessalud`
--
ALTER TABLE `profesionalessalud`
  MODIFY `ID_Profesional` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `atenciones`
--
ALTER TABLE `atenciones`
  ADD CONSTRAINT `atenciones_ibfk_1` FOREIGN KEY (`ID_paciente`) REFERENCES `pacientes` (`ID_paciente`),
  ADD CONSTRAINT `atenciones_ibfk_2` FOREIGN KEY (`ID_Profesional`) REFERENCES `profesionalessalud` (`ID_Profesional`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
