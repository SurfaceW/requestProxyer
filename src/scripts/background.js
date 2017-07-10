import { getLocalRules, setLocalRules } from './utils/storage';

function redirectOnMatch(request, rules) {
  const rule = rules.find(r => r.active && request.url.indexOf(r.from) > -1);
  return rule ? { redirectUrl: request.url.replace(rule.from, rule.to) } : null;
}

function getUniqueRequestOnMatch(request, rules) {
  let lastRequestId = null;
  return (request, rules) => {
    if (lastRequestId !== request.requestId) {
      lastRequestId = request.requestId;
      return redirectOnMatch(request, rules, lastRequestId);
    }
    return null;
  }
}

chrome.webRequest.onBeforeRequest.addListener(
   request => getUniqueRequestOnMatch(request, getLocalRules()),
   { urls: ['<all_urls>'] },
   ['blocking']
);
