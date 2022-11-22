import { generatePlayoffTable } from "./generateTable.js";

export async function getPlayoffStandings() {
    const currentPlayoffStandingsContainer = document.querySelector('#current-playoff-standings-container');
    const pastPlayoffStandingsContainer = document.querySelector('#past-playoff-standings-container');
    const main = document.querySelector('#main');

    try {

        const response = await fetch('archive.json');
        const data = await response.json();

        // remove hidden class when finished loading
        main.classList.remove('is-hidden');

        //sections from the json file to work with
        const currentOwners = data.current.currentOwners;
        const pastOwners = data.past.pastOwners;

        
        currentOwners.forEach(owner => {
            let winPercentage = owner.playoffWins / (owner.playoffWins + owner.playoffLoses);
            let finalWinPercentage = isNaN(winPercentage) ? '.000' : winPercentage.toFixed(3).slice(1);
            owner.playoffWinPercentage = finalWinPercentage;
        })

        pastOwners.forEach(owner => {
            let winPercentage = owner.playoffWins / (owner.playoffWins + owner.playoffLoses);
            let finalWinPercentage = isNaN(winPercentage) ? '.000' : winPercentage.toFixed(3).slice(1);
            owner.playoffWinPercentage = finalWinPercentage;
        })

        //columns to sort by
        const winsColumnCurrent = document.querySelector('#wins-column-current');
        const losesColumnCurrent = document.querySelector('#loses-column-current');
        const percentColumnCurrent = document.querySelector('#percent-column-current');
        const winsColumnPast = document.querySelector('#wins-column-past');
        const losesColumnPast = document.querySelector('#loses-column-past');
        const percentColumnPast = document.querySelector('#percent-column-past');

    
        //sort list of owners by wins on page load
        currentOwners.sort((a, b) => b.playoffWins - a.playoffWins);
        pastOwners.sort((a, b) => b.playoffWins - a.playoffWins);
        currentPlayoffStandingsContainer.innerHTML = generatePlayoffTable(currentOwners);
        pastPlayoffStandingsContainer.innerHTML = generatePlayoffTable(pastOwners);

        //sort by wins if win column is clicked on current teams
        winsColumnCurrent.addEventListener('click', () => {
            currentOwners.sort((a, b) => b.playoffWins - a.playoffWins);
            currentPlayoffStandingsContainer.innerHTML = generatePlayoffTable(currentOwners);
        });

        //sort by loses if loses column is clicked on current teams
        losesColumnCurrent.addEventListener('click', () => {
            currentOwners.sort((a, b) => b.playoffLoses - a.playoffLoses);
            currentPlayoffStandingsContainer.innerHTML = generatePlayoffTable(currentOwners);
        });

        // sort by win percentage is clicked current teams
        percentColumnCurrent.addEventListener('click', () => {
            currentOwners.sort((a, b) => b.playoffWinPercentage - a.playoffWinPercentage);
            currentPlayoffStandingsContainer.innerHTML = generatePlayoffTable(currentOwners);
        })

        //sort by wins if win column is clicked on past teams
        winsColumnPast.addEventListener('click', () => {
            pastOwners.sort((a, b) => b.playoffWins - a.playoffWins);
            pastPlayoffStandingsContainer.innerHTML = generatePlayoffTable(pastOwners);
        });

        //sort by loses if loses column is clicked on past teams
        losesColumnPast.addEventListener('click', () => {
            pastOwners.sort((a, b) => b.playoffLoses - a.playoffLoses);
            pastPlayoffStandingsContainer.innerHTML = generatePlayoffTable(pastOwners);
        });

        // sort by win percentage is clicked past teams
        percentColumnPast.addEventListener('click', () => {
            pastOwners.sort((a, b) => b.playoffWinPercentage - a.playoffWinPercentage);
            pastPlayoffStandingsContainer.innerHTML = generatePlayoffTable(pastOwners);
        })

    } catch (error) {
        console.log("No Information", error)
    }

}
