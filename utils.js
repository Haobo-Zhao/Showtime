const log = console.log.bind(console)

const UNARY_OPERATOR_PRECEDENCES = {
    '+': 20,
    '-': 20,
}

const getUnaryOperatorPrecedence = (unaryOperator) => {
    if (unaryOperator in UNARY_OPERATOR_PRECEDENCES) {
        return UNARY_OPERATOR_PRECEDENCES[unaryOperator]
    } else {
        return 0
    }
}

const BINARY_OPERATOR_PRECEDENCES = {
    '/': 10,
    '*': 10,

    '+': 1,
    '-': 1,
}

const getBinaryOperatorPrecedence = (binaryOperator) => {
    if (binaryOperator in BINARY_OPERATOR_PRECEDENCES) {
        return BINARY_OPERATOR_PRECEDENCES[binaryOperator]
    } else {
        return 0
    }
}

const prettyLog = (node, indent = '', marker = '', isLastChild = true, isRoot = true) => {
    let message = `${indent}${marker}${node.kind}`
    if (node && node.value) {
        message += ` ${node.value}`
    }
    log(message)

    const children = node.getChildren()
    const lastChild = children[children.length - 1]

    const parentIsLastChild = isLastChild
    const parentIsRoot = isRoot
    const parentIndent = indent
    const childIndent = parentIndent + (parentIsRoot
        ? ''
        : `${parentIsLastChild ? '    ' : '│   '}`
    )
    children.forEach(child => {
        const childMarker = child == lastChild
            ? '└── '
            : '├── '

        prettyLog(child, childIndent, childMarker, child == lastChild, false)
    });
}

const DIGITS = '0123456789'
const WHITESPACES = ' \s\t\n\r\v'
const OPERATORS = '+-*/'
const PARENTHESIS = '()'
