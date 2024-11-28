interface ColorOverrideSVGProps {
  inputColors: Array<string>
  outputColor: string
  name: string
}

/**
 * Defines the SVG used to override the color of the blockly blocks
 * @returns
 */
export const ColorOverrideSVG = ({ inputColors, outputColor, name }: ColorOverrideSVGProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='0'
      height='0'
      className='absolute -left-full -top-full'
    >
      <defs>
        <pattern
          id={name}
          width='1'
          height='1'
          patternUnits='objectBoundingBox'
          patternContentUnits='objectBoundingBox'
        >
          {inputColors.map((color, index) => {
            return (
              <rect
                key={index}
                x='0.5'
                y={index / inputColors.length}
                width='0.5'
                height={1 / inputColors.length}
                fill={color}
              ></rect>
            )
          })}
          <rect x='0' y='0' width='0.5' height='1' fill={outputColor}></rect>
        </pattern>
      </defs>
    </svg>
  )
}
