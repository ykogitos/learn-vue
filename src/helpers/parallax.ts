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
    const observer = new IntersectionObserver(this.onIntersection)
    observer.observe(this.element)
    // this.onScroll()
    // this.addListener()
  }

  addListener = () => {
    document.addEventListener('scroll', this.onScroll)
  }

  removeListener = () => {
    document.removeEventListener('scroll', this.onScroll)
  }

  onIntersection = (entries: IntersectionObserverEntry[]) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        this.onScroll()
        this.addListener()
      } else {
        this.removeListener()
      }
    }
  }

  onScroll = () => {
    const screenY = window.scrollY + window.innerHeight / 2
    const elementOffsetTop = offsetTop(this.element) + this.element.offsetHeight / 2
    const diff = elementOffsetTop - screenY

    // const diffRatio = Math.max(Math.floor(diff * this.ratio), 50)
    const diffRatio = diff * this.ratio
    console.log(this.element.getAttribute('class'), 'diffRatio', diffRatio)
    this.element.style.setProperty(
      'transform',
      `translateY(${diffRatio}px) translateX(${diffRatio * -1}px)`
    )

    if (this.element.getAttribute('class')?.indexOf('sat-10') !== -1) {
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
