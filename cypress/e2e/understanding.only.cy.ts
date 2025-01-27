// -- Start: Our Application Code --
function fizzbuzz(num: number) {
  if (num % 3 === 0 && num % 5 === 0) {
    return 'fizzbuzz'
  }

  if (num % 3 === 0) {
    return 'fizz'
  }

  if (num % 5 === 0) {
    return 'buzz'
  }
}
// -- End: Our Application Code --

// -- Start: Our Cypress Tests --
describe('Unit Test FizzBuzz', () => {
  function numsExpectedToEq(arr: number[], expected: string) {
    // loop through the array of nums and make
    // sure they equal what is expected
    arr.forEach((num) => {
      expect(fizzbuzz(num)).to.eq(expected)
    })
  }

  // only run this test
  // it.only('returns "fizz" when number is multiple of 3', () => {
  //   numsExpectedToEq([9, 12, 18], 'fizz')
  // })

  it('returns "fizz" when number is multiple of 3', () => {
    numsExpectedToEq([9, 12, 18], 'fizz')
  })

  it('returns "buzz" when number is multiple of 5', () => {
    numsExpectedToEq([10, 20, 25], 'buzz')
  })

  it('returns "fizzbuzz" when number is multiple of both 3 and 5', () => {
    numsExpectedToEq([15, 30, 60], 'fizzbuzz')
  })
})

describe('parent', () => {
  beforeEach(() => {
    cy.wrap('one').as('a')
  })

  context('child', () => {
    beforeEach(() => {
      cy.wrap('two').as('b')
    })

    describe('grandchild', () => {
      beforeEach(() => {
        cy.wrap('three').as('c')
      })

      it('can access all aliases as properties', function () {
        expect(this.a).to.eq('one') // true
        expect(this.b).to.eq('two') // true
        expect(this.c).to.eq('three') // true
      })
    })
  })
})

describe('parent NO CONTEXT', () => {
  beforeEach(() => {
    cy.wrap('one').as('a')
  })

  beforeEach(() => {
    cy.wrap('two').as('b')
  })

  beforeEach(() => {
    cy.wrap('three').as('c')
  })

  it('can access all aliases as properties', function () {
    expect(this.a).to.eq('one') // true
    expect(this.b).to.eq('two') // true
    expect(this.c).to.eq('three') // true
  })
})

describe('alias and this', function () {
  it('Test multiple cases of "this" and "alias"', function () {
    const favorites = { color: 'blue' }

    cy.wrap(favorites).its('color').as('favoriteColor')

    cy.get('@favoriteColor').then(function (aliasValue) {
      expect(aliasValue).to.eql('blue')
      expect(this.favoriteColor).to.eql('blue')
    })

    cy.then(function () {
      favorites.color = 'red'
    })

    cy.get('@favoriteColor').then(function (aliasValue) {
      expect(aliasValue).to.eql('red')
      expect(this.favoriteColor).to.eql('blue')
    })
  })
})

describe('request aliases', function () {
  it('intercept', function () {
    cy.request('https://jsonplaceholder.cypress.io/comments').as('comments')

    // using // @ts-ignore is needed
    // other test code here
    cy.get<Response>('@comments').should((response) => {
      // cy.log('debug', response)
      if (response.status === 200) {
        for (const prop in response) {
          expect(response).to.have.property(prop)
        }
        // expect(response).to.have.property('duration2')
      } else {
        // whatever you want to check here
      }
    })
  })
})

describe('stub, spy', function () {
  it('using stubs, spies', function () {
    const user = {
      getName: (arg: any) => {
        return arg
      },

      updateEmail: (arg: any) => {
        return arg
      },

      fail: () => {
        throw new Error('fail whale')
      }
    }

    // force user.getName() to return "Jane"
    cy.stub(user, 'getName').returns('Jane Lane')

    // spy on updateEmail but do not change its behavior
    cy.spy(user, 'updateEmail')

    // spy on fail but do not change its behavior
    cy.spy(user, 'fail')

    // invoke getName
    const name = user.getName(123)

    // invoke updateEmail
    const email = user.updateEmail('jane@devs.com')

    try {
      // invoke fail
      user.fail()
    } catch (e) {}

    expect(name).to.eq('Jane Lane') // true
    expect(user.getName).to.be.calledOnce // true
    expect(user.getName).not.to.be.calledTwice // true
    expect(user.getName).to.be.calledWith(123)
    expect(user.getName).to.be.calledWithExactly(123) // true
    expect(user.getName).to.be.calledOn(user) // true

    expect(email).to.eq('jane@devs.com') // true
    expect(user.updateEmail).to.be.calledWith('jane@devs.com') // true
    expect(user.updateEmail).to.have.returned('jane@devs.com') // true

    expect(user.fail).to.have.thrown('Error') // true
  })
})
