import dayjs from 'dayjs'

export function tts(time: Date | string): string {
  const current = dayjs()
  const local = dayjs(time)
  const diff = current.diff(local, 'second')
  if (diff < 5) return `방금 전`
  else if (diff < 60) return `${diff}초 전`
  else if (diff < 3600) return `${Math.floor(diff / 60)}분 전`
  else if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`
  else if (diff < 604800) return `${Math.floor(diff / 86400)}일 전`
  else return local.format('MM월DD일 HH:mm')
}

export function summarizeContent(htmlContent: string, length = 20): string {
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlContent, 'text/html')
  const text = doc.getElementsByTagName('p')

  let summary = ''
  for (const p of Array.from(text)) {
    const len = p.innerText.length
    const size = Math.min(len, length - summary.length + 1)
    summary += p.innerText.slice(0, size)
    summary += ' '
    if (summary.length >= length) break
  }

  return summary
}
