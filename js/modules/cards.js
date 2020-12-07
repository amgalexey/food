function сards() {
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src
            this.alt = alt
            this.title = title
            this.descr = descr
            this.price = price
            this.transfer = 9
            this.classes = classes
            this.parent = document.querySelector(parentSelector)
            this.changeUAH()
        }

        changeUAH() {
            this.price = this.price * this.transfer
        }

        render() {
            const element = document.createElement('div')
            if (this.classes.length === 0) {
                this.element = 'menu__item'
                element.classList.add(this.element)
            } else {
                this.classes.forEach(className => element.classList.add(className))
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> $</div>
                </div>
            `
            this.parent.append(element)
        }
    }

    const getResource = async (url, data) => {
        const res = await fetch(url )
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }
        return await res.json()
    }
// getResource('http://localhost:3000/menu')
//     .then(data => {
//         data.forEach(({img, alt, title, descr,  price}) => {
//             new MenuCard(img, alt, title, descr,  price, '.menu .container').render()
//         })
//     })
    getResource('http://localhost:3000/menu')
        .then(data => createCard(data) )
    function createCard(data) {
        data.forEach(({img, alt, title, descr,  price}) => {
            const element = document.createElement('div');
            element.classList.add('menu__item')

            element.innerHTML =`
            <img src=${img} alt=${alt}>
                <h3 class="menu__item-subtitle">${title}</h3>
                <div class="menu__item-descr">${descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${price}</span> $</div>
                </div>
            `
            document.querySelector('.menu .container').append(element)
        })
    }
}
module.exports = cards;