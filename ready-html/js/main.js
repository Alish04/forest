import {gsap} from "../../libs/gsap/gsap.min";
import {ScrollTrigger} from "../../libs/gsap/ScrollTrigger.min";
import {ScrollSmoother} from "../../libs/gsap/ScrollSmoother.min";

window.addEventListener('scroll', e => {
    document.documentElement.style.setProperty('--scrollTop', `${this.scrollY}px`) // Update method
})
gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
ScrollSmoother.create({
    wrapper: '.wrapper',
    content: '.content'
})