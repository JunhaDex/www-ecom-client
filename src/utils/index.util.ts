import dayjs from 'dayjs'
import crypto from 'crypto-js'
import { v4 as uuidv4 } from 'uuid'

const ENCRYPTION_KEY = 'secret'

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

export function summarizeContent(htmlContent: string): string {
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlContent, 'text/html')
  const text = doc.getElementsByTagName('p')

  let summary = ''
  for (const p of Array.from(text)) {
    const len = p.innerText.length
    summary += p.innerText.slice(0, len)
    summary += ' '
  }

  return summary
}

export function localizePrice(price: number) {
  return price.toLocaleString('en-US')
}

export function encodeCheckout(data: {
  userId: number
  list: { id?: number; productId: number; count: number }[]
}) {
  const str = JSON.stringify({ ...data })
  const enc = crypto.AES.encrypt(str, ENCRYPTION_KEY).toString()
  return encodeURIComponent(enc)
}

export function issueOrderId() {
  const orderId = uuidv4()
  return encodeURIComponent(orderId)
}

export function decodeCheckout(encrypted: string) {
  const pure = decodeURIComponent(encrypted)
  const dec = crypto.AES.decrypt(pure, ENCRYPTION_KEY).toString(crypto.enc.Utf8)
  return JSON.parse(dec)
}

export function getTxStatus(status: number): string {
  switch (status) {
    case 1:
      return '결제완료'
    case 2:
      return '결제대기'
    case 3:
      return '배송중'
    case 4:
      return '배송완료'
    case 5:
      return '환불처리'
    case 7:
      return '거래취소'
    default:
      return '알 수 없음'
  }
}
