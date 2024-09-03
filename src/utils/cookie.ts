/**
 * 获取 cookie
 */
export function getCookie(name: string) {
    if (typeof window !== 'undefined') {
        const cookies = document.cookie.split(';')
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim()
            if (cookie.startsWith(name + '=')) {
                return cookie.substring(name.length + 1)
            }
        }
    }

    return ''
}

/**
 * 设置 cookie
 */
export function setCookie(name: string, value: string, days: number = 1) {
    if (typeof window !== 'undefined') {
        const date = new Date()
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
        document.cookie = `${name}=${value};expires=${date.toUTCString()}`
    }
}
