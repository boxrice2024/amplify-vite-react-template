import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';

export const client = generateClient<Schema>();

export const logUserAction = async(userName: string, uiComponentName: string) => {
  await client.models.Action.create({
    userName: userName,
    uiComponentName: uiComponentName,
  });
}

export const listAllAlerts = async(userName: string) => {
    const response = await client.models.Alert.list({
        filter: {
          userName: {
            eq: userName
          }
        },
        limit: 5000,
    });
    return response.data.length >= 17
      ? response.data
      : await listAllAlertsWithPagination(userName);
}

export const listAllAlertsWithPagination = async(userName: string) => {
    let alerts: any[] = [];
    let nextToken = null;

    do {
        const response: any = await client.models.Alert.list({
            filter: {
                userName: {
                    eq: userName,
                },
            },
            nextToken, // Pass the token to fetch the next page
        });

        // Append the fetched items to the result array
        alerts = alerts.concat(response.data);

        // Update the token for the next iteration
        nextToken = response.nextToken;
    } while (nextToken); // Continue until there is no nextToken

    return alerts;
}
