import api, { route } from '@forge/api';

export const getIssues = async (payload, requestContext) => {
  try {
    const response = await api.asApp().requestJira(route`/rest/api/3/search?jql=project=TEST`);
    
    if (!response.ok) {
      throw new Error(`Jira API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching Jira issues:', error);
    return null;
  }
};

export const getConfluence = async () => {
  try {
    const response = await api.asApp().requestConfluence(route`/wiki/api/v2/spaces/test/pages`, {
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Confluence API Error: ${response.status} ${response.statusText}`);
    }

    const confluenceData = await response.json();
    console.log(confluenceData);
    return confluenceData;
  } catch (error) {
    console.error('Error fetching Confluence pages:', error);
    return null;
  }
};

