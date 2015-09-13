'use strict';

angular.module('ghAngularApp').factory('Sponsor', function ($http) {

    var currentSponsor = null;

    function Login(credentials)
    {
        return $http.post('sponsors/login', credentials);
    }

    function ClearCurrentSponsor() {
        currentSponsor = null;
    }

    function StoreCurrentSponsor(sponsor) {
        currentSponsor = sponsor;
    }

    function GetCurrentSponsor() {
        return currentSponsor;
    }

    return {
        Login: Login,
        StoreCurrentSponsor: StoreCurrentSponsor,
        GetCurrentSponsor: GetCurrentSponsor,
        ClearCurrentSponsor: ClearCurrentSponsor
    };
});
