// Function to display uploaded images on the page retrieved from the server
const displayImages = (images) => {
    const imageGrid = document.getElementById('imageGrid')

    for(let i = 0; i < images.length; i++) {
        const imageItem = document.createElement('div')
        imageItem.classList.add('imageItem')
        
        const img = document.createElement('img')
        img.src = `http://localhost:3000/${images[i].path}`
        
        const description = document.createElement('p')
        description.textContent = images[i].description

        imageItem.appendChild(img)
        imageItem.appendChild(description)
        imageGrid.appendChild(imageItem)
    }
}

const fetchImages = async () => {
    try {
        const response = await fetch('/api/images')
        if (!response.ok) {
            throw new Error('Failed to fetch images')
        }
        const images = await response.json()
        displayImages(images)
    } catch (error) {
        console.error('Error fetching images:', error)
    }
}

// Event listener for form submission to upload image with POST request
document.getElementById('uploadForm').addEventListener('submit', async function(event) {
    event.preventDefault()
    const formData = new FormData(this) // 'this' refers to the form element and creates a FormData object from the form
    formData.append('description', document.getElementById('desc').value) // Append description to form data

    document.getElementById('desc').value = ''
    document.getElementById('image').value = ''

    try {
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        })

        if (!response.ok) {
            throw new Error('Upload failed')
        }
        const responseData = await response.json()
    } catch (error) {
        console.error('Error uploading image:', error)
    } finally {
        fetchImages()
    }
})

// Fetch uploaded images on page load
window.addEventListener('DOMContentLoaded', async function() {
    fetchImages()
})