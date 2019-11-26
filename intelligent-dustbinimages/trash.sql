-- phpMyAdmin SQL Dump
-- version 4.0.4
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2017 年 09 月 05 日 07:19
-- 服务器版本: 5.6.12-log
-- PHP 版本: 5.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `trash`
--
CREATE DATABASE IF NOT EXISTS `trash` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `trash`;

-- --------------------------------------------------------

--
-- 表的结构 `trashdetails`
--

CREATE TABLE IF NOT EXISTS `trashdetails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `crashID` tinyint(4) NOT NULL,
  `temValue` double NOT NULL DEFAULT '0' COMMENT '温度值',
  `infValue` tinyint(4) NOT NULL DEFAULT '0' COMMENT '红外值',
  `lightValue` double NOT NULL DEFAULT '0' COMMENT '光照值',
  `capacity` tinyint(4) NOT NULL DEFAULT '0',
  `receiveTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `cleanTime` datetime DEFAULT '0000-00-00 00:00:01',
  `note` tinyint(4) NOT NULL DEFAULT '0' COMMENT '垃圾桶状态',
  `truckID` varchar(10) NOT NULL DEFAULT '0' COMMENT '垃圾车编号',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

--
-- 转存表中的数据 `trashdetails`
--

INSERT INTO `trashdetails` (`id`, `crashID`, `temValue`, `infValue`, `lightValue`, `capacity`, `receiveTime`, `cleanTime`, `note`, `truckID`) VALUES
(3, 1, 37.3, 1, 10.2, 80, '2017-09-01 04:33:00', '2017-09-03 13:00:00', 1, '0'),
(4, 1, 60.5, 1, 10.5, 0, '2017-09-03 05:13:00', '0000-00-00 00:00:01', -1, '0'),
(5, 4, 32, 1, 50.5, 90, '2017-09-01 01:00:00', '2017-09-03 09:17:00', 1, '235'),
(8, 4, 37, 1, 200.33, 1, '2017-09-05 00:49:06', '0000-00-00 00:00:01', 0, '0');

-- --------------------------------------------------------

--
-- 表的结构 `trashposition`
--

CREATE TABLE IF NOT EXISTS `trashposition` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `crashID` tinyint(4) NOT NULL,
  `latitude` double NOT NULL COMMENT '纬度',
  `longitude` double NOT NULL COMMENT '经度',
  `site` varchar(32) NOT NULL COMMENT '具体位置',
  `type` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=11 ;

--
-- 转存表中的数据 `trashposition`
--

INSERT INTO `trashposition` (`id`, `crashID`, `latitude`, `longitude`, `site`, `type`) VALUES
(1, 1, 28.176945578173324, 112.94466957804863, '湖大垃圾站', 1),
(2, 2, 28.18213283600413, 112.94264182803337, '大礼堂', 0),
(3, 3, 28.17843076567516, 112.94081237997058, '图书馆', 0),
(4, 4, 28.182506770586404, 112.9389777490044, '东方红广场', 0),
(5, 5, 28.18117333828266, 112.9418959924126, '红楼', 0),
(6, 6, 28.180691028882528, 112.93882754529956, '复临舍', 0),
(7, 7, 28.17967400312619, 112.94208392855828, '前进楼', 0),
(8, 8, 28.179050214946194, 112.9394820042992, '东楼', 0),
(9, 9, 28.181447591674516, 112.94039395536426, '研究生院楼', 0),
(10, 1, 28.17789604259819, 112.94153675791924, '岳麓书院', 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
