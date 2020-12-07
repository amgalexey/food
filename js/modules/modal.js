function modal() {
    const modal = document.querySelector('.modal'),
        btn = document.querySelectorAll('[data-modal]')

    function openModal() {
        modal.classList.add('show', 'fade')
        modal.classList.remove('hide')
        document.body.style.overflow = 'hidden'
        clearTimeout(timerModal)
    }

    btn.forEach(buttons => {
        buttons.addEventListener('click', () => {
            openModal()
        })
    })

    function closeModal() {
        modal.classList.add('hide')
        modal.classList.remove('show')
        document.body.style.overflow = ''
    }


    modal.addEventListener('click', e => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal()
        }
    })

    const timerModal = setTimeout(openModal, 50000)

    document.addEventListener('keydown', e => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal()
        }
    })

    const scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    )

    function scrollModul() {
        if (window.pageYOffset + document.documentElement.clientHeight >= scrollHeight) {
            openModal()
            window.removeEventListener('scroll', scrollModul)
        }
    }

    window.addEventListener('scroll', scrollModul)
}
module.exports = modal