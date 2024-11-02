// import { test, expect, describe } from 'vitest'
// node need as we declare vitest as global

// see tsconfig.vitest.json
// see vitest.config.ts
import { mount } from '@vue/test-utils'
import InputRadio from '../inputForm/InputRadio.vue'

describe('The Radio Form', () => {
  const inputRadioValues: { id: string; label: string; value: string; selected: boolean }[] = []
  const numEntries = 3
  for (let i = 0; i < numEntries; i++) {
    inputRadioValues.push({
      id: 'radio-' + i,
      label: String(i),
      value: String(i),
      selected: false
    })
  }

  const wrapper = mount(InputRadio, {
    props: {
      inputRadioValues: inputRadioValues,
      name: 'e2e-radio',
      legend: 'Radio Form',
      required: true
    }
  })

  test('Check Radio rendering', () => {
    expect(wrapper.get('legend').text()).toEqual('Radio Form')
    expect(wrapper.get('fieldset').classes()).toContain('required')
    const radios = wrapper.findAll('.input-radio')
    expect(radios.length).toEqual(numEntries)
    radios.forEach((elt, index) => {
      const label = elt.get('label')
      const input = elt.get('input')
      const attributes = input.attributes()
      const forLabel = label.attributes('for')
      const inputId = attributes['id']
      const inputChecked = attributes['aria-checked']
      const inputValue = attributes['value']
      expect(attributes).toHaveProperty('required')
      expect(label.text()).toEqual(String(index))
      expect(forLabel).toEqual(inputId)
      expect(inputChecked).toBe('false')
      expect(inputValue).toEqual(String(index))
    })
  })

  test('Check User Event', async () => {
    const radios = wrapper.findAll('.input-radio')

    for (let i = 0, l = radios.length; i < l; i++) {
      const input = radios[i].find('input')
      await input.trigger('click')
      for (let j = 0; j < l; j++) {
        const currentInput = radios[j].find('input')
        if (i === j) {
          expect(currentInput.attributes('aria-checked')).toBe('true')
        } else {
          expect(currentInput.attributes('aria-checked')).toBe('false')
        }
      }
    }
  })
})
