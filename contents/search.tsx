import type { PlasmoContentScript } from "plasmo"

export const config: PlasmoContentScript = {
  matches: ["https://www.tokopedia.com/search*"]
}

// Idea for an UI API, for popup, notification badge, or mounting UI
// Idea for static mount
// Idea for styling injection support (inline or with custom emotion cache)

export const getMountPoint = async () => {
  console.log('foo')
  return document.querySelector(".css-1yus67o")
}

const PlasmoOverlay = () => {
  return (
    <span
      style={{
        padding: 12
      }}>
      <h1>HELLO WORLD ROOT CONTAINER</h1>
    </span>
  )
}

export default PlasmoOverlay