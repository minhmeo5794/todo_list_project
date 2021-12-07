
const randomId = () => {
    return Math.trunc(Math.random() * 123456) + Math.trunc(Math.random() * 12345) + Math.trunc(Math.random() * 1234) + 1234
}

export default randomId