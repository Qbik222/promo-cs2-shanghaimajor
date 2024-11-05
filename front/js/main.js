document.addEventListener("DOMContentLoaded", ()=>{
    const stageTabs = document.querySelectorAll(".predict__tabs-item")

    stageTabs.forEach((tab, i) =>{
        tab.addEventListener("click", (e) =>{
            stageTabs.forEach((tab, i) =>{
              tab.classList.remove("_active")
            })
            e.target.classList.add("_active")
        })
    })
})