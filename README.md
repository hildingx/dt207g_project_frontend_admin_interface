# Administrationssystem för Restaurang

## Av Alexander Hilding

Syftet med denna webbapplikation är att hantera administrering av en restaurangs meny och bokningar, samt att säkerställa att endast behörig personal har åtkomst till dessa funktioner. Användare kan logga in med ett administratörskonto, och applikationen använder JSON Web Tokens (JWT) för att autentisera användaren och get åtkomst till applikationens funktioner.

Vid inloggning kontrolleras användarens uppgifter mot lagrade data i backend-databasen. Om inloggningen lyckas, utfärdas en JWT som sparas i webbläsarens localStorage. Denna token används för att ge åtkomst till skyddade sidor och resurser. Om en användare försöker nå en skyddad sida utan en giltig token, omdirigeras de till inloggningssidan.

Efter inloggning kan användaren navigera mellan olika sektioner av applikationen via en meny. På menysidan kan användaren skapa, visa, redigera och radera menyobjekt. Bokningshanteringen tillåter användaren att visa och radera bokningar.

Frontend är byggd med HTML, SCSS och JavaScript, medan backend är hostad på Render och använder en MongoDB-databas hostad på MongoDB Atlas.

Webbapplikationen är publicerad och tillgänglig på https://rococo-creponne-287687.netlify.app/. Användare kan logga in med administratörskontot och börja hantera menyn och bokningarna direkt.