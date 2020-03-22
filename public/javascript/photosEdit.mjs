const photosUploadEdit = ({ target }) => {
  const photo = target.parentNode
  const removedFiles = document.querySelector('input[name="removed_files"]')

  removedFiles.value += `${photo.id}, `

  photo.remove()
}

document.querySelectorAll('.remove').forEach(btn => btn.addEventListener('click', e => photosUploadEdit(e)))
