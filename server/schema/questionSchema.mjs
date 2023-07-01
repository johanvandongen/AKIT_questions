import { check } from "express-validator"

const questionSchema = [
    check('question').notEmpty().withMessage('Questoin must not be empty'),
    check('author').notEmpty().withMessage('Author must not be empty'),
    check('treated.state').notEmpty().withMessage('Treated must not be empty'),
    check('exerciseIds').isArray({min: 0}).withMessage('List of exercise ids must be included')
]

export default questionSchema;