export const navSlide = () => {
    const burger = document.querySelector('.burger-menu');
    const nav = document.querySelector('nav');

    burger.addEventListener('click', () => {
        //animate nav on screen
        nav.classList.toggle('nav-active');

        //animate burger bars
        burger.classList.toggle('burger-move');

    });

}

export const navHTML = () => {
    return `<h2 class="subtitle card-padding">League Archive</h2>
                <ul class="nav-list">
                    <li class="nav-item" id="home"><a href="index.html">Home</a></li>
                    <li class="nav-item" id="current"><a href="current-standings.html">Regular Season Standings</a></li>
                    <li class="nav-item" id="playoff"><a href="playoff-standings.html">Playoff Standings</a></li>
                    <li class="nav-item" id="champs"><a href="champs.html">Champions</a></li>
                    <li class="nav-item" id="trades"><a href="trades.html">Trade History</a></li>
                </ul>`
}