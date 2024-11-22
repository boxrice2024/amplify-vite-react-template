import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';

export const client = generateClient<Schema>();

export const logUserAction = async(userName:string, uiComponentName:string) => {
  await client.models.Action.create({
    userName: userName,
    uiComponentName: uiComponentName,
  });
}
