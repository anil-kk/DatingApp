# DatingApp

## Useful VS STudio Extensions for Developer Productivity

- C# powered by Omnisharp
- C# Extensions by jchannon
- Nuget Package Manager by jmrog
- angular v6 snippets by John pappa
- Angular Files by Alexander Ivanichev
- Angular Language Service by Angular
- angular2-switcher by infinity1207
- Auto rename tag by JunHan v0.0.15
- Bracket Pair Colorizer by CoenraadS
- Debugger for Chrome by Microsoft
- Material Icon Theme by Philipp Kief
- Path Intellisense by Christian Kohler
- Prettier - Code formatter by Esben Petersen
- TSLint by egamma
- Deploy by Marcel J K v14.0.0

# Useful commands

## Angular
```
ng serve -o

ng g guard auth --spec=false

ng build

ng build --prod
```
## AspDotNetCore
```
dotnet watch run

dotnet ef migrations add SomeEntityOrExtensionToAnEntity -> add migrations

dotnet ef database update -> apply migrations to database

dotnet ef migrations list  ->  list all migrations

dotnet ef migrations remove -> removes last migration that is not applied to database

dotnet ef database drop  -> !WARNING! all data will be lost, but in case you want to update complicated schema

dotnet ef database update -> apply migrations to database

dotnet publish -o PATH
```
# C# Visual Studio Code

```
prop TAB
ctor TAB

CTRL +  .  -> Quick Fix
SHIFT + ALT + F -> Format Document
CTRL + , -> Settings
ALT + O -> Toggle CSS file of component
ALT + U -> Toggle .ts file of component
ALT + I -> Toggle HTML file of component
ALT + P -> Toggle specs file of component
```
# Seed Data

https://www.json-generator.com/#

# Sample appsettings.json config required for this app, secret info ignored on git repository
```json
{
  "AppSettings":{
    "Token": "xxxxxx-xxxxxx-xxxxxx" 
  },
  "ConnectionStrings":{
    "DefaultConnection":"xxxxxx-xxxxxx-xxxxxx"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Warning"
    }
  },
  "AllowedHosts": "*",
  "CloudinarySettings": {
    "CloudName": "xxxxxx-xxxxxx-xxxxxx",
    "ApiKey":"xxxxxx-xxxxxx-xxxxxx" ,
    "ApiSecret": "xxxxxx-xxxxxx-xxxxxx"
  }
}
```

# MySql
```
mysql -u USERNAME -p

show databases;
use DATABASE_NAME;
select * from TABLE_NAME;
- SELECT User,Host FROM mysql.user;
- DROP USER 'appuser'@'localhost';

```

# multiple environments in ASP.NET Core

https://docs.microsoft.com/en-us/aspnet/core/fundamentals/environments?view=aspnetcore-2.1

## Command Prompt

set ASPNETCORE_ENVIRONMENT=Development

set ASPNETCORE_ENVIRONMENT=Production

## PowerShell

$Env:ASPNETCORE_ENVIRONMENT = "Development"
$Env:ASPNETCORE_ENVIRONMENT = "Production"


# Publishing

## Internet Information Services (IIS) Manager
- Under connections - > Open COMPUTER_XXXXX\USER - > Sites
- Right click on Sites and select Add Website
- Give a name XXXX to site and select physical path to published files
- give hostname XXXX.com
- go to hostfile and configure above hostname C:\Windows\System32\drivers\etc\hosts
- chnage security permissions to this 'hosts' file Right Click on hosts - > Properties - > Security Tab - > edit -> add - > add user COMPUTER_XXXXX\USER  -> Apply
- Same file -> Properties-> Security tab - > Advanced - > Chnage Owner - > COMPUTER_XXXXX\USER (checknames and ok) - > Apply
- same file - > properties -> security tab -> select previously added user COMPUTER_XXXXX\USER -> edit - > select previously added user COMPUTER_XXXXX\USER - > edit permissions, tick mark Allow full control -> Apply

- Edit hosts file - > and add below text and save

```127.0.0.1       XXXX.com```	

- to test config ping XXXX.com from command prompt

- IIS Manager - > Application Pools -> XXXX -> .net CLRVersion (default v4.0) -> Change to No Managed Code 
- run command  from project folder dotnet publish -o PHYSICAL_PATH_CONFIGURED_IN_ISS
- check if database server exist and required database and tables exist 
- Open command prompt as ADMINISTRATOR and run command   iisreset
- Install and Download AspDotNetCore RUNTIME and runn the iisreset command from command prompt

# Ubuntu
- sudo -i -> root user
- mysql_secure_installation -> to secure DB run this command for MariaDB(mysql) 
- cat SOME_FILE - > Outputs content

- mysql -u root -p   -> login mysql(MariaDB)
- CREATE USER 'USERNAMEEEEE'@'localhost' IDENTIFIED BY 'PASSWORD';
- GRANT ALL PRIVILEGES ON *.* TO 'USERNAMEEEEE'@'localhost' WITH GRANT OPTION;
- FLUSH PRIVILEGES;

- BASH export ASPNETCORE_ENVIRONMENT=Production
- dotnet ef migrations script -o mysql.sql
- mysql -u root -p 
- create database datingapp;
- use datingapp;
- source /home/USER/mysql.sql  - > will runn sql script generated from entity framework
- chown -R USER FILE_OR_FOLDER_NAME









Note: This application is the result of coursework from Udemy by Neil Cummings  
