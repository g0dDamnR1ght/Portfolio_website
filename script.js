// sticky header

var header = document.querySelector('header');
var home = document.getElementById('home');
var homeHeight = home.offsetHeight;
var aboutTop = document.querySelector('#about').offsetTop;
var skillsTop = document.querySelector('.skills').offsetTop;
var serviceTop = document.querySelector('#service').offsetTop;
var portfolioTop = document.querySelector('#portfolio').offsetTop;
var statsTop = document.querySelector('.stats').offsetTop;
var contactTop = document.querySelector('#contact').offsetTop;
var menulinks = document.querySelectorAll('nav a');
var progressbars = document.querySelectorAll('.progress');
var counter = document.querySelectorAll('.cont');
var texts = document.querySelectorAll('.typewriter');
var arrow = document.querySelector('#totop');
var progressAnimated = false;
var statsAnimated = false; 


window.onscroll = function(){
	var scrollTop = document.documentElement.scrollTop || document.scrollingElement.scrollTop;
	if(scrollTop >= homeHeight){
		header.classList.add('sticky');
		arrow.style.display = 'block';
	}
	else {
		header.classList.remove('sticky');
		arrow.style.display = 'none';
	}
	onScroll(scrollTop);
}

function onScroll(top){
	// sets active class to menu links and turns animations in section on
	
	if(top >0 && top <= homeHeight){
		changeLink('home');
	}
	else if(top > aboutTop && top < skillsTop){
		changeLink('about');
	}
	if(top > skillsTop - 250 && top < serviceTop && !progressAnimated){	
		progressAnimated = true;	
		for(var i = 0; i < progressbars.length; i++){
			countProgress(progressbars[i]);
		}
	}
	else if(top > serviceTop && top < portfolioTop){
		changeLink('service');
	}
	else if(top > portfolioTop && top < statsTop){
		changeLink('portfolio');
	}
	if(top > statsTop - 300 && top < contactTop && !statsAnimated){
		statsAnimated = true;
		// statsAnimated = !statsAnimated; вот здесь такая запись не сработает, так как будет переключаться false-true-false...
		for(var i = 0; i < counter.length; i++){
			countStats(counter[i]);
			typewrite(texts[i]);
		}
	}
	else if(top > contactTop) {
		changeLink('contact');
	}
}

function changeLink(name){
	for(var i = 0; i < menulinks.length; i++){
		if(menulinks[i].getAttribute('href') == '#' + name){
			menulinks[i].classList.add('active');
		}
		else {
			menulinks[i].classList.remove('active');
		}
	}
}

// smooth scroll

document.addEventListener('click', function(event){
	if(event.target.classList.contains('scroll')){
		event.preventDefault();
		var target = event.target.getAttribute('href');
		var targetPosition =  document.querySelector(target).offsetTop;
		window.scrollTo({
			top: targetPosition,
			left: 0,
			behavior: 'smooth'
		});
	}
});


// show arrow to top 

// progressbars

function countProgress(elem){
	var max = +elem.getAttribute('data-value');
	var currentProgress = 0;
	var delta = max/60; // 30 - fps

	var interval = setInterval(function(){
		if(currentProgress < max){
			currentProgress += delta;
			elem.style.width = currentProgress + '%';
		}
		else {
			clearInterval(interval);
		}
	}, 10);
}

// counters

function countStats(statElem){
	var num = Number(statElem.getAttribute('data-count'));
	var currentNum = 0;

	var intervalId = setInterval(function(){
		if(currentNum < num){
			currentNum++;
			statElem.innerText = currentNum;
		}
		else{
			clearInterval(intervalId);
		}
	}, 2000/num);
}


//typewriter


function typewrite(textEl){
	var chars = textEl.getAttribute('data-text').split('');
	var charNumber = 0;

	var timer = setInterval(function(){
		if(charNumber < chars.length){
			textEl.textContent += chars[charNumber];
			charNumber++
		}
		else {
			clearInterval(timer);
		}
	},100);

}

// load more

var loadCount = 6;
var loadedAlready = 6;
var portfolioWorks = document.querySelectorAll('.portfolio-item');
var loadbtn = document.querySelector('.more-button');

loadbtn.onclick = function(){
	for(var j = 0; j < loadCount; j++){
		if(j+loadedAlready < portfolioWorks.length){
			portfolioWorks[j+loadedAlready].style.display = 'block';
		}	
	}
	loadedAlready +=j;
	if(loadedAlready >= portfolioWorks.length){
		loadbtn.style.display = 'none';
	}
}

// loader
var loader = document.getElementById('loader');
document.addEventListener('DOMContentLoaded', function(){
	loader.style.display = 'none';
});


// form validation

var form = document.querySelector('#contact form');
var textarea = document.querySelector('textarea');
var nameInp = document.querySelector('#username');
var mailInp = document.querySelector('#e-mail-address');
var submitBtn = document.querySelector('form .btn');

var minName = 2; // name length
var minMsg = 120; // maeesage length
var emailPattern = '/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/';

form.onsubmit = function(event){
	event.preventDefault();
	validateForm();
}

form.onkeyup = function(){
	textarea.classList.remove('invalid');
	nameInp.classList.remove('invalid');
	mailInp.classList.remove('invalid');
}

submitBtn.onclick = function(event){
	event.preventDefault();
	validateForm();
}


function validateForm(){
	if(textarea.value.length < minMsg){
		textarea.classList.add('invalid');
	}
	if(nameInp.value.length < minName){
		nameInp.classList.add('invalid');
	}
	if(mailInp.value == '' || !mailInp.value.match(emailPattern)){
		mailInp.classList.add('invalid');
	}
}



