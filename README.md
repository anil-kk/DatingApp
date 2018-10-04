# DatingApp

## Useful VS STudio Extensions for Developer Productivity

c# powered by Omnisharp

C# Extensions by jchannon

Nuget Package Manager by jmrog

angular v6 snippets by John pappa

Angular Files by Alexander Ivanichev

Angular Language Service by Angular

angular2-switcher by infinity1207

Auto rename tag by JunHan v0.0.15

Bracket Pair Colorizer by CoenraadS

Debugger for Chrome by Microsoft

Material Icon Theme by Philipp Kief

Path Intellisense by Christian Kohler

Prettier - Code formatter by Esben Petersen

TSLint by egamma

# Useful commands

## Angular
ng serve

ng g guard auth --spec=false

## AspDotNetCore

dotnet watch run

dotnet ef migrations add SomeEntityOrExtensionToAnEntity -> add migrations

dotnet ef database update -> apply migrations to database

dotnet ef migrations list  ->  list all migrations

dotnet ef migrations remove -> removes last migration that is not applied to database

dotnet ef database drop  -> !WARNING! all data will be lost, but in case you want to update complicated schema

dotnet ef database update -> apply migrations to database

# C# Visual Studio Code

prop TAB
ctor TAB

CTRL +  .  -> Quick Fix
SHIFT + ALT + F -> Format Document
CTRL + , -> Settings
ALT + O -> Toggle CSS file of component
ALT + U -> Toggle .ts file of component
ALT + I -> Toggle HTML file of component
ALT + P -> Toggle specs file of component

# Seed Data

https://www.json-generator.com/#

# Sample appsettings.json config required for this app, secret info ignored on git repository
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


