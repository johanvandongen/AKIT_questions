import { check } from "express-validator"

const questionSchema = [
    check('question').notEmpty().withMessage('Questoin must not be empty'),
    check('author').notEmpty().withMessage('Author must not be empty'),
    check('treated.state').notEmpty().withMessage('Treated must not be empty').isIn(['Yes', 'No', 'Pending']).withMessage('Treated state must be one of the following: Yes, No or Pending'),
    check('treated.remark').if((value, {req}) => {return req.body.treated.state === 'Pending'}).notEmpty().withMessage('A remark must be added when the question state is pending'),
    check('answer').optional().isArray({min: 0}).withMessage('Answer must be an array if supplied'),
    check('authorReply').optional().isArray({min: 0}).withMessage('AuthorReply must be an array if supplied')
    // check('exerciseIds').isArray({min: 0}).withMessage('List of exercise ids must be included')
]

export default questionSchema;