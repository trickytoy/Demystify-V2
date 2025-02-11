  import React, { useEffect, useState } from 'react';
  import ForgeReconciler, { Text, Heading, Box, Stack, Link, TabList, Tab, Tabs, TabPanel } from '@forge/react';
  import { invoke } from '@forge/bridge';
  import acronyms from '../data/acronyms.json';

  const ExampleBox = ({ children }) => {
    return (
      <Box
        xcss={{
          backgroundColor: 'color.background.discovery',
          borderRadius: 'border.radius',
          borderStyle: 'solid',
          borderWidth: 'border.width',
          borderColor: 'color.border.discovery',
          padding: 'space.200',
          display: 'block',
          flexGrow: 1
        }}
      >
        {children}
      </Box>
    );
  };

  const VerticalExampleList = () => {
    return (
      <Stack space="space.100">
        <ExampleBox>
          <Link>Confluence Page: User Authentication Best Practices</Link>
        </ExampleBox>
        <ExampleBox>
          <Link>Confluence Page: asdlkas slkad saldk nsad lskadn asldnk aslkdn s</Link>
        </ExampleBox>
      </Stack>
    );
  };

  const AcronymGlossary = () => {
    console.log(acronyms)
    return (
      <Stack space="space.100">
        {Object.entries(acronyms).map(([key, value]) => (
          <ExampleBox key={key}>
            <Text>{key}: {value}</Text>
          </ExampleBox>
      ))}
      </Stack>
    );
  };

  const App = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
      invoke('getText', { example: 'my-invoke-variable' }).then(setData);
    }, []);

    return (
      <>
        <Tabs>
          <TabList>
            <Tab>Summary</Tab>
            <Tab>Confluence Links</Tab>
            <Tab>Acronym Glossary</Tab>
          </TabList>
          <TabPanel>
            <Box xcss={{ padding: 'space.200' }}>
              <ExampleBox>
                Implement Multi-Factor Authentication (MFA) for user logins, supporting email, mobile authentication, TOTP-based authenticators, and backup codes to enhance security.
              </ExampleBox>
            </Box>
          </TabPanel>
          <TabPanel>
            <Box xcss={{ padding: 'space.200' }}>
              <VerticalExampleList />
            </Box>
          </TabPanel>
          <TabPanel>
            <Box xcss={{ padding: 'space.200' }}>
              <AcronymGlossary />
            </Box>
          </TabPanel>
        </Tabs>
      </>
    );
  };

  ForgeReconciler.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
