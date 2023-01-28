export async function displayMainSummary() {
    const response = await fetch('archive.json');
    const data = await response.json();
    const index = document.querySelector('#index');
    const currentTeams = data.current.currentOwners;


    //FIND CURRENT CHAMP
    let champs = [];
    let currentChamp = '';
    const date = new Date;
    const currentYear = date.getFullYear() - 1;
    let year = '';
    let championships = '';


    currentTeams.forEach(team => {
      if(team.championships.length != 0 ) {
        champs.push(team)
      }
    });

    champs.forEach(champ => {
      champ.championships.forEach(year => {
        if(year === currentYear) {
          currentChamp = champ
        }
      })
    });

    currentChamp.championships.length === 1 ? year = 'Year' : year = 'Years'
    currentChamp.championships.length === 1 ? championships = 'Championship' : championships = 'Championships'

    index.innerHTML = `<article class="card container card-bottom-margin" id="league-summary">
                        <h2 class="subtitle card-padding">League Overview</h2>
                        <p class="card-text card-padding">${data.summary.mainSummary3}</p>
                        <p class="card-text card-padding">${data.summary.mainSummary4}, <span class="bold">${currentChamp.teamName}</span>!</p>


                      </article>
                      
                      <div class="card championship container">
                      <h3 class="subtitle card-padding card-bottom-margin">${currentChamp.teamName}</h3>
                      <div class="championship-text-container">
                        <p class="championship-number">${currentChamp.championships.length}</p>
                        <p class="championship-text">${championships}</p>
                        <p class="championship-number">${currentChamp.championships.join(', ')}</p>
                        <p class="championship-text">${year}</p>
                        <p class="championship-number">${currentChamp.wins} - ${currentChamp.loses}</p>
                        <p class="championship-text">All-Time Regular Season Record</p>
                        <p class="championship-number">${currentChamp.playoffWins} - ${currentChamp.playoffLoses}</p>
                        <p class="championship-text">All-Time Playoff Record</p>
                        
                      </div>
                      <div class="championship-image">
                        <img src="${currentChamp.logo}" alt=${currentChamp.teamName} class="img card-padding" />
                      </div>
                    </div>
                      
                      
                      
                      `




}