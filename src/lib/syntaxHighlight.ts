import Prism from 'prismjs'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-cpp'
import 'prismjs/components/prism-python'

export function getCharTokenClasses(code: string, language: string): string[] {
    const classes: string[] = Array(code.length).fill('')
    if (!code) return classes

    let lang = language.toLowerCase()
    if (lang === 'cpp' || lang === 'c++') {
        lang = 'cpp'
    } else if (lang === 'html') {
        lang = 'markup'
    } else if (lang === 'javascript') {
        lang = 'javascript'
    } else if (lang === 'python') {
        lang = 'python'
    } else {
        return classes
    }

    const grammar = Prism.languages[lang]
    if (!grammar) return classes

    try {
        const tokens = Prism.tokenize(code, grammar)
        let currentIndex = 0

        const processToken = (token: string | Prism.Token, parentType?: string) => {
            if (typeof token === 'string') {
                if (parentType) {
                    for (let i = 0; i < token.length; i++) {
                        if (currentIndex < classes.length) {
                            classes[currentIndex] = parentType
                        }
                        currentIndex++
                    }
                } else {
                    currentIndex += token.length
                }
            } else {
                const currentType = token.type
                const typeClass = parentType ? `${parentType} token-${currentType}` : `token-${currentType}`
                
                if (Array.isArray(token.content)) {
                    token.content.forEach(sub => processToken(sub, typeClass))
                } else {
                    processToken(token.content, typeClass)
                }
            }
        }

        tokens.forEach(token => processToken(token))
    } catch (e) {
        console.error("Prism tokenization failed", e)
    }

    return classes
}
