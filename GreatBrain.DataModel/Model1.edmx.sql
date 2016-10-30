



-- -----------------------------------------------------------
-- Entity Designer DDL Script for MySQL Server 4.1 and higher
-- -----------------------------------------------------------
-- Date Created: 10/28/2015 01:06:30
-- Generated from EDMX file: C:\github\great-brain-site\GreatBrain.DataModel\Model1.edmx
-- Target version: 3.0.0.0
-- --------------------------------------------------

DROP DATABASE IF EXISTS `great_brain`;
CREATE DATABASE `great_brain`;
USE `great_brain`;

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- NOTE: if the constraint does not exist, an ignorable error will be reported.
-- --------------------------------------------------

--    ALTER TABLE `EdicationalInstitution` DROP CONSTRAINT `FK_EducationCountryEdicationalInstitution`;
--    ALTER TABLE `EducationalInstitutionImage` DROP CONSTRAINT `FK_EdicationalInstitutionEducationalInstitutionImage`;
--    ALTER TABLE `EducationCategory` DROP CONSTRAINT `FK_EducationCountryEducationCategory`;
--    ALTER TABLE `AgeGroup` DROP CONSTRAINT `FK_EducationCategoryAgeGroup`;
--    ALTER TABLE `ArticleImage` DROP CONSTRAINT `FK_ArticleArticleImage`;

-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------
SET foreign_key_checks = 0;
    DROP TABLE IF EXISTS `MainBanner`;
    DROP TABLE IF EXISTS `ParallaxImage`;
    DROP TABLE IF EXISTS `ContentAnnouncement`;
    DROP TABLE IF EXISTS `EducationCountry`;
    DROP TABLE IF EXISTS `EdicationalInstitution`;
    DROP TABLE IF EXISTS `EducationalInstitutionImage`;
    DROP TABLE IF EXISTS `EducationCategory`;
    DROP TABLE IF EXISTS `AgeGroup`;
    DROP TABLE IF EXISTS `BlogItem`;
    DROP TABLE IF EXISTS `MapLocation`;
    DROP TABLE IF EXISTS `Article`;
    DROP TABLE IF EXISTS `ArticleImage`;
    DROP TABLE IF EXISTS `ServiceContent`;
    DROP TABLE IF EXISTS `Content`;
SET foreign_key_checks = 1;

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

CREATE TABLE `MainBanner`(
	`Id` int NOT NULL AUTO_INCREMENT UNIQUE, 
	`ImageSrc` varchar (200), 
	`Title` varchar (200), 
	`TitleEn` varchar (200), 
	`Description` varchar (500), 
	`DescriptionEn` varchar (500), 
	`Sign` varchar (100), 
	`SignEn` varchar (100), 
	`SignImageSrc` varchar (200), 
	`SortOrder` int NOT NULL);

ALTER TABLE `MainBanner` ADD PRIMARY KEY (Id);




CREATE TABLE `ParallaxImage`(
	`Id` int NOT NULL AUTO_INCREMENT UNIQUE, 
	`ImageSrc` varchar (200) NOT NULL, 
	`SortOrder` int NOT NULL);

ALTER TABLE `ParallaxImage` ADD PRIMARY KEY (Id);




CREATE TABLE `ContentAnnouncement`(
	`Id` int NOT NULL AUTO_INCREMENT UNIQUE, 
	`Title` varchar (200), 
	`TitleEn` varchar (200), 
	`Text` longtext, 
	`TextEn` longtext, 
	`ImageSrc` varchar (200), 
	`Url` varchar (200), 
	`SortOrder` int NOT NULL);

ALTER TABLE `ContentAnnouncement` ADD PRIMARY KEY (Id);




CREATE TABLE `EducationCountry`(
	`Id` int NOT NULL AUTO_INCREMENT UNIQUE, 
	`Title` varchar (200), 
	`TitleEn` varchar (200), 
	`Name` varchar (200), 
	`SortOrder` int NOT NULL);

ALTER TABLE `EducationCountry` ADD PRIMARY KEY (Id);




