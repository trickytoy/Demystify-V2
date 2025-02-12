import React from 'react';
import ForgeReconciler, { Text, Box, Stack, Link, TabList, Tab, Tabs, TabPanel, useProductContext } from '@forge/react';
import tickets from '../data/tickets.json';
import quotes from '../data/quotes.json';

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

const ConfluenceLinks = ({ issue }) => {
  return (
    <Stack space="space.100">
      {issue?.["Related-Confluence"] ? (
        <ExampleBox>
          <Link href={issue["Related-Confluence"]} target="_blank">
            {issue["Confluence Title"] || issue["Related-Confluence"]}
          </Link>
        </ExampleBox>
      ) : (
        <ExampleBox>
          <Text>No related Confluence pages found.</Text>
        </ExampleBox>
      )}
    </Stack>
  );
};

const AcronymGlossary = ({ acronyms }) => {
  return (
    <Stack space="space.100">
      {acronyms && acronyms.length > 0 ? (
        acronyms.map((item, index) => {
          const [key, value] = Object.entries(item)[0];
          return (
            <ExampleBox key={index}>
              <Text>{key}: {value}</Text>
            </ExampleBox>
          );
        })
      ) : (
        <ExampleBox>
          <Text>No acronyms found.</Text>
        </ExampleBox>
      )}
    </Stack>
  );
};

const RandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const { quote, author } = quotes[randomIndex];

  return (
    <ExampleBox>
      <Text>{quote}</Text>
      <Text>- {author}</Text>
    </ExampleBox>
  );
};

const App = () => {
  const context = useProductContext();
  const issueID = context?.extension?.issue?.key;
  const issue = issueID ? tickets[issueID] : null;

  console.log("Issue ID:", issueID);
  console.log("Available Tickets:", Object.keys(tickets));
  console.log("Retrieved Issue:", issue);

  return (
    <>
      <Tabs>
        <TabList>
          <Tab>Summary</Tab>
          <Tab>Confluence Links</Tab>
          <Tab>Acronym Glossary</Tab>
          <Tab>Quotes</Tab>
        </TabList>

        <TabPanel>
          <Box xcss={{ padding: 'space.200' }}>
            <ExampleBox>
              {issue ? <Text>{issue?.Summary || "No Summary Available"}</Text> : <Text>Issue not found</Text>}
            </ExampleBox>
          </Box>
        </TabPanel>

        <TabPanel>
          <Box xcss={{ padding: 'space.200' }}>
            <ConfluenceLinks issue={issue} />
          </Box>
        </TabPanel>

        <TabPanel>
          <Box xcss={{ padding: 'space.200' }}>
            <AcronymGlossary acronyms={issue?.Acronyms} />
          </Box>
        </TabPanel>

        <TabPanel>
          <Box xcss={{ padding: 'space.200' }}>
            <RandomQuote />
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
