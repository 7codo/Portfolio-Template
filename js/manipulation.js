/**Start API 
 * Update Portfolio galory
 * From Github Profile*/

//Select works done galory container
let worksDoneContainer = document.querySelector('.worksdone__galory');

const myUsernamehub = 'R7CAyoub';

//Start github repo fetching
fetch(`https://api.github.com/users/${myUsernamehub}/repos`).then(
    resolve => resolve.json()
    ).then(
        repositories => {
            let index = 1;
            repositories.forEach(rep => {
               
                //Create figure element and give him a class name
                let worksDoneFigure = document.createElement('figure');
                worksDoneFigure.classList.add('worksdone__figure');

                //Create link element and set his attribute
                let repoLinkEle = document.createElement('a');
                repoLinkEle.target = '_blank';

                //Create image element and set his attribute
                let repoImgEle = document.createElement('img');
                repoImgEle.src = `vendors/images/worksdone-galory${index}.png`;

                //Create Category span
                let categorySpan = document.createElement('span');
                categorySpan.classList.add('category');

                //Create figcaption element
                let workDoneFigcaption = document.createElement('figcaption');

                //Create title h2 repo element
                let repoTitleEle = document.createElement('h2');

                //Create description span element
                let repoDescripEle = document.createElement('span');

                //Collect Information at Elements
                //Repo link
                repoLinkEle.href = `https://github.com/${myUsernamehub}/${rep.name}`;
                
                //Repo title
                repoTitleEle.innerHTML = rep.name;

                //Repo descriptio
                repoDescripEle.innerHTML = rep.description.slice(rep.description.split(' ', 1)[0].length, rep.description.length);

                //Repo Category
                categorySpan.innerHTML = rep.description.split(' ', 1);

                //Set childs
                workDoneFigcaption.appendChild(repoTitleEle);
                workDoneFigcaption.appendChild(repoDescripEle);

                repoLinkEle.appendChild(categorySpan);
                repoLinkEle.appendChild(repoImgEle);
                repoLinkEle.appendChild(workDoneFigcaption);
                
                worksDoneFigure.appendChild(repoLinkEle);

                worksDoneContainer.appendChild(worksDoneFigure);
                index++;
            });
        }
    );


/**
 * Download Cv button action
 */


//Select download CV
let downCVBu = document.getElementById('js--dowcvbu');
let downCVBu_about = document.getElementById('js--dowcvbu_about');

//create overlay div element
let overlayDiv = document.createElement('div');
//Give it a class name overlay
overlayDiv.classList.add('overlay');

//create documentpdf div
let cvContainerEle = document.createElement('div');
cvContainerEle.classList.add('cvContainer');

//create close icon div
let closePopup = document.createElement('div');
closePopup.innerHTML = '<i class="fas fa-times-circle"></i>';
closePopup.classList.add('closeIcon');

//create document pdf preview & make his properties
let cvPdfPreview = document.createElement('embed');
cvPdfPreview.type = 'application/pdf';
cvPdfPreview.src = 'documents/frontend.pdf';
cvPdfPreview.width = '100%';
cvPdfPreview.height = '93%';

//create download button 
let downloadBu = document.createElement('a');
downloadBu.classList.add('button');
downloadBu.classList.add('default__button');
downloadBu.classList.add('download__button');
downloadBu.innerHTML = 'Download CV Document';

//when click download cv button
downloadBu.href = "documents/frontend.pdf"
downloadBu.target = "_blank"

//Add what child to parent
cvContainerEle.appendChild(closePopup);
cvContainerEle.appendChild(cvPdfPreview);
cvContainerEle.appendChild(downloadBu);
overlayDiv.appendChild(cvContainerEle);

 /*Make overlay division 
 *inside body when 
 *the user clicke in download cv buttons*/
 
 downCVBu.onclick = () => document.body.appendChild(overlayDiv);

 downCVBu_about.onclick = () => document.body.appendChild(overlayDiv);
 
 //Start Close Action
 closePopup.onclick = () => document.body.removeChild(overlayDiv);


/**
 * Works I have done
 * switch between category tabs
 */

 //Select Works Done Category All Tabs
let categoryTabs = document.querySelectorAll(".worksdone__categorynav li");
//Select navbar category names
let categoryNav = document.querySelector(".worksdone__categorynav");

let eCSpan = document.createElement("span");
let eCText = document.createTextNode("Step by Step We build in projects.");
eCSpan.appendChild(eCText);

