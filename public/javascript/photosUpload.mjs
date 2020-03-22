const inputFile = document.querySelector('input[name="photos"]')
const files = []

const hasLimit = (limit, files) => {
  if (files.length > limit) {
    alert(`Envie no máximo ${limit} fotos!`)

    return true
  }

  return false
}

const getAllFiles = () => {
  const dataTransfer = new DataTransfer()

  files.forEach(file => dataTransfer.items.add(file))

  return dataTransfer.files
}

const createContainerImg = src => {
  const preview = document.querySelector('#photos-preview')
  const container = document.createElement('div')
  const img = document.createElement('img')
  const closeButton = document.createElement('i')
  const removePhoto = ({ target }) => {
    const photo = target.parentNode
    const photos = Array.from(document.querySelectorAll('.photo'))
    const index = photos.indexOf(photo)

    photo.remove()

    files.splice(index, 1)

    inputFile.files = getAllFiles()
    console.log(inputFile.files)

    return inputFile.files
  }
  
  img.src = src
  
  closeButton.classList.add('material-icons')
  closeButton.innerText = 'close'
  
  container.classList.add('photo')
  container.appendChild(img)
  container.appendChild(closeButton)
  container.onclick = removePhoto

  preview.appendChild(container)

  return container
}

const handleFiles = ({ target }) => {
  if (hasLimit(6, target.files)) return target.value = ''

  Array.from(target.files).forEach(file => {
    const reader = new FileReader

    reader.readAsDataURL(file)
    reader.onload = () => createContainerImg(reader.result)

    return files.push(file)
  })
}

inputFile.addEventListener('change', e => handleFiles(e))

export default handleFiles
