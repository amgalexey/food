function slider() {
    const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider')
    const prevSlide = document.querySelector('.offer__slider-prev')
    const nextSlide = document.querySelector('.offer__slider-next')
    const total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider_inner'),
        width  = window.getComputedStyle(slidesWrapper).width
    let index = 1,
        offset = 0
    const dots = []


    if (slides.length < 10) {
        total.textContent = `0${slides.length}`
        current.textContent = `0${index}`
    } else {
        total.textContent = slides.length
        current.textContent = index

    }

    slidesField.style.width = 100 * slides.length + '%'
    slidesField.style.display = 'flex'
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow  = 'hidden'

    slides.forEach(slide => {
        slide.style.width = width
    })

    slider.style.position = 'relative';
    const indicators = document.createElement('ol')
    indicators.classList.add('carousel-indicators')
    indicators.style.cssText = `
             position: absolute;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 15;
            display: flex;
            justify-content: center;
            margin-right: 15%;
            margin-left: 15%;
            list-style: none;
    `
    slider.append(indicators)

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li')
        dot.setAttribute('data-slide-to', i + 1)
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `
        dot.classList.add('dot')
        if (i == 0) {
            dot.style.opacity =  1 ;
        }
        indicators.append(dot)
        dots.push(dot)
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '')
    }

    function getZeroSlide() {
        if (slides.length < 10) {
            current.textContent =`0${index}`
        } else {
            current.textContent = index
        }
    }

    function dotsOpacity(){
        dots.forEach(dot => dot.style.opacity = '.5')
        dots[index - 1].style.opacity = 1;
    }

    nextSlide.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width)
        }
        slidesField.style.transform = `translateX(-${offset}px)`
        if (index == slides.length) {
            index = 1
        } else {
            index++
        }
        getZeroSlide()
        dotsOpacity()
    })

    prevSlide.addEventListener('click', () => {
        if ( offset == 0) {

            offset = deleteNotDigits(width) * (slides.length - 1)
        } else {
            offset -= deleteNotDigits(width)
        }
        slidesField.style.transform = `translateX(-${offset}px)`

        if (index == 1) {
            index = slides.length
        } else {
            index--
        }
        getZeroSlide()
        dotsOpacity()
    })

    dots.forEach(dot => {
        dot.addEventListener('click', e => {
            const slideTo = e.target.getAttribute('data-slide-to')
            index = slideTo
            offset = deleteNotDigits(width) * (slideTo - 1)
            slidesField.style.transform = `translateX(-${offset}px)`
            getZeroSlide()
            dotsOpacity()
        })
    })
}

module.exports = slider