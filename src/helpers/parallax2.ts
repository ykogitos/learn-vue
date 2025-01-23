function offsetTop(element: HTMLElement, acc: number = 0): number {
  if (element.offsetParent) {
    return offsetTop(element.offsetParent as HTMLElement, acc + element.offsetTop)
  }
  return acc + element.offsetTop
}

export class Parallax2 {
  element: HTMLElement
  parentElement: HTMLElement
  ratio: number
  observer: IntersectionObserver

  constructor(parentElement: HTMLElement, element: HTMLElement) {
    this.parentElement = parentElement
    this.element = element
    this.ratio = parseFloat(this.element.dataset.parallax as string)
    this.observer = new IntersectionObserver(this.onIntersection)
    this.observer.observe(this.parentElement)
    //observer.observe(this.parentElement)
    this.onScroll()
    // this.addListener()
  }

  addListener = () => {
    document.addEventListener('scroll', this.onScroll)
  }

  removeListener = () => {
    document.removeEventListener('scroll', this.onScroll)
  }

  removeAllListener = () => {
    console.log('remove all ', this.element)
    this.observer.disconnect()
    this.removeListener()
  }

  onIntersection = (entries: IntersectionObserverEntry[]) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        this.addListener()
      } else {
        this.removeListener()
      }
    }
  }

  onScroll = () => {
    console.log('scroll')
    const screenY = window.scrollY + window.innerHeight / 2
    const elementOffsetTop = offsetTop(this.element) + this.element.offsetHeight / 2
    const diff = elementOffsetTop - screenY

    // const diffRatio = Math.max(Math.floor(diff * this.ratio), 50)
    const diffRatio = diff * this.ratio
    this.element.style.setProperty(
      'transform',
      // `translateY(${diffRatio}px) translateX(${diffRatio * -1}px)`
      `translateY(${diffRatio}px)`
    )

    if (this.element.getAttribute('class')?.indexOf('sat-10') !== -1) {
      console.log(
        this.element.getAttribute('class'),
        'elementOffsetTop',
        elementOffsetTop - screenY
      )
    }
  }
}
