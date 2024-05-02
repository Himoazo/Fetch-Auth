# Registrera Arbetserfarenheter
Denna webbplats konsumerar REST webbtjänsten som finns i detta [repo](https://github.com/Himoazo/Auth).

#### Webbplatsen kräver inlogging för genomförandet av CRUD operations, med undantag för sign up POST request

Webbplatsen via **Fetch anrop** med olika **metoder** kan lagra data i webbtjänsten **(method: POST)**, kan radera en rad data **(method: DELETE)**, kan uppdatera en rad data **(method: PUT)** och läser all lagrade data i webbtjänstensdatabas och visar den på startsidan **(method: GET)**.

På ”lägg till erfarenhet” sida finns det ett formulär som man kan fylla i för att skicka uppgifter om en viss arbetserfarenhet i webbtjänsten. Lämnar man slutdatumet tomt då anser applikationen att tjänsten är fortfarande pågående. 
På startsidan som redan nämnt visas alla lagrade arbetserfarenheter med möjligheten till att radera och redigera.


Den publiserade webbplatsen finns [här](https://fetch-auth.netlify.app/).