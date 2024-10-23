export const cbPattern = (str: string, pattern: string, nbChar: number) => {
  if (str === '') return ''
  str = str.replace(/ /g, '').replace(/\D/g, '')
  const regex = new RegExp(pattern, 'gm')
  let m
  let out = ''
  let l = 0
  while ((m = regex.exec(str)) !== null) {
    for (let i = 1; i < m.length; i++) {
      if (m[i]) {
        out += m[i] + ' '
        l += m[i].length
        if (!m[i + 1]) break
      }
    }
    const sbstr = str.substring(l)
    if (sbstr.length) {
      out += sbstr
    }
    break
  }

  return out.trim().substring(0, nbChar)
}

export const luhnCheck = (str: string, l: number): boolean => {
  if (!str) {
    return false
  }

  str = str.replace(/ /g, '')
  const digits = str.split('').map(Number)
  if (digits.length !== l) return false
  let sum = 0
  let isSecond = false
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = digits[i]
    if (isSecond) {
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }
    sum += digit
    isSecond = !isSecond
  }
  return sum % 10 === 0
}

import type { BankDataInterface } from '@/interfaces'
export const cbBankIdentifier = (cbNumber: string): BankDataInterface => {
  // https://baymard.com/checkout-usability/credit-card-patterns
  const banks = [
    {
      name: 'Visa Electron', // 4917484589897107
      logo: 'visa-electron',
      reg: '^4026|^417500|^4405|^4508|^4844|^4913|^4917',
      pattern: '(.{4})?(.{4})?(.{4})?(.{4})?',
      spaces: 3,
      l: 16
    },
    {
      name: 'Visa', // 4263982640269299
      logo: 'visa',
      reg: '^4',
      pattern: '(.{4})?(.{4})?(.{4})?(.{4})?',
      spaces: 3,
      l: 16
    },
    {
      name: 'American Express', // 374245455400126
      logo: 'american-express',
      reg: '^34|^37',
      pattern: '(.{4})?(.{6})?(.{5})?',
      spaces: 2,
      l: 15
    },
    {
      name: 'Mastercard', // 5425233430109903
      logo: 'mastercard',
      reg: '^5[1-5]|^222(?:[1-9]dd)|^2(?:[2-8]\\d\\d\\d\\d)|^2720\\d\\d',
      pattern: '(.{4})?(.{4})?(.{4})?(.{4})?',
      spaces: 3,
      l: 16
    },
    // MISSING MAESTRO
    {
      name: 'Diners Club Carte Blanche | International', // 30569309025904
      logo: 'diner',
      reg: '^30[0-5]|^309|^36|^38|^39',
      pattern: '(.{4})?(.{6})?(.{4})?',
      spaces: 2,
      l: 14
    },
    // 38520000023237
    // MISSING DINERS US / CA
    {
      name: 'Discover Card', // 6011111111111117
      logo: 'discover',
      reg: '^6011|^622(?:(?:12(?:[6-9]))|(?:1[3-8]\\d)|(?:[2-8])\\d\\d|(?:91[0-9])|(?:92[0-5]))|^64[4-9]|^65',
      pattern: '(.{4})?(.{4})?(.{4})?(.{4})?',
      spaces: 3,
      l: 16
    },
    // MISSING DISCOVER 15 pins
    {
      name: 'JCB', // 3530111333300000
      logo: 'jcb',
      reg: '^35(?:(?:2(?:[8-9]))|(?:[3-8]\\d))',
      pattern: '(.{4})?(.{4})?(.{4})?(.{4})?',
      spaces: 3,
      l: 16
    }
  ]

  let bank = {
    name: '',
    logo: '',
    reg: '',
    pattern: '',
    spaces: 0,
    l: 16
  }

  for (let i = 0, l = banks.length; i < l; i++) {
    const regex = new RegExp(banks[i].reg, 'g')
    if (regex.test(cbNumber)) {
      bank = { ...banks[i] }
      break
    }
  }
  return {
    name: bank.name,
    logo: bank.logo,
    pattern: bank.pattern,
    spaces: bank.spaces,
    l: bank.l
  }
}
