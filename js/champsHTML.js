export const champsHTML = async() => {
    //get data from JSON file
    const response = await fetch('archive.json');
    const data = await response.json();

    //combine all owners into one array
    const allOwners = data.current.currentOwners.concat(data.past.pastOwners);

    //filter so only the champs are in the array
    const champs = allOwners.filter(owner => owner.championships.length > 0)

    //sort champ array with most championships first
    champs.sort((a, b) => b.championships.length - a.championships.length);

    const champsCardHtml = champs.map(champ => {
        let year = '';
        let championships = '';
        champ.championships.length === 1 ? year = 'Year' : year = 'Years'
        champ.championships.length === 1 ? championships = 'Championship' : championships = 'Championships'

        return `<div class="card championship">
                    <h3 class="subtitle card-padding card-bottom-margin">${champ.teamName}</h3>
                    <div class="championship-text-container">
                        <p class="championship-number">${champ.championships.length}</p>
                        <p class="championship-text">${championships}</p>
                        <p class="championship-number">${champ.championships.join(', ')}</p>
                        <p class="championship-text">${year}</p>
                    </div>
                    <div class="championship-image">
                        <img src="${champ.logo}" alt=${champ.teamName} class="img card-padding" />
                    </div>
                </div>`

    }).join('');

    const index = document.querySelector('#index');
    index.innerHTML = `<article class="card container card-bottom-margin">
                            <h2 class="subtitle card-padding card-bottom-margin">League Champions</h2>
                            <div class="fluid-grid-container">${champsCardHtml}</div>
                       </article>`


}