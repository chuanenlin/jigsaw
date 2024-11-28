import React from 'react'
import { Container } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { Layout } from './components/layout'
import { blocksList, modalityColors } from './constants'
import { ColorOverrideSVG } from './components/ColorOverrideSVG'
import { createGlobalStyle } from 'styled-components'
import { SnackbarProvider } from 'notistack'
import { defaultTheme } from './theme'
import { InputPanel, OutputPanel } from './components/input-output'
import { Workspace } from './components/Workspace'
import { TooltipContextProvider, WorkspaceContextProvider } from './context'
import { Tooltip } from './components/tooltip/Tooltip'

const GlobalStyle = createGlobalStyle`
  /**
  * Use gradient colors defined in ColorOverrideSVG to color blocks
  */
  ${blocksList.map((block) => {
    return `
        /**
         *  > and :first-child to prevent applying the styles to attached
         *  blocks as they'd get the styles of the parent otherwise
         */
        .${block.id} > path:first-child {
          fill: url(#${block.id});
          stroke: #000000;
        }
        `
  })}
`

function App() {
  return (
    <WorkspaceContextProvider>
      <TooltipContextProvider>
        <ThemeProvider theme={defaultTheme}>
          <SnackbarProvider>
            <div className='App'>
              <GlobalStyle />
              {blocksList.map((block) => (
                <ColorOverrideSVG
                  key={block.id}
                  name={block.id}
                  inputColors={block.inputModality.map(
                    (inputModality) => modalityColors[inputModality.modality],
                  )}
                  outputColor={modalityColors[block.outputModality]}
                />
              ))}
              <Container
                disableGutters={true}
                maxWidth={false}
                sx={{ height: '100vh', padding: '16px' }}
              >
                <Layout
                  SidePanelContent={<div></div>}
                  // MainPanelContent={<SceneTabs />}
                  MainPanelContent={<Workspace />}
                  LeftHelperPanelContent={<InputPanel />}
                  RightHelperPanelContent={<OutputPanel />}
                />
              </Container>
              <Tooltip />
            </div>
          </SnackbarProvider>
        </ThemeProvider>
      </TooltipContextProvider>
    </WorkspaceContextProvider>
  )
}

export default App