CREATE TABLE `EducationalInstitution`(
	`Id` int NOT NULL AUTO_INCREMENT UNIQUE, 
	`Name` varchar (200) NOT NULL, 
	`Title` varchar (200), 
	`TitleEn` varchar (200), 
	`LocationName` varchar (200) NOT NULL, 
	`LocationTitle` varchar (200), 
	`LocationTitleEn` varchar (200), 
	`Gender` varchar (10), 
	`Type` varchar (50), 
	`PreviewImageSrc` varchar (200), 
	`Address` varchar (200), 
	`AddressEn` varchar (200), 
	`MapLocation` varchar (200), 
	`MinAge` varchar (200), 
	`YearOfFoundation` varchar (200), 
	`NumberOfStudents` varchar (200), 
	`RectorName` varchar (200), 
	`RectorNameEn` varchar (200), 
	`Contacts` varchar (200), 
	`ContactsEn` varchar (200), 
	`Email` varchar (200), 
	`WebSiteUrl` varchar (200), 
	`Description` longtext, 
	`DescriptionEn` longtext, 
	`LogoImageSrc` varchar (200), 
	`SortOrder` int NOT NULL, 
	`IsSpecial` bool NOT NULL, 
	`EducationCountryId` int NOT NULL, 
	`ShowAsBanner` bool NOT NULL, 
	`BannerImageSrc` varchar (200));

ALTER TABLE `EducationalInstitution` ADD PRIMARY KEY (Id);




CREATE TABLE `EducationalInstitutionImage`(
	`Id` int NOT NULL AUTO_INCREMENT UNIQUE, 
	`ImageSrc` varchar (200) NOT NULL, 
	`EdicationalInstitutionId` int NOT NULL);

ALTER TABLE `EducationalInstitutionImage` ADD PRIMARY KEY (Id);




CREATE TABLE `EducationCategory`(
	`Id` int NOT NULL AUTO_INCREMENT UNIQUE, 
	`Name` varchar (200) NOT NULL, 
	`Title` varchar (200), 
	`TitleEn` varchar (200), 
	`Age` varchar (100), 
	`AgeEn` varchar (100), 
	`SortOrder` int NOT NULL, 
	`EducationCountryId` int NOT NULL);

ALTER TABLE `EducationCategory` ADD PRIMARY KEY (Id);




CREATE TABLE `AgeGroup`(
	`Id` int NOT NULL AUTO_INCREMENT UNIQUE, 
	`Name` varchar (200) NOT NULL, 
	`Age` varchar (100), 
	`AgeEn` varchar (100), 
	`Text` longtext, 
	`TextEn` longtext, 
	`ImageSrc` varchar (200), 
	`SortOrder` int NOT NULL, 
	`EducationCategoryId` int NOT NULL);

ALTER TABLE `AgeGroup` ADD PRIMARY KEY (Id);




CREATE TABLE `BlogItem`(
	`Id` int NOT NULL AUTO_INCREMENT UNIQUE, 
	`Name` varchar (200) NOT NULL, 
	`Date` datetime NOT NULL, 
	`Title` varchar (200), 
	`TitleEn` varchar (200), 
	`ShortDescription` varchar (200), 
	`ShortDescriptionEn` varchar (200), 
	`Text` longtext, 
	`TextEn` longtext, 
	`PreviewImageSrc` varchar (200), 
	`ShowAsBanner` bool NOT NULL, 
	`BannerImageSrc` varchar (200));

ALTER TABLE `BlogItem` ADD PRIMARY KEY (Id);




CREATE TABLE `MapLocation`(
	`Id` int NOT NULL AUTO_INCREMENT UNIQUE, 
	`Title` varchar (200), 
	`TitleEn` varchar (200), 
	`LocationLat` varchar (100), 
	`LocationLng` varchar (100), 
	`LocationTitle` varchar (200), 
	`LocationTitleEn` varchar (200), 
	`LocationContentAddress` varchar (200), 
	`LocationContentAddressEn` varchar (200), 
	`LocationContentPhone` varchar (200), 
	`LocationContentEmail` varchar (200), 
	`SortOrder` int NOT NULL);

ALTER TABLE `MapLocation` ADD PRIMARY KEY (Id);




CREATE TABLE `Article`(
	`Id` int NOT NULL AUTO_INCREMENT UNIQUE, 
	`Name` varchar (200) NOT NULL, 
	`Date` datetime NOT NULL, 
	`Title` varchar (200), 
	`TitleEn` varchar (200), 
	`ShortDescription` varchar (200), 
	`ShortDescriptionEn` varchar (200), 
	`Text` longtext, 
	`TextEn` longtext, 
	`PreviewImageSrc` varchar (200), 
	`ShowAsBanner` bool NOT NULL, 
	`BannerImageSrc` varchar (200));