categoryTabs.forEach(categoryTab => {
    
    categoryTab.onclick = (event) => {
        //Is the items empty in category mean display none
        let isEmptyCategory = false;

        let tabeName = categoryTab.childNodes[0].nodeValue;
        
        let insideWorksDone = document.querySelectorAll('.worksdone__figure');
        activeTab(tabeName);
        if (tabeName == "Front-End"){
            
            insideWorksDone.forEach(workdn => {
                let categoryName = workdn.firstElementChild.firstElementChild.childNodes[0].nodeValue;
                console.log(categoryName);
                if(categoryName != "Front-End"){
                    workdn.classList.add("backend-dsplnn");
                    workdn.classList.add("fullstack-dsplnn");
                    workdn.classList.remove('fullstack-dsplblck');
                    workdn.classList.remove('backend-dsplblck');
                }else {
                    workdn.classList.remove('frontend-dsplnn');
                    workdn.classList.add('frontend-dsplblck');
                }
            });
        }else if (tabeName == "Back-End"){
            
            insideWorksDone.forEach(workdn => {
                console.log(workdn);
                let categoryName = workdn.firstElementChild.firstElementChild.childNodes[0].nodeValue;
                console.log(categoryName);
                if(categoryName != "Back-End"){
                    workdn.classList.add("frontend-dsplnn");
                    workdn.classList.add("fullstack-dsplnn");
                    workdn.classList.remove("fullstack-dsplblck");
                    workdn.classList.remove('frontend-dsplblck');
                }else {
                    workdn.classList.remove('backend-dsplnn');
                    workdn.classList.add('backend-dsplblck');
                }
            });
        }else if (tabeName == "All") {
            insideWorksDone.forEach(workdn => {
                //Display all block and remove none
                workdn.classList = "worksdone__figure";
            });
        }

        insideWorksDone.forEach(workdn => {
            if(workdn.className.search("blck") < 0) {
                isEmptyCategory = true;
            }else {
                isEmptyCategory = false;
            }
        });
        
        if (tabeName != "All" && isEmptyCategory == true){
            worksDoneContainer.appendChild(eCSpan);
        }else {
            if (eCSpan.parentElement != null){
                worksDoneContainer.removeChild(eCSpan);
            }
        }

    }
});



function activeTab(tabThatIsActive){
    categoryTabs.forEach(categoryTab => {
        let tabName = categoryTab.childNodes[0].nodeValue;
        if (tabName == tabThatIsActive){
            categoryTab.classList.add("isActive");
        }else {
            categoryTab.classList.remove("isActive");
        }
    });
}

/**
 * Send Message
 */

 let sendMsgBu = document.getElementById("send_msg");
 sendMsgBu.onclick = () => {
     window.open("mailto:ayoubch34@gmail.com")
 }

 /**
  * Open close navigation list mini
  */

  //Select list icon
 let listAcIcon = document.querySelector(".list-open");
 // Select nav list mini
 let navMiniList = document.querySelector(".navigation-list-mini")
 
 let isOpen = false;
 listAcIcon.onclick = function () {
     
     if(isOpen){
        isOpen = false;
        listAcIcon.innerHTML = `<i class="fas fa-times"></i>`;
        navMiniList.classList.add("dspl-blk");
        navMiniList.classList.remove("dspl-nn");
     }else {
        isOpen = true;
        listAcIcon.innerHTML = `<i class="fas fa-bars"></i>`;
        navMiniList.classList.remove("dspl-blk");
        navMiniList.classList.add("dspl-nn");
     }
     
 }

/**
 * Add New Testimonial
 */

//Select testimonial section
let sliderButtons = document.querySelectorAll(".testimonial__slider span"),
    testimonialQuotes = document.querySelectorAll(".testimonial__quote");

//Display none testimobial quotes first & last
for (let i = 0; i < testimonialQuotes.length; i++){
    if(i != 1){
        testimonialQuotes[i].classList.add("dspl-nn");
        testimonialQuotes[i].classList.remove("dspl-blck");
    }
}

//Action when click slider buttons
for (let index = 0; index < sliderButtons.length; index++) {
    sliderButtons[index].onclick = () => {
        //Change slider button active
        for(let i = 0; i < sliderButtons.length; i++){
            if (index != i){
                sliderButtons[i].classList.remove("slider_active");
            }else {
                sliderButtons[i].classList.add("slider_active");
            }
        }

        //Select testimonial tab by slider button index selected
        for (let i = 0; i < testimonialQuotes.length; i++){
            if(index != i){
                testimonialQuotes[i].classList.add("dspl-nn");
                testimonialQuotes[i].classList.remove("dspl-blck");
            }else {
                testimonialQuotes[i].classList.remove("dspl-nn");
                testimonialQuotes[i].classList.add("dspl-blck");
            }
        }

        
    }
}