
import { handleSubmit } from './js/formHandler'
import { updateUI } from './js/updateUI'
import { validateUrl } from './js/nameChecker'
import { checkDates } from './js/formHandler'

import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'
import './styles/results.scss'

document.addEventListener('DOMContentLoaded', () => {
    console.log('Hello from DOM Content Loaded Event Listener')
    const button = document.getElementById('btn')
    button.addEventListener('click', (e)=> {
        e.preventDefault()
        console.log('Hello from Button Event Listener')
        handleSubmit(e);

    })
    });

// Export all js from index.js to the Client library
export {
    
    handleSubmit, 
    updateUI,
    validateUrl,
    checkDates   
}
