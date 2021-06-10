
import { handleSubmit } from './js/formHandler'

import { validateUrl } from './js/nameChecker'
import {postData} from './js/formHandler'

import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'

// Export all js from index.js to the Client library
export {
    
    handleSubmit, 
   
    validateUrl,
    postData
}
