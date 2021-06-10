function validateUrl(input) {
    console.log('Check for correct url:',input)
    const url = /^http:\/\/|^https:\/\//i
    return url.test(input);
}

export { validateUrl }
