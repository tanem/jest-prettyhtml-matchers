export const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
    <defs>
      <mask id="MaskTest" x="0" y="0" width="100" height="100" >
        <rect x="0" y="0" width="64" height="32" style="stroke:none; fill:white"/>
      </mask>
    </defs>
    <rect x="1" y="1" width="64" height="64" stroke="none" fill="plum"/>
    <rect x="1" y="1" width="64" height="64" stroke="none" fill="gray" mask="url(#MaskTest)"/>
  </svg>
`
