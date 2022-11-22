import { getRegularStandings } from "./getRegularStandings.js"
import { getPlayoffStandings } from "./getPlayoffStandings.js"
import { displayMainSummary } from "./displayMainSummary.js"
import { tradeHistory } from "./tradeHistory.js"
import { navSlide, navHTML } from "./nav.js"
import { headerHTML } from "./header.js"
import { champsHTML } from './champsHTML.js'

const currentPage = window.location.pathname;

if (currentPage === '/index.html') {
    displayMainSummary();
} else if (currentPage === '/current-standings.html') {
    getRegularStandings();
} else if (currentPage === '/playoff-standings.html') {
    getPlayoffStandings();
} else if (currentPage === '/trades.html') {
    tradeHistory();
} else if (currentPage === '/champs.html') {
    champsHTML();
} else {
    displayMainSummary();
}

document.querySelector('header').innerHTML = headerHTML();

document.querySelector('nav').innerHTML = navHTML();
navSlide();