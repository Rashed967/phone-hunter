const loadPhones = async(searchText) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    try{
        const res = await fetch(url)
        const data = await res.json()
        displayPhones(data.data);
    }
    catch(error){
        console.log(error);
    }
}

// display phnes on UI 
const displayPhones = phones =>{
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.innerHTML = ``;



    // warning message setting 
    const warningMessage = document.getElementById('warning-message');
    if(phones.length === 0){
        warningMessage.classList.remove('hidden');
        
    }
    else{
        warningMessage.classList.add('hidden');
    }


    // show all post button handler 
        const showAllBtnDiv = document.getElementById('show-all-btn-div'); 
        if(phones.length > 9){
            showAllBtnDiv.classList.remove('hidden');
        }
        else{
            showAllBtnDiv.classList.add('hidden');
    
        }


    // show only 9 post 
    phones = phones.slice(0,9);


    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.innerHTML = `
        <div class="p-6 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
            <img class="rounded-t-lg block mx-auto" src=" ${phone.image} " alt="" />
        </a>
        <div class="p-5">
            <a href="#">
                <h5 class="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white"> ${phone.phone_name
                } </h5>
            </a>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
            <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                See Details
                <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </a>
        </div>
    </div>
        `;
        console.log(phone);
        phonesContainer.appendChild(phoneDiv); 
        spinnerToggler(false);   
    });

}

    
    // spinner toggler funtion 
    const spinnerToggler = isLoading =>{
        const spinnerDiv = document.getElementById('spinner-div');
       if(isLoading){
            spinnerDiv.classList.remove('hidden')
       }
       else{
        spinnerDiv.classList.add('hidden')
       }
    }


// search button clicked 
document.getElementById('search-btn').addEventListener('click', function(){
    spinnerToggler(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText);
})


loadPhones('phone');
