const formatInputValue = ({ target }) => {
  const formatBRL = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })

  setTimeout(() => {
    target.value = target.value.replace(/\D/g, '')
    target.value = formatBRL.format(target.value/100)
  }, 1)
}

const photosUploadPreview = () => {
  const inputFile = document.querySelector('input[name="photos"]')
  const files = []
  const hasLimit = files => {
    const uploadLimit = 6

    if (files.length > uploadLimit) {
      alert(`Envie no máximo ${uploadLimit} fotos!`)

      return true
    }

    return false
  }
  const createContainer = imgSrc => {
    const preview = document.querySelector('#photos-preview')
    const container = document.createElement('div')
    const createImg = () => {
      const img = document.createElement('img')

      img.src = imgSrc

      return img
    }
    const createRemoveButton = () => {
      const button = document.createElement('i')

      button.classList.add('material-icons')
      button.innerText = 'close'

      return button
    }
    const removePhoto = ({ target }) => {
      const photo = target.parentNode
      const photos = Array.from(document.querySelectorAll('.photo'))
      const index = photos.indexOf(photo)

      photo.remove()

      files.splice(index, 1)

      inputFile.files = getAllFiles()
    }

    container.classList.add('photo')
    container.appendChild(createImg())
    container.appendChild(createRemoveButton())
    container.onclick = removePhoto

    preview.appendChild(container)
  }
  const getAllFiles = () => {
    const dataTransfer = new DataTransfer();

    files.forEach(file => dataTransfer.items.add(file))

    return dataTransfer.files;
  }
  const handleFiles = ({ target }) => {
    if (hasLimit(target.files)) return target.value = ''

    Array.from(target.files).forEach(file => {
      const reader = new FileReader

      reader.readAsDataURL(file)
      reader.onload = () => createContainer(reader.result)

      files.push(file)
    })
  }

  return handleFiles
}

const photosUploadEdit = ({ target }) => {
  const photo = target.parentNode
  const removedFiles = document.querySelector('input[name="removed_files"]')

  removedFiles.value += `${photo.id}, `

  photo.remove()
}

const productGalleryHighlight = () => {
  const highlight = document.querySelector('.gallery__highlight img')
  const highlightOverlay = document.querySelector('.highlight-overlay')
  const openHighlightOverlay = () => highlightOverlay.classList.add('active')
  const closeHighlightOverlay = () => highlightOverlay.classList.remove('active')
  const setImageHighlight = ({ target }) => {
    const previews = document.querySelectorAll('.gallery__preview img')
    const highlightOverlayImg = document.querySelector('.highlight-overlay img')

    target.classList.add('active')

    highlight.src = target.src
    highlightOverlayImg.src = target.src
    
    previews.forEach(preview => {
      if (preview.src != highlight.src) preview.classList.remove('active')
    })
  }

  
  return { openHighlightOverlay, closeHighlightOverlay, setImageHighlight }
}

const checkInputCpfCnpj = ({ target }) => {
  const cnpjFormat = value => {
    value = value.replace(/(\d{2})(\d)/, "$1.$2")
    value = value.replace(/(\d{3})(\d)/, "$1.$2")
    value = value.replace(/(\d{3})(\d)/, "$1/$2")
    value = value.replace(/(\d{4})(\d)/, "$1-$2")

    return value
  }
  const cpfFormat = value => {
    value = value.replace(/(\d{3})(\d)/, "$1.$2")
    value = value.replace(/(\d{3})(\d)/, "$1.$2")
    value = value.replace(/(\d{3})(\d)/, "$1-$2")

    return value
  }

  setTimeout(() => {
    target.value = target.value.replace(/\D/g, "")
    
    if (target.value.length > 14) target.value = target.value.slice(0, -1)
    
    if (target.value.length > 11) {
      const value = cnpjFormat(target.value)
      
      target.value = value
    } else {
      const value = cpfFormat(target.value)

      target.value = value
    }
  }, 1)
}

const checkInputCep = ({ target }) => {
  const cepFormat = value => {
    value = value.replace(/(\d{5})(\d)/, "$1-$2")

    return value
  }

  setTimeout(() => {
    target.value = target.value.replace(/\D/g, "")
    
    if (target.value.length > 8) target.value = target.value.slice(0, -1)
    
    target.value = cepFormat(target.value)
  }, 1)
}

const displayError = (input, error) => {
  const div = document.createElement('div')
  div.classList.add('error')
  div.innerHTML = error

  input.parentNode.appendChild(div)
  input.focus()
}

const validateEmail = ({ target }) => {
  const validator = value => {
    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if (!value.match(emailFormat)) return false

    return true
  }
  const isValid = validator(target.value)
  const divError = document.querySelector('.error')

  if (divError) divError.remove()
  
  if (!isValid) displayError(target, 'Email inválido')
}

const validateCpfCnpj = ({ target }) => {
  const value = target.value.replace(/\D/g, '')
  const divError = document.querySelector('.error')

  if (divError) divError.remove()

  if (value.length < 11) {
    displayError(target, 'CPF ou CPNJ inválido')
  } else if (value.length > 11 && value.length < 14) {
    displayError(target, 'CNPJ inválido')
  }
}

const validateCep = ({ target }) => {
  const value = target.value.replace(/\D/g, '')
  const divError = document.querySelector('.error')

  if (divError) divError.remove()

  if (value.length < 8) displayError(target, 'CEP inválido')
}

const fillAllFields = e => {
  const items = document.querySelectorAll('.item input, .item select, .item textarea')

  for (const item of items) {
    if (item.value == "") {
      const message = document.createElement('div')
      
      message.classList.add('messages')
      message.classList.add('message--error')
      message.style.position = 'fixed'
      message.innerText = 'Todos os campos devem estar preenchidos.'

      document.querySelector('body').appendChild(message)

      e.preventDefault()
      
      return true
    }
  }
}
