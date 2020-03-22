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

document.querySelector('input[name="price"]').addEventListener('keydown', e => formatInputValue(e))

export default formatInputValue
