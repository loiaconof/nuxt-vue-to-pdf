import fs from 'node:fs/promises'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'
import postcssImport from 'postcss-import'

export async function processLocalCss(files: string[]) {
  const css = await Promise.all(files.map(async (file) => {
    const cssContent = await fs.readFile(file, 'utf8')

    const result = await postcss([postcssImport, autoprefixer])
      .process(cssContent, { from: file })

    return result.css
  }))

  return css.join()
}
