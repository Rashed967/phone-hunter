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

    // display 20 phones only 
    phones = phones.slice(0, 10);

    // display no phone 
    const noFoundMessage = document.getElementById('no-found-message');
    if(phones.length === 0){
        noFoundMessage.classList.remove('d-none');
    }
    else{
        noFoundMessage.classList.add('d-none');
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
}


document.getElementById('btn-search').addEventListener('click', function(){
    const searchField = document.getElementById('search-field');
    const searchFieldValue = searchField.value;
    loadPhone(searchFieldValue);
})

loadPhone('phone');