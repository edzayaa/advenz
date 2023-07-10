const ScrollScene = document.querySelector("#w-embed");
const videoScroller = ScrollScene.querySelector(".plyr_video");
const textAnim = ScrollScene.querySelector('.center');
const btnAnim = ScrollScene.querySelector('.spacer');
/*const btnAnim = document.querySelector('.spacer');
const VidbtnAnim = btnAnim.querySelector('.start');*/
/*   
const ScrollBtn = ScrollScene.querySelector("ring_Content");
const btn = document.querySelector(".btnCont");
*/

//  Animacion1
//const SectionText = document.querySelector("#introtext");
//const text = SectionText.querySelector(".paragraph_hero");

//SCROLLMAGIC
const controller = new ScrollMagic.Controller();

//Scenes
let scene = new ScrollMagic.Scene({
  duration: 27300,
  triggerElement: ScrollScene,
  triggerHook: 0
})
  .setPin(ScrollScene)
  .addTo(controller);

//Text Animation

const text = TweenMax.fromTo(textAnim, 3, {opacity: 1},  { opacity:0, ease: Power1.easeOut});

  let scene1 = new ScrollMagic.Scene({
  duration: 25800,
  triggerElement: ScrollScene,
  triggerHook: 0
})
  //.addIndicators()
  .setTween(text)
  .addTo(controller);

//Text Animation

const BTN = TweenMax.fromTo(btnAnim, 3, {opacity: 0},  { opacity:1, ease: Power1.easeOut});

  let scene2 = new ScrollMagic.Scene({
  duration: 26000,
  triggerElement: ScrollScene,
  triggerHook: 0
})
  //.addIndicators()
  .setTween(BTN)
  //.setPin(BTN)
  .addTo(controller);

//Video Animation
let accelamount = 0.1;
let scrollpos = 0;
let delay = 0;

scene.on("update", e => {
  scrollpos = e.scrollPos / 1000;
  console.log(e.scrollPos/ 1000)
});

setInterval(() => {
  delay += (scrollpos - delay) * accelamount;

  videoScroller.currentTime = delay;
}, 41.66);