angular.module('gettext').run(['gettextCatalog', function (gettextCatalog) {
/* jshint -W100 */
    gettextCatalog.setStrings('de', {"Home":"Startseite","Login":"Anmelden","Login not possible":"Anmeldung nicht Möglich","Logout":"Abmelden","Mail":"E-Mail","Password":"Passwort","Test":"Test","sign up":"registrieren"});
/* jshint +W100 */
}]);