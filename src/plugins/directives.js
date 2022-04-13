import * as directives from '@/directives'

export function setupDirectives(app){
    Object.keys(directives).forEach(key => {
        app.directive(key, directives[key])
    })
}