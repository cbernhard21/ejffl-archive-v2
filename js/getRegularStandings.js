import { generateTable } from "./generateTable.js";

export async function getRegularStandings() {
    try {
        
        const currentStandingsContainer = document.querySelector('#current-standings-container');
        const pastStandingsContainer = document.querySelector('#past-standings-container');
        const main = document.querySelector('#main');
        const response = await fetch('archive.json');
        const data = await response.json();

        // remove hidden class when finished loading
        main.classList.remove('is-hidden');

        //sections from the json file to work with
        const currentOwners = data.current.currentOwners;
        const pastOwners = data.past.pastOwners;

        currentOwners.forEach(owner => {
            let winPercentage = owner.wins / (owner.wins + owner.loses);
            let finalWinPercentage = isNaN(winPercentage) ? '.000' : winPercentage.toFixed(3).slice(1);
            owner.winPercentage = finalWinPercentage;
        })

        pastOwners.forEach(owner => {
            let winPercentage = owner.wins / (owner.wins + owner.loses);
            let finalWinPercentage = isNaN(winPercentage) ? '.000' : winPercentage.toFixed(3).slice(1);
            owner.winPercentage = finalWinPercentage;
        })

        //columns to sort by
        const winsColumnCurrent = document.querySelector('#wins-column-current');
        const losesColumnCurrent = document.querySelector('#loses-column-current');
        const percentColumnCurrent = document.querySelector('#percent-column-current');
        const winsColumnPast = document.querySelector('#wins-column-past');
        const losesColumnPast = document.querySelector('#loses-column-past');
        const percentColumnPast = document.querySelector('#percent-column-past');

        //sort list of owners by wins on page load
        currentOwners.sort((a, b) => b.wins - a.wins);
        pastOwners.sort((a, b) => b.wins - a.wins);
        currentStandingsContainer.innerHTML = generateTable(currentOwners);
        pastStandingsContainer.innerHTML = generateTable(pastOwners);

        //sort by wins if win column is clicked on current teams
        winsColumnCurrent.addEventListener('click', () => {
            currentOwners.sort((a, b) => b.wins - a.wins);
            pastOwners.sort((a, b) => b.wins - a.wins);
            currentStandingsContainer.innerHTML = generateTable(currentOwners);

        });

        //sort by loses if loses column is clicked on current teams
        losesColumnCurrent.addEventListener('click', () => {
            currentOwners.sort((a, b) => b.loses - a.loses);
            currentStandingsContainer.innerHTML = generateTable(currentOwners);
        });

        percentColumnCurrent.addEventListener('click', () => {
            currentOwners.sort((a, b) => b.winPercentage - a.winPercentage);
            currentStandingsContainer.innerHTML = generateTable(currentOwners);
        })

        //sort by wins if win column is clicked on past teams
        winsColumnPast.addEventListener('click', () => {
            pastOwners.sort((a, b) => b.wins - a.wins);
            pastStandingsContainer.innerHTML = generateTable(pastOwners);
        });

        //sort by loses if loses column is clicked on past teams
        losesColumnPast.addEventListener('click', () => {
            pastOwners.sort((a, b) => b.loses - a.loses);
            pastStandingsContainer.innerHTML = generateTable(pastOwners);
        });

        percentColumnPast.addEventListener('click', () => {
            pastOwners.sort((a, b) => b.winPercentage - a.winPercentage);
            pastStandingsContainer.innerHTML = generateTable(pastOwners);
        })

    } catch (error) {
        console.log("No Information", error)
    }

}