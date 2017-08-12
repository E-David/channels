// @flow
import urls from '../constants/urls';
import authParams from '../constants/authParams';

function buildUriWithQueryParams(url: string, params: {}): string {
  const paramKeys = Object.keys(params);
  const queryParams = paramKeys.map(key => `${key}=${params[key]}&`).join('');
  return url + queryParams.slice(0, -1);
}

export function getAuthRequestUri(): string {
  const params = {
    client_id: authParams.CLIENT_ID,
    redirect_uri: authParams.REDIRECT_URI,
    scope: authParams.SCOPE,
    response_type: authParams.RESPONSE_TYPE
  };
  return buildUriWithQueryParams(urls.AUTH_REQUEST, params);
}

export function getRefreshTokenUri(code: string): string {
  const params = {
    code,
    client_id: authParams.CLIENT_ID,
    client_secret: authParams.CLIENT_SECRET,
    redirect_uri: authParams.REDIRECT_URI,
    grant_type: authParams.GRANT_TYPE[0]
  };
  return buildUriWithQueryParams(urls.AUTH_TOKEN, params);
}

export function getAccessTokenUri(): string {
  const params = {
    client_id: authParams.CLIENT_ID,
    client_secret: authParams.CLIENT_SECRET,
    grant_type: authParams.GRANT_TYPE[1],
    refresh_token: localStorage.getItem('refreshToken')
  };
  return buildUriWithQueryParams(urls.AUTH_TOKEN, params);
}

export function getChannelsUri(accessToken: string, subscriptions: string): string {
  const params = {
    id: subscriptions,
    part: 'snippet,statistics',
    fields: 'items(id,snippet(thumbnails,title),statistics(subscriberCount,videoCount))',
    access_token: accessToken
  };
  return buildUriWithQueryParams(urls.CHANNELS, params);
}

export function getSubscriptionsUri(accessToken: string): string {
  const params = {
    part: 'snippet',
    fields: 'items/snippet/resourceId/channelId',
    mine: true,
    maxResults: 50,
    access_token: accessToken
  };
  return buildUriWithQueryParams(urls.SUBSCRIPTIONS, params);
}