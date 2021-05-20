const baseURL = 'http://localhost:8000/characters'
const $charList = document.querySelector('#char-list')
const $createForm = document.querySelector('#create-form')
const $updateForm = document.querySelector('#update-form')
const $getCharInput = document.querySelector('#charid')
const $getChatBtn = document.querySelector('#get-char-data')

function printChars(arr) {
    $charList.innerHTML = ''
    arr.forEach(element => {
        $charList.innerHTML += `
        <div class="col-12">
            <div class="card bg-light mb-3" style="max-width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${element.name}</h5>
                    <p class="card-text">
                    Weapon: ${element.weapon}
                    </p>
                    <br>
                    <p>
                    Occupation: ${element.occupation}
                    </p>
                    <button type="button" class="btn btn-danger" onclick="deleteElement(${element.id})">Delete</button>
                </div>
            </div>
        </div>
        `
    });    
}

async function deleteElement(id){
   await axios.delete(`${baseURL}/${id}`)
   getCharacthers()
}

function getCharacthers() {
    axios.get(baseURL)
    .then(({data}) => {
        printChars(data)
    })  
}

getCharacthers()

$createForm.onsubmit = async event => {
    event.preventDefault()
    const {target} = event
    const name = target[0].value
    const occupation = target[1].value
    const weapon = target[2].value

    await axios.post(baseURL, {
            name,
            occupation,
            weapon
        }
    )
    target[0].value = ""
    target[1].value = ""
    target[2].value = ""
}

getCharacthers()

// UPDATE
$updateForm.onsubmit = async e=>{
    e.preventDefault()

    const {target} = e
    const name = target[0].value
    const occupation = target[1].value
    const weapon = target[2].value
    const id = $getCharInput.value
    await axios.patch(`${baseURL}/${id}`, {name, occupation, weapon})

    $getCharInput.value = ""
    target[0].value = ""
    target[1].value = ""
    target[2].value = ""
}

$getChatBtn.onclick = async e => {
    const id = $getCharInput.value
    const { data: {name, weapon, occupation}} = await axios.get(`${baseURL}/${id}`)
    document.querySelector("#name-update").value = name
    document.querySelector("#occupation-update").value = occupation
    document.querySelector("#weapon-update").value = weapon   
    
    
}