-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-05-2025 a las 01:36:09
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

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
  `Motivo` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `informes`
--

CREATE TABLE `informes` (
  `Nro_historial` int(11) NOT NULL,
  `ID_Profesional` int(11) NOT NULL,
  `ID_paciente` int(11) NOT NULL,
  `Diagnostico` varchar(200) DEFAULT NULL,
  `Descripcion` varchar(200) DEFAULT NULL,
  `Tratamiento` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pacientes`
--

CREATE TABLE `pacientes` (
  `ID_paciente` int(11) NOT NULL,
  `Nombre` varchar(200) NOT NULL,
  `Apellido` varchar(200) NOT NULL,
  `DNI` int(8) NOT NULL,
  `Sexo` varchar(200) NOT NULL,
  `Seguro` varchar(200) NOT NULL,
  `Domicilio` varchar(200) NOT NULL,
  `Telefono` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pacientes`
--

INSERT INTO `pacientes` (`ID_paciente`, `Nombre`, `Apellido`, `DNI`, `Sexo`, `Seguro`, `Domicilio`, `Telefono`) VALUES
(1, 'zzz', 'zzzz', 777777777, 'masculino', 'zzzzzz', 'plisssss anda', 77777),
(2, 'zzz', 'zzzz', 2147483647, 'masculino', 'zzzzzz', 'plisssss anda', 77777),
(4, 'Martha', 'Chirino', 33333333, 'femenino', 'dosep', 'Lujan', 2147483647),
(5, 'Roberto', 'Musso', 14800957, 'masculino', 'Sin seguro', 'Uruguay', 9999),
(6, 'Jorge ', 'Lanata', 22880450, 'masculino', 'carozzio', 'BS Aires', 1123984283),
(9, 'jaunjo', 'seaz', 65555555, 'masculino', 'Sin seguro', 'Lujan', 0),
(11, 'tututututu', 'lalalalalla', 567768899, 'femenino', 'Sin seguro', 'peru', 77777788);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesionalessalud`
--

CREATE TABLE `profesionalessalud` (
  `ID_Profesional` int(11) NOT NULL,
  `Nombre` varchar(200) NOT NULL,
  `Apellido` varchar(200) NOT NULL,
  `Rol` varchar(200) NOT NULL,
  `Especialidad` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `profesionalessalud`
--

INSERT INTO `profesionalessalud` (`ID_Profesional`, `Nombre`, `Apellido`, `Rol`, `Especialidad`) VALUES
(1, 'Martha', 'Chirino', 'enfermero', 'sin_especialidad');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `turnos`
--

CREATE TABLE `turnos` (
  `ID_paciente` int(11) NOT NULL,
  `Nro_turno` int(11) NOT NULL,
  `Fecha` date NOT NULL,
  `Motivo` varchar(200) NOT NULL,
  `Es_tomado` tinyint(1) NOT NULL,
  `Estado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `turnos`
--

INSERT INTO `turnos` (`ID_paciente`, `Nro_turno`, `Fecha`, `Motivo`, `Es_tomado`, `Estado`) VALUES
(11, 1, '2025-05-23', 'Consulta', 0, 1);

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
-- Indices de la tabla `informes`
--
ALTER TABLE `informes`
  ADD PRIMARY KEY (`Nro_historial`),
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
-- Indices de la tabla `turnos`
--
ALTER TABLE `turnos`
  ADD PRIMARY KEY (`Nro_turno`),
  ADD KEY `ID_paciente` (`ID_paciente`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `informes`
--
ALTER TABLE `informes`
  MODIFY `Nro_historial` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `ID_paciente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `profesionalessalud`
--
ALTER TABLE `profesionalessalud`
  MODIFY `ID_Profesional` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `turnos`
--
ALTER TABLE `turnos`
  MODIFY `Nro_turno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `atenciones`
--
ALTER TABLE `atenciones`
  ADD CONSTRAINT `atenciones_ibfk_1` FOREIGN KEY (`ID_paciente`) REFERENCES `pacientes` (`ID_paciente`),
  ADD CONSTRAINT `atenciones_ibfk_2` FOREIGN KEY (`ID_Profesional`) REFERENCES `profesionalessalud` (`ID_Profesional`);

--
-- Filtros para la tabla `informes`
--
ALTER TABLE `informes`
  ADD CONSTRAINT `informes_ibfk_1` FOREIGN KEY (`ID_paciente`) REFERENCES `pacientes` (`ID_paciente`),
  ADD CONSTRAINT `informes_ibfk_2` FOREIGN KEY (`ID_Profesional`) REFERENCES `profesionalessalud` (`ID_Profesional`);

--
-- Filtros para la tabla `turnos`
--
ALTER TABLE `turnos`
  ADD CONSTRAINT `turnos_ibfk_1` FOREIGN KEY (`ID_paciente`) REFERENCES `pacientes` (`ID_paciente`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
