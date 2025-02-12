import Resolver from '@forge/resolver';

const resolver = new Resolver();

resolver.define('getText', (req) => {
  console.log(req);
  return 'Hello, world!';
});

const api_url ="https://zenquotes.io/api/quotes/";


export const handler = resolver.getDefinitions();

async function getapi(url)
{
  const response = await fetch(url);
  var data = await response.json();
  console.log(data);
}