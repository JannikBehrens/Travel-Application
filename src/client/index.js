
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


// Export all js from index.js to the Client library
export {
    
    handleSubmit, 
    updateUI,
    validateUrl,
    checkDates   
}
