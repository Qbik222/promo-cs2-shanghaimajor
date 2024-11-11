document.addEventListener("DOMContentLoaded", ()=>{
    const stageTabs = document.querySelectorAll(".predict__tabs-item"),
          stageWraps = document.querySelectorAll(".predict__stage"),
          loseCards = document.querySelectorAll(".predict__lose-card"),
          loseCardsTeams = document.querySelectorAll(".predict__lose-team"),
          winCards = document.querySelectorAll(".predict__win-card"),
          winCardsTeams = document.querySelectorAll(".predict__win-team"),
          predictOverlay = document.querySelector(".predict__overlay"),
          predictPopups = predictOverlay.querySelectorAll(".predict__teams"),
          predictTeams = predictOverlay.querySelectorAll(".predict__teams-item"),
          predictBtns = document.querySelectorAll(".cards-btn"),
          predictList = document.querySelectorAll(".predict__list"),
          predictListItem = document.querySelectorAll(".predict__list-item")

    // console.log(predictBtns)

    let currentCard;
    // let setStatus;


    function setPopup(overlay, btns, popups,  btnWraps) {
        btns.forEach((btn, i) => {
            btn.addEventListener("click", (e) => {
                let predictBtns = document.querySelectorAll(".cards-btn"),
                    targetClick = true
                // console.log(predictBtns)
                predictBtns.forEach(predictBtn =>{
                    let storageData = e.target.parentElement.getAttribute("data-storage")
                    if(predictBtn === e.target && storageData !== null){
                        targetClick = false
                        e.target.parentElement.removeAttribute("data-storage")
                    }
                    return targetClick
                })
                if(targetClick){
                    let index;
                    btnWraps.forEach((wrap, i) =>{
                        if(btn.parentElement === wrap){
                            return index = i
                        }
                    })
                    showPopup(popups, overlay, index)
                    return currentCard = btn
                }
            });
        });
    }

    setPopup(predictOverlay, predictListItem, predictPopups, predictList)


    function showPopup(popups, overlay, index){
        popups.forEach(popup => popup.classList.remove("_active"));
        overlay.classList.add("_active");
        popups[index].classList.add("_active");
        document.body.style.overflow = "hidden"
        const closeBtn = popups[index].querySelector(".predict__teams-close");
        closeBtn.addEventListener("click", () => {
            overlay.classList.remove("_active");
            popups[index].classList.remove("_active");
            document.body.style.overflow = "auto"
        }, { once: true });
    }

    function setPopupWinLose(overlay, btns, popups, predictBtns) {
        btns.forEach((btn, index) => {
            btn.addEventListener("click", (e) => {
                let targetClick = true
                predictBtns.forEach(predictBtn =>{
                    if(predictBtn.classList === e.target.classList){
                        targetClick = false
                    }
                    return targetClick
                })
                if(targetClick){
                    showPopup(popups, overlay, index)
                    return currentCard = btn
                }
            });
        });
    }
    setPopupWinLose(predictOverlay, winCards, predictPopups, predictBtns)
    setPopupWinLose(predictOverlay, loseCards, predictPopups, predictBtns)



    function setTeam(teams, cardsText, overlay, popups, status) {
        if(status){
            let cards = [];
            cardsText.forEach(item => {
                cards.push(item.parentElement.classList[1]);
            });
            cards.forEach((card, i) => {
                let key = `selectedTeam-${card}-${status}`;
                if(localStorage.getItem(key)){
                    cardsText[i].innerHTML = `Команда <br> ${localStorage.getItem(key)}`;
                    cardsText[i].parentElement.parentElement.classList.remove("_select")
                    if(cardsText[i].innerText.trim() !== ''){
                        cardsText[i].parentElement.parentElement.classList.add("_select")
                        cardsText[i].parentElement.parentElement.setAttribute('data-storage', key)
                    }
                }

            });
            teams.forEach((team) => {
                team.addEventListener("click", (e) => {
                    // const teamParent = team.parentElement.parentElement;
                    const teamName = team.querySelector(".team-name").textContent;
                    cards.forEach((card, i) => {
                        if (currentCard === cardsText[i].parentElement) {
                            let key = `selectedTeam-${card}-${status}`;
                            currentCard.parentElement.classList.add("_select")
                            currentCard.parentElement.setAttribute('data-storage', key)
                            localStorage.setItem(key, `${teamName}`);
                            cardsText[i].innerHTML = `Команда <br> ${teamName}`;
                            overlay.classList.remove("_active");
                            popups.forEach(popup => popup.classList.remove("_active"));
                            document.body.style.overflow = "auto"
                        }
                    });
                });
            });
        }
        else{
            let cardsTextLists = []
            cardsText.forEach(item =>{
                return cardsTextLists.push(item)
            })
            cardsTextLists.forEach((list, listIndex) => {
                list.childNodes.forEach((item, i) =>{
                    let stage = list.getAttribute("data-stage"),
                        key = `selectedTeam-${stage}-card${++i}`,
                        teamTextBlock = item.querySelector(`.${item.classList[0]}-team`)
                    teams.forEach((team) => {
                        team.addEventListener("click", (e) => {
                            if(item === currentCard){
                                const teamName = team.querySelector(".team-name").textContent
                                currentCard.classList.add("_select")
                                currentCard.setAttribute('data-storage', key)
                                localStorage.setItem(key, `${teamName}`);
                                // console.log(item)
                                teamTextBlock.innerHTML = `Команда <br> ${teamName}`;
                                overlay.classList.remove("_active");
                                popups.forEach(popup => popup.classList.remove("_active"));
                                document.body.style.overflow = "auto"

                            }
                        });
                    });
                    if(localStorage.getItem(key)){
                        console.log("key")
                        teamTextBlock.innerHTML = `Команда <br> ${localStorage.getItem(key)}`;
                        teamTextBlock.parentElement.parentElement.classList.remove("_select")
                        if(teamTextBlock.innerText.trim() !== ''){
                            teamTextBlock.parentElement.classList.add("_select")
                            teamTextBlock.parentElement.setAttribute('data-storage', key)
                        }
                    }
                })


            });
        }

    }
    setTeam(predictTeams, winCardsTeams, predictOverlay, predictPopups, "win");
    setTeam(predictTeams, loseCardsTeams, predictOverlay, predictPopups, "lose");
    setTeam(predictTeams, predictList, predictOverlay, predictPopups, null);

    function removeTeam(removeBtns, listState){
        removeBtns.forEach(removeBtn =>{
            removeBtn.addEventListener("click", () =>{
                let btnParent =  removeBtn.parentElement.parentElement,
                    dataBtn = btnParent.getAttribute("data-storage")

                // console.log(dataBtn)
                if(!dataBtn){
                    btnParent = removeBtn.parentElement
                    dataBtn = btnParent.getAttribute("data-storage")
                }
                localStorage.removeItem(dataBtn)
                btnParent.classList.remove("_select")
            })

        })
    }

    // removeTeam(predictBtns)
    removeTeam(predictBtns)

    stageTabs.forEach((tab, tabIndex) =>{
        tab.addEventListener("click", (e) =>{
            stageTabs.forEach((tab, i) =>{
              tab.classList.remove("_active")
            })
            stageWraps.forEach((item, stageIndex) =>{
                item.classList.remove("_active")
                if(tabIndex === stageIndex){
                    item.classList.add("_active")
                    if(item.classList.contains("stage3")){
                        item.parentElement.classList.add('stage3')
                    }else{
                        item.parentElement.classList.remove('stage3')
                    }
                }
            })
            e.target.classList.add("_active")
        })
    })

// countdown timer
    function startCountdown(element) {
        const targetDate = new Date(element.getAttribute('data-target-date'))
        function updateCountdown() {
            const now = new Date(),
                  difference = targetDate - now
            if (difference <= 0) {
                element.querySelector('.predict__info-lock-countdown').textContent = "time over"
                clearInterval(countdownInterval)
                return
            }
            const days = Math.floor(difference / (1000 * 60 * 60 * 24)),
                  hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                  minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
            element.querySelector('.predict__info-lock-days').textContent = days
            element.querySelector('.predict__info-lock-hours').textContent = hours
            element.querySelector('.predict__info-lock-minutes').textContent = minutes
        }
        const countdownInterval = setInterval(updateCountdown, 60000)
        updateCountdown()
    }
    document.querySelectorAll('.predict__info-lock-countdown').forEach(startCountdown)

    // custom horizontal scroll
    const scrollBar = document.querySelector(".table__scrollbar"),
          scrollBarThumb = document.querySelector(".table__scrollbar-thumb"),
          scrollElem = document.querySelector('.table__wrap-scroll'),
          scrollContainer = document.querySelector('.table__wrap')

    let scrollBarWidth = scrollContainer.clientWidth - 50,
        scrollBarThumbWidth;

    if (scrollElem.clientWidth <= scrollContainer.clientWidth) {
        scrollBar.style.display = "none"
    } else {
        scrollBar.style.display = "block"
        scrollBarThumbWidth = (scrollBarWidth * scrollContainer.clientWidth - 50) / scrollElem.scrollWidth
        scrollBarThumb.style.width = `${scrollBarThumbWidth}px`
        scrollBar.style.width = `${scrollBarWidth}px`
    }

    let currentScrollDistance = 0

    scrollContainer.addEventListener("scroll", () => {
        currentScrollDistance = (scrollContainer.scrollLeft * 100) / scrollContainer.clientWidth
        scrollBarThumb.style.left = `${(scrollBarThumbWidth / 100) * currentScrollDistance - 5}px`
    });

// // scroll anim
//     function isInViewport(element, visibilityThreshold) {
//         const rect = element.getBoundingClientRect(),
//               windowHeight = window.innerHeight || document.documentElement.clientHeight,
//               windowWidth = window.innerWidth || document.documentElement.clientWidth,
//               visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0),
//               visibleWidth = Math.min(rect.right, windowWidth) - Math.max(rect.left, 0),
//               elementHeight = rect.height,
//               elementWidth = rect.width,
//               visibleArea = visibleHeight * visibleWidth,
//               totalArea = elementHeight * elementWidth,
//               visiblePercentage = visibleArea / totalArea
//         return visiblePercentage >= visibilityThreshold
//     }
//     function addClassOnVisibility(element, className, visibilityThreshold) {
//         window.addEventListener('scroll', () => {
//             if (isInViewport(element, visibilityThreshold)) {
//                 element.classList.add(className)
//             }
//         });
//         document.addEventListener("DOMContentLoaded", () => {
//             if (isInViewport(element, visibilityThreshold)) {
//                 element.classList.add(className)
//             }
//         })
//     }

    document.querySelector(".dark-btn").addEventListener("click", () =>{
        document.body.classList.toggle("dark")
    })

})



