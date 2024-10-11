export const cbSplit = (str: string): string => {
  const regex = /\d{4}/gm

  let m
  let out = ''
  let l = 0
  str = str.replace(/ /g, '')
  while ((m = regex.exec(str)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++
    }

    // The result can be accessed through the `m`-variable.
    m.forEach((match) => {
      out += match + ' '
      l += 4
    })
  }
  const sbstr = str.substring(l)

  if (sbstr.length) {
    out += sbstr
  }
  return out.trim()
}

export const cbIsValid = (n: string): boolean => {
  const array: number[] = []
  let checkSum: number = -1
  for (let i = 0, l = n.length; i < l; i++) {
    let value = parseInt(n[i])
    if (Number.isNaN(value)) {
      console.warn('Cb card must be a number')
      return false
    }
    if (i % 2) {
      array.push(value)
    } else {
      value = value * 2
      if (value > 9) {
        value = Math.floor(value / 10) + (value % 10)
      }
      array.push(value)
    }
  }

  checkSum = array.reduce((acc, x) => x + acc, 0)
  return checkSum % 10 === 0
}

export const cbBankIdentifier = (n: string): { name: string; l: number; l2: number } => {
  const banks = [
    {
      name: 'Diners Club Carte Blanche',
      reg: '^30[0-5]',
      l: 14,
      l2: 0
    },
    {
      name: 'American Express',
      reg: '^34|^37',
      l: 15,
      l2: 0
    },
    {
      name: 'JCB',
      reg: '^35(?:(?:2[8-9])|[3-8]d)',
      l: 16,
      l2: 0
    },
    {
      name: 'Diners Club International',
      reg: '^3(?:0|6|8)',
      l: 14,
      l2: 0
    },
    {
      name: 'Visa Electron',
      reg: '^4026|^417500|^4508|^4844|^4913|^4917',
      l: 16,
      l2: 0
    },
    {
      name: 'Visa',
      reg: '^4',
      l: 13,
      l2: 16
    },
    {
      name: 'Diners Club US|CA',
      reg: '^55',
      l: 16,
      l2: 0
    },
    {
      name: 'Maestro',
      reg: '^5018|^5020|^5038|^5893|^6304|^6759|^6761|^6762|^6763',
      l: 12,
      l2: 19
    },
    {
      name: 'Mastercard',
      reg: '^5[1-5]',
      l: 16,
      l2: 0
    },
    {
      name: 'Discover Card',
      reg: '^6011|^622(?:(?:12(?:[6-9]))|(?:1[3-8]d)|(?:[2-8])dd|(?:91[0-9])|(?:92[0-5]))|^64[4-9]|^65',
      l: 16,
      l2: 0
    },
    {
      name: 'InstaPayment',
      reg: '^63[7-9]',
      l: 16,
      l2: 0
    },
    {
      name: 'Laser',
      reg: '^6304|^6706|^6771|^6709',
      l: 16,
      l2: 19
    }
  ]

  let bank = {
    name: '',
    l: 0,
    l2: 0
  }

  for (let i = 0, l = banks.length; i < l; i++) {
    const regex = new RegExp(banks[i].reg, 'g')
    if (regex.test(n)) {
      bank = { ...banks[i] }
    }
  }
  return {
    name: bank.name,
    l: bank.l,
    l2: bank.l2
  }
}
