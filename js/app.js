const loadPhone = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    try {
        const res = await fetch(url)
        const data = await res.json()
        displayPhones(data.data,dataLimit);
    }
    catch (error) {
        console.log(error);
    }
}

// display phone on UI 
const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.innerHTML = '';

        // show All btn section
        const btnShowAll = document.getElementById('btn-show-all');
        if(dataLimit && phones.length > 10){
            phones = phones.slice(0, 10);
            btnShowAll.classList.remove('d-none');
        }
        else{
            btnShowAll.classList.add('d-none');

        }

    // display 10 phones 

    // warning message 
    const warningMessage = document.getElementById('warning-message');
    if(phones.length === 0){
        warningMessage.classList.remove('d-none');
    }
    else{
        warningMessage.classList.add('d-none');

    }



    // display All phone 
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div')
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
         <div class="card p-4">
            <img class="card-img-top" alt="" src="${phone.image}">
        <div class="card-body">
        <h5 class="card-title"> ${phone.phone_name} </h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <button onclick="loadPhoneDetail('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Go somewhere</button>
            </div>
    </div 
        `;

      phonesContainer.appendChild(phoneDiv);  
    });
    toggleSpinner(false);
}


// process search system 
const processSearch = (dataLimit) =>{
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchFieldValue = searchField.value;
    loadPhone(searchFieldValue, dataLimit);
    // searchField.value = '';
}


// handle search button clicked 
document.getElementById('btn-search').addEventListener('click', function(){
    // start loader 
    processSearch(10)
})


// search enter key handler 
document.getElementById('search-field').addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        processSearch(10)
    }
})


// search loader 

const toggleSpinner = isLoading =>{
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }
}

document.getElementById('btn-all').addEventListener('click', function(){
    processSearch();
})


// load phone details 
const loadPhoneDetail = async(phoneId) =>{
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    const res = await fetch(url)
    const data = await res.json()
    displayPhoneDetail(data.data);
}


// displayPhones detail 
const displayPhoneDetail = phone =>{
    const modalTitle = document.getElementById('phoneDetailModalLabel'); 
    modalTitle.innerText = phone.name;
    const phoneDetail = document.getElementById('phone-details');
    phoneDetail.innerHTML = `
    <p>ChipSet : ${phone.mainFeatures ? phone.mainFeatures.chipSet : 'Chipset detail not found'} </p>
    <p>Memory : ${phone.mainFeatures ? phone.mainFeatures.memory : 'Memory detail not found'} </p>
    <p>ReleaseDate : ${phone.releaseDate ? phone.releaseDate : 'No releaseDate found!'} </p>
    `;
    console.log(phone);
}

loadPhone('phone');