ALTER TABLE `Article` ADD PRIMARY KEY (Id);




CREATE TABLE `ArticleImage`(
	`Id` int NOT NULL AUTO_INCREMENT UNIQUE, 
	`ImageSrc` varchar (200) NOT NULL, 
	`ArticleId` int NOT NULL);

ALTER TABLE `ArticleImage` ADD PRIMARY KEY (Id);




CREATE TABLE `ServiceContent`(
	`Id` int NOT NULL AUTO_INCREMENT UNIQUE, 
	`Name` varchar (200) NOT NULL, 
	`Title` varchar (200), 
	`TitleEn` varchar (200), 
	`ServiceType` varchar (50) NOT NULL, 
	`IsSpecial` bool NOT NULL, 
	`SortOrder` int NOT NULL, 
	`Text` longtext, 
	`TextEn` longtext);

ALTER TABLE `ServiceContent` ADD PRIMARY KEY (Id);




CREATE TABLE `Content`(
	`Id` int NOT NULL AUTO_INCREMENT UNIQUE, 
	`Name` varchar (200) NOT NULL, 
	`Title` varchar (200), 
	`TitleEn` varchar (200), 
	`Text` longtext, 
	`TextEn` longtext, 
	`SortOrder` int NOT NULL, 
	`MenuTitle` varchar (200), 
	`MenuTitleEn` varchar (200));

ALTER TABLE `Content` ADD PRIMARY KEY (Id);






-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on `EducationCountryId` in table 'EducationalInstitution'

ALTER TABLE `EducationalInstitution`
ADD CONSTRAINT `FK_EducationCountryEdicationalInstitution`
    FOREIGN KEY (`EducationCountryId`)
    REFERENCES `EducationCountry`
        (`Id`)
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_EducationCountryEdicationalInstitution'

CREATE INDEX `IX_FK_EducationCountryEdicationalInstitution` 
    ON `EducationalInstitution`
    (`EducationCountryId`);

-- Creating foreign key on `EdicationalInstitutionId` in table 'EducationalInstitutionImage'

ALTER TABLE `EducationalInstitutionImage`
ADD CONSTRAINT `FK_EdicationalInstitutionEducationalInstitutionImage`
    FOREIGN KEY (`EdicationalInstitutionId`)
    REFERENCES `EducationalInstitution`
        (`Id`)
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_EdicationalInstitutionEducationalInstitutionImage'

CREATE INDEX `IX_FK_EdicationalInstitutionEducationalInstitutionImage` 
    ON `EducationalInstitutionImage`
    (`EdicationalInstitutionId`);

-- Creating foreign key on `EducationCountryId` in table 'EducationCategory'

ALTER TABLE `EducationCategory`
ADD CONSTRAINT `FK_EducationCountryEducationCategory`
    FOREIGN KEY (`EducationCountryId`)
    REFERENCES `EducationCountry`
        (`Id`)
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_EducationCountryEducationCategory'

CREATE INDEX `IX_FK_EducationCountryEducationCategory` 
    ON `EducationCategory`
    (`EducationCountryId`);

-- Creating foreign key on `EducationCategoryId` in table 'AgeGroup'

ALTER TABLE `AgeGroup`
ADD CONSTRAINT `FK_EducationCategoryAgeGroup`
    FOREIGN KEY (`EducationCategoryId`)
    REFERENCES `EducationCategory`
        (`Id`)
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_EducationCategoryAgeGroup'

CREATE INDEX `IX_FK_EducationCategoryAgeGroup` 
    ON `AgeGroup`
    (`EducationCategoryId`);

-- Creating foreign key on `ArticleId` in table 'ArticleImage'

ALTER TABLE `ArticleImage`
ADD CONSTRAINT `FK_ArticleArticleImage`
    FOREIGN KEY (`ArticleId`)
    REFERENCES `Article`
        (`Id`)
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_ArticleArticleImage'

CREATE INDEX `IX_FK_ArticleArticleImage` 
    ON `ArticleImage`
    (`ArticleId`);

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------
