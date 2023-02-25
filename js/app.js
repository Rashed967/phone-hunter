const loadPhone = async (searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    try {
        const res = await fetch(url)
        const data = await res.json()
        displayPhones(data.data);
    }
    catch (error) {
        console.log(error);
    }
}


const displayPhones = phones => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.innerHTML = '';

        // show All btn 
        const btnShowAll = document.getElementById('btn-show-all');
        if(phones.length > 10){
            btnShowAll.classList.remove('d-none');
        }
        else{
            btnShowAll.classList.add('d-none');

        }

    // display 10 phones 
    phones = phones.slice(0, 10);

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
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to
                    additional content. This content is a little bit longer.</p>
            </div>
    </div 
        `;
        console.log(phone);
      phonesContainer.appendChild(phoneDiv);  
    });
    toggleSpinner(false);
}

document.getElementById('btn-search').addEventListener('click', function(){
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchFieldValue = searchField.value;
    loadPhone(searchFieldValue);
    searchField.value = '';
})


const toggleSpinner = isLoading =>{
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');

    }
}

loadPhone('phone');