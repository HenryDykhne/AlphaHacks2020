--SCRIPT TO SETUP AND LOAD DATA ONTO BLANK DB
--ONLY RUN THIS ON A BLANK DB


--STARTUP TABLES
--TWO TABLE SETUP TO LINK TAGS WITH DATA IN STARTUP TABLE
CREATE TABLE startup (
startup_id INTEGER NOT NULL PRIMARY KEY,
name TEXT NOT NULL,
yt_link TEXT NOT NULL,
email TEXT NOT NULL,
content TEXT NOT NULL
);

CREATE TABLE startupToStartTag (
startup_id INTEGER,
tag_text TEXT,
primary key (startup_id,tag_text)
);

--VC TABLES
--TWO TABLE SETUP TO LINK TAGS WITH DATA IN vc TABLE
CREATE TABLE vc (
vc_id INTEGER NOT NULL PRIMARY KEY,
name TEXT NOT NULL,
text TEXT NOT NULL,
email TEXT NOT NULL
);

CREATE TABLE vcTovcTag (
vc_id INTEGER,
tag_text TEXT,
primary key (vc_id,tag_text)
);

--LOAD VC MOCK DATA
INSERT INTO vc (vc_id,name,text,email)
VALUES (8888888888888,"Kevin O'Donnel","kdo@odonnelventures.com","Kevin O'Donnel's first venture was selling unwanted newspapers for dimes. Now, as the owner of his own VC firm, Kevin wants to offer a leg up to promising entrepreneurs and innovators. Kevin has decades of experience in monetizing ideas, avoiding stagnation and providing expert marketing advice.
Kevin is interested in investing in: Tech, Finance, Law, Multimedia. Reach out to Kevin and give him your pitch!");

INSERT INTO vc (vc_id,name,text,email)
VALUES (9999999999999,"John Kuban","jk@johnholdings.com","I'm new into the startup game, and I love getting a project running from prototype to finish. I'm a Project Manager at a Fortune 500 company interested in bringing new ideas out into the market. Drop me a message if you need a partner!");

INSERT INTO vc (vc_id,name,text,email)
VALUES (7777777777777,"Hawk Ventures","ventureinquiries@hawkventures.com","We're an established VC firm looking to invest in promising Tech, Health, Energy, and Finance entrepreneurs. If we haven't contacted you yet, please drop us a message and we can arrange a meeting.");

INSERT INTO vcTovcTag (vc_id,tag_text)
VALUES (8888888888888,"finance");

INSERT INTO vcTovcTag (vc_id,tag_text)
VALUES (8888888888888,"shopping");

INSERT INTO vcTovcTag (vc_id,tag_text)
VALUES (8888888888888,"dogs");

INSERT INTO vcTovcTag (vc_id,tag_text)
VALUES (9999999999999,"shopping");

INSERT INTO vcTovcTag (vc_id,tag_text)
VALUES (7777777777777,"finance");

INSERT INTO vcTovcTag (vc_id,tag_text)
VALUES (7777777777777,"dogs");

INSERT INTO vcTovcTag (vc_id,tag_text)
VALUES (7777777777777,"shopping");

--LOAD STARTUP MOCK DATA
INSERT OR IGNORE INTO startup (startup_id,name,yt_link,email,content)
VALUES (1590878630925,"bigMoneyInc","https://www.youtube.com/watch?v=dQw4w9WgXcQ","jeff.bezos@ownsyourmom.com","xd");

INSERT OR IGNORE INTO startup (startup_id,name,yt_link,email,content)
VALUES (2222222222222,"hahahahahah","https://www.youtube.com/watch?v=dQw4w9WgXcQ","lul.xd@ownsyourmom.com","hohohoho");

INSERT OR IGNORE INTO startup (startup_id,name,yt_link,email,content)
VALUES (3333333333333,"StartChain","https://www.youtube.com/watch?v=SSo_EIwHSd4","jeffcarlos@startchain.io","We are a group of individuals seeking experienced guidance on monetizing our Smart Contract implementation, preferably in the realm of Fintech and Law. 
We're looking for forward thinking investors interested in collaborating and shipping an innovative product. We have alot of plans, let's connect and make them happen!");

INSERT OR IGNORE INTO startup (startup_id,name,yt_link,email,content)
VALUES (4444444444444,"ShareCare","https://www.youtube.com/watch?v=1LBu2aslGyA","johnmiurda@newimmune.com","Founded by a group of exhausted medical staff, we seek to reforge the health industry and erase it's inefficiencies. Our first product enables practitioners and patients to connect without 
the bureacracy. Patients get the care they need, and practitioners can do they jobs they signed up for. We're looking for several investors, particularly those involved in Health, Government and Tech. Contact John Miurda for our 2021 roadmap and further details.");

INSERT OR IGNORE INTO startup (startup_id,name,yt_link,email,content)
VALUES (5555555555555,"Solomon Expeditions Inc.","https://www.youtube.com/watch?v=p-HxhJLUYhk","solomonjames@solomon.com","Since establishing in 2010, we've succesfully managed 14 early stage gold exploration projects. We have a team of top geologists and have a solid system of evaluating future projects. 
So far, we've given our shareholders acquisition options for top performing mines across Ontario. However, we're looking for financing and expertise for some endeavours outside our expertise. We would love to be in conversation with investors in the Mining business! Please talk to Solomon for more details.");

INSERT OR IGNORE INTO startupTostartTag (startup_id,tag_text)
VALUES (3333333333333,"finance");

INSERT OR IGNORE INTO startupTostartTag (startup_id,tag_text)
VALUES (3333333333333,"shopping");

INSERT OR IGNORE INTO startupTostartTag (startup_id,tag_text)
VALUES (4444444444444,"dogs");

INSERT OR IGNORE INTO startupTostartTag (startup_id,tag_text)
VALUES (5555555555555,"finance");

INSERT OR IGNORE INTO startupTostartTag (startup_id,tag_text)
VALUES (5555555555555,"dogs");

INSERT OR IGNORE INTO startupTostartTag (startup_id,tag_text)
VALUES (5555555555555,"shopping");

--LOOKUP STARTUP ITEMS BASED ON TAGS USING INNER JOIN
SELECT *
FROM startup
INNER JOIN startupTostartTag on startup.startup_id = startupTostartTag.startup_id
WHERE tag_text in ("shopping", "dogs")
GROUP BY startup.startup_id
HAVING COUNT(*) = 2;

--LOOKUP VC ITEMS BASED ON TAGS USING INNER JOIN
SELECT *
FROM vc
INNER JOIN vcTovcTag on vc.vc_id = vcTovcTag.vc_id
WHERE tag_text in ("shopping", "dogs")
GROUP BY vc.vc_id
HAVING COUNT(*) = 2;
