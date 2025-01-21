function offsetTop(element: HTMLElement, acc: number = 0): number {
  if (element.offsetParent) {
    return offsetTop(element.offsetParent as HTMLElement, acc + element.offsetTop)
  }
  return acc + element.offsetTop
}

export class Parallax {
  element: HTMLElement
  ratio: number

  constructor(element: HTMLElement) {
    this.element = element
    this.ratio = parseFloat(this.element.dataset.parallax as string)
    this.addListener()
  }

  addListener = () => {
    document.addEventListener('scroll', this.onScroll)
  }

  onScroll = () => {
    const screenY = window.scrollY + window.innerHeight / 2
    const elementOffsetTop = offsetTop(this.element) + this.element.offsetHeight / 2

    if (this.element.getAttribute('class')?.indexOf('yellow sat-88') !== -1) {
      console.log(
        this.element.getAttribute('class'),
        'elementOffsetTop',
        elementOffsetTop - screenY
      )
    }
  }

  static bind(): Parallax[] {
    return Array.from(document.querySelectorAll('[data-parallax]')).map((element) => {
      return new Parallax(element as HTMLElement)
    })
  }
}
