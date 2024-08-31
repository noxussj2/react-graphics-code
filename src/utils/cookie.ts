/**
 * 获取 cookie
 */
export function getCookie(name) {
    if (typeof window !== 'undefined') {
        const cookies = document.cookie.split(';')
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim()
            if (cookie.startsWith(name + '=')) {
                return cookie.substring(name.length + 1)
            }
        }
    }

    return ""
}
