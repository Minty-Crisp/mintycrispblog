//Menu Footer Support JS
//by Minty Crisp @ MintyCrisp.com
//
var randomarticle = document.getElementById('randomarticle');
var randomquote = document.getElementById('randomquote');

var randomArticleAll = ['xr-making-genie-gold-idle-clicker-game-part1-aframe.html', 'xr-isometric-node-navigation-aframe.html', 'xr-asset-color-customization-aframe.html', 'xr-basic-hub-ui-themes-aframe.html', 'xr-thunderstorm-scene-teleportation-aframe.html', 'xr-animation-testing-playground-aframe.html', 'xr-orb-sky-changer-aframe.html', 'about-me.html'];
var randomQuoteAll = ['Anything worth doing, is worth doing poorly... because doing it poorly is better than not doing it at all. &ndash; Joachim DePosada', 'Everytime someone steps up and says who they are, the world becomes a better, more interesting place. &ndash; Raymond Holt', 'He too concludes that all is well. This universe henceforth without a master seems to him neither sterile nor futile. Each atom of that stone, each mineral flake of that night filled mountain, in itself forms a world. The struggle itself toward the heights is enough to fill a man&apos;s heart &ndash; Sisyphus', 'Learn from everyone. Follow no one. Watch for patterns. Work like hell. &ndash; Scott McCloud', 'You are more than the sum of your worst mistakes. &ndash; Raubahn', 'Live your life, have no regrets, strive forward no matter the darkness. Even if everything has an end, that doesnt mean your life is meaningless &ndash; Hyedalyn', 'With a dream in your heart, your never alone &ndash; Dionne Warwick', 'We&apos;ll all be dead soon, might as well enjoy it while it lasts. &ndash; Us', 'The axe forgets what the tree remembers. &ndash; Ancient African Proverb', 'In Life as in Games, progress is the point. &ndash; The Flying Spaghetti Monster'];

var ranArt = Math.floor(Math.random()*randomArticleAll.length)
var ranQot = Math.floor(Math.random()*randomQuoteAll.length)

randomarticle.setAttribute('href', randomArticleAll[ranArt]);
randomquote.innerHTML = randomQuoteAll[ranQot];