function forms(){
    const forms = document.querySelectorAll('form')
    forms.forEach(item => {
        bindPostData(item)
    })
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Всё, наберу, не еби мозга только!',
        failure: 'Хуйня какая-тот произошла'
    }

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        })
        return await res.json()
    }
    function bindPostData(form) {
        form.addEventListener('submit', e => {
            e.preventDefault()
            const statusMessage = document.createElement('img')
            statusMessage.src = message.loading
            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
            `
            form.insertAdjacentElement('afterend', statusMessage)

            const formData = new FormData(form)
            const json = JSON.stringify(Object.fromEntries(formData.entries()))

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data)
                    showThanksModal(message.success)
                    statusMessage.remove()
                }).catch(() => {
                showThanksModal(message.failure)
            }).finally(() => {
                form.reset()
            })


            function showThanksModal(message) {
                const prevDialogModal = document.querySelector('.modal__dialog')
                prevDialogModal.classList.add('hide')
                openModal()

                const thanksModal = document.createElement('div')
                thanksModal.classList.add('modal__dialog')
                thanksModal.innerHTML = `
    <div class="modal__content">
    <div class="modal__close" data-close>&times;</div>
    <div class="modal__title">${message}</div>
</div>
    `
                document.querySelector('.modal').append(thanksModal)
                setTimeout(() => {
                    thanksModal.remove()
                    prevDialogModal.classList.add('show')
                    prevDialogModal.classList.remove('hide')
                    closeModal()
                }, 3000)
            }

            fetch('db.json')
                .then(data => data.json())
                .then(res => console.log(res))
        })
    }
}
module.exports = forms