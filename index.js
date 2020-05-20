const createForm = document.getElementById("create-plant")
const updateForm = document.getElementById("update-plant")
const updateName = document.getElementById("update-name")
const updatePlantType = document.getElementById("update-type")
const updateLocation = document.getElementById("update-location")
const updateId = document.getElementById("update-id")
const plantUrl = 'http://localhost:3000/plants'

fetch(plantUrl)
.then(response => response.json())
.then(plants => plants.map(displayPlantInfo))

createForm.addEventListener("submit", () => {
    event.preventDefault()
    const formData = new FormData(createForm)
    const name = formData.get("name")
    const plant_type = formData.get("plant_type") 
    const location = formData.get("location")
    const plant = {name: name, plant_type: plant_type, location: location}

    displayPlantInfo(plant)

    createForm.reset()

    fetch(plantUrl, {
        method:"POST",
        headers:{"content-type": "application/json"},
        body: JSON.stringify({plant})
    })
})

updateForm.addEventListener("submit", () => {
    event.preventDefault()
    const formData = new FormData(updateForm)
    const id = formData.get("id")
    
    const plant = { 
        name: formData.get("name"), 
        plant_type: formData.get("plant_type"), 
        location: formData.get("location")
    }

    updateForm.reset()
    displayPlantInfo(plant)

    fetch(`${plantUrl}/${id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({plant})
    })
})

function displayPlantInfo(plant){
    let plantCard = document.createElement('div')
    let name = document.createElement('h1')
    let plantType = document.createElement('p')
    let location = document.createElement('p')
    let deleteButton = document.createElement('button')
    let updateButton = document.createElement('button')

    name.textContent = plant.name
    plantType.textContent = plant.plant_type
    location.textContent = plant.location
    deleteButton.textContent = "delete"
    updateButton.textContent = "update"


    updateButton.addEventListener("click", updatePlant)
       

    function updatePlant(){
        plantCard.remove()
        updateName.value = plant.name
        updatePlantType.value = plant.plant_type 
        updateLocation.value = plant.location
        updateId.value = plant.id
    }

    deleteButton.addEventListener("click", (event) => {
        plantCard.remove()

        fetch(`${plantUrl}/${plant.id}`, {
            method:"DELETE",
            headers:{"content-type": "application/json"}
        })
    })


    plantCard.append(name, plantType, location, updateButton, deleteButton)
    document.body.append(plantCard)
    
}