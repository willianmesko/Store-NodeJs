const formatPrice = price => {
  const formatBRL = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })

  return formatBRL.format(price/100)
}

const formatDate = timestamp => {
  const date = new Date(timestamp)
  const minutes = date.getMinutes()
  const hour = date.getHours()
  const day = `0${date.getDate()}`.slice(-2)
  const month = `0${date.getMonth() + 1}`.slice(-2)

  return {
    minutes,
    hour,
    day,
    month
  }
}

const formatCpfCnpj = value => {
  if (value.length > 11) {
    value = value.replace(/(\d{2})(\d)/, "$1.$2")
    value = value.replace(/(\d{3})(\d)/, "$1.$2")
    value = value.replace(/(\d{3})(\d)/, "$1/$2")
    value = value.replace(/(\d{4})(\d)/, "$1-$2")

    return value
  } else {
    value = value.replace(/(\d{3})(\d)/, "$1.$2")
    value = value.replace(/(\d{3})(\d)/, "$1.$2")
    value = value.replace(/(\d{3})(\d)/, "$1-$2")

    return value
  }
}

const formatCep = value => value.replace(/(\d{5})(\d)/, "$1-$2")

module.exports = { formatPrice, formatDate, formatCpfCnpj, formatCep }
