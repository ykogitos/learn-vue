// import { mount } from 'cypress/vue'
// import InputRadio from "../../../src/components/inputForm/InputRadio.vue"

// it('mounts', () => {
//   const inputRadioValues: { id: string; label: string; value: string; selected: boolean }[] = []
//   const numEntries = 3
//   for (let i = 0; i < numEntries; i++) {
//     inputRadioValues.push({
//       id: 'radio-' + i,
//       label: String(i),
//       value: String(i),
//       selected: false
//     })
//   }

//   const wrapper = mount(InputRadio, {
//     props: {
//       inputRadioValues: inputRadioValues,
//       name: 'e2e-radio',
//       legend: 'Radio Form',
//       required: true
//     }
//   })
//   console.log('wrapper', wrapper)
//   cy.get('legend').should('include.text', 'Radio Form')
// })